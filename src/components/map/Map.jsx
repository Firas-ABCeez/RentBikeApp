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

export default function Map() {
    const mapRef = useRef(null);
    // Ref for the drawer container to detect outside clicks
    const drawerRef = useRef(null);
    const mapContainerRef = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false); // New state to track map load
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedPoint, setSelectedPoint] = useState(null);


    // Points on map
    const points = [
        { lng: 10.1850, lat: 36.8080, info: 'hasEV', hasEV: true },
        { lng: 10.1815, lat: 36.8120, info: 'Hi', hasEV: false },
        { lng: 10.1780, lat: 36.8050, info: 'Hi', hasEV: false },
        { lng: 10.1815, lat: 36.8020, info: 'Hi', hasEV: false },
        { lng: 10.1900, lat: 36.8065, info: 'hasEV', hasEV: true },
        { lng: 10.1750, lat: 36.8065, info: 'hasEV', hasEV: true },
        { lng: 10.1950, lat: 36.8150, info: 'Hsi', hasEV: true },
        { lng: 10.1600, lat: 36.7950, info: 'Hi', hasEV: false },
        { lng: 10.2000, lat: 36.8200, info: 'Hi', hasEV: false },
        { lng: 10.1900, lat: 36.7980, info: 'hasEV', hasEV: true }
    ];

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

    const handleMarkerClick = (point) => {
        setSelectedPoint(point);
        setOpenDrawer(true);
    };

    // Effect to handle clicks outside the menu
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (drawerRef.current && !drawerRef.current.contains(event.target)) {
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

        // Clean up the event listener when the component unmounts
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [drawerRef]);

    return (
        <div id="map-container" ref={mapContainerRef} className="h-full w-full overflow-hidden">
            {mapLoaded && mapRef.current && points.map((point, i) => (
                <Marker
                    key={i}
                    map={mapRef.current}
                    lng={point.lng}
                    lat={point.lat}
                    count={15}
                    iconPath={inActiveMarker}
                    iconPathActive={activeMarker}
                    hasEV={point.hasEV}
                    onClick={() => handleMarkerClick(point)}
                />
            ))}

            <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
                <DrawerContent>
                    <div ref={drawerRef}>
                        <CustomDrawer data={selectedPoint}/>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
}