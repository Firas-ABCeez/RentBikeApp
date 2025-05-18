import { useRef, useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

export default function Map() {

    const mapRef = useRef(null);
    const mapContainerRef = useRef(null);

    useEffect(() => {
        const token = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
        if (!token) {
            console.error("Mapbox access token is missing");
            return;
        }

        mapboxgl.accessToken = token;

        if (!mapContainerRef.current) return;

        mapRef.current = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/streets-v11',
            center: [-74.0242, 40.6941],
            zoom: 10.12,
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
            }
        };
    }, []);

    return <div id="map-container" ref={mapContainerRef} className="h-full w-full overflow-hidden" />
}
