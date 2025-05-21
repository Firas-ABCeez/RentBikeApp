import { useRef, useEffect, useState } from 'react'; // Import useState
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

// UI COMPONENTS
import Marker from './Marker';
import CustomDrawer from './CustomDrawer';
import { Drawer, DrawerContent } from "@/components/ui/drawer"

// ICONS
import inActiveMarker from '@/assets/icons/inActiveMarker.png';
import activeMarker from '@/assets/icons/activeMarker.png';
// import parking_white from '@/assets/icons/parking_white.svg';
// import parking_color from '@/assets/icons/parking_color.svg';

// API
import { stations } from '@/api/database.js';

export default function Map() {
    const mapRef = useRef(null);
    // Ref for the drawer container to detect outside clicks
    const drawerRef = useRef(null);
    const mapContainerRef = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false); // New state to track map load
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedStation, setSelectedStation] = useState(null);

    useEffect(() => {
        const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
        if (!token) {
            console.error("Mapbox access token is missing");
            return;
        }

        mapboxgl.accessToken = token;

        if (!mapContainerRef.current) return;

        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [10.1815, 36.8065],
            zoom: 13,
        });

        mapRef.current = map; // Store the map instance in the ref

        map.on('load', () => {
            setMapLoaded(true); // Set mapLoaded to true when the map is ready
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null; // Clear the ref on unmount
            }
        };
    }, []);

    const handleMarkerClick = (station) => {
        setSelectedStation(station);
        setOpenDrawer(true);
    };

    // Effect to handle clicks outside the menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target) || event.key === 'Escape') {
                // Remove 'active' class from all bubbles
                const allBubbles = document.querySelectorAll('.bubble.active');
                allBubbles.forEach(bubble => bubble.classList.remove('active'));

                // Remove 'active' class from all icons
                const allIcons = document.querySelectorAll('.icon.active');
                allIcons.forEach(icon => icon.classList.remove('active'));
            }
        };

        // Add event listener when the component mounts
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleClickOutside);


        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleClickOutside);
        };
    }, [drawerRef]);

    return (
        <div id="map-container" ref={mapContainerRef} className="h-full w-full overflow-hidden">
            {mapLoaded && mapRef.current && stations.map((station, i) => (
                <Marker
                    key={i}
                    map={mapRef.current}
                    lng={station.lng}
                    lat={station.lat}
                    count={station.data.classicBikes + station.data.eBikes}
                    iconPath={inActiveMarker}
                    iconPathActive={activeMarker}
                    hasEV={station.hasEV}
                    onClick={() => handleMarkerClick(station)}
                />
            ))}

            <Drawer
                open={openDrawer}
                onOpenChange={setOpenDrawer}
                >
                <DrawerContent 
                // Disable Swipe-to-Close:
                data-vaul-no-drag
                className="max-w-[950px] max-h-[350px] mx-auto">
                    <div ref={drawerRef}>
                        <CustomDrawer data={selectedStation} />
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}