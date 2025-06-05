import { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import Geofence from './Geofence';
import * as turf from '@turf/turf';

// UI COMPONENTS
import Marker from './Marker';
import CustomDrawer from './CustomDrawer';
import { Drawer, DrawerContent } from "@/components/ui/drawer";
import { toast } from 'sonner'

// ICONS
import inActiveMarker from '@/assets/icons/inActiveMarker.png';
import activeMarker from '@/assets/icons/activeMarker.png';
import clusterIcon from '@/assets/icons/clusterIcon.png';
import eBikeMoving from '@/assets/icons/eBikeMoving.png';
import bikeMoving from '@/assets/icons/bikeMoving.png';

// API
import { stations } from '@/api/database.js';
import bikesMoves from '@/api/bikesMoves.js';
import geofencesStore from '@/api/geofencesStore.js';

// STORES
import useFilter from '@/stores/filter/useFilter.js';


export default function Map() {
    const mapRef = useRef(null);
    const drawerRef = useRef(null);
    const mapContainerRef = useRef(null);
    const [mapLoaded, setMapLoaded] = useState(false);
    const [openDrawer, setOpenDrawer] = useState(false);
    const [selectedStation, setSelectedStation] = useState(null);
    const [visibleMarkers, setVisibleMarkers] = useState([]);
    const [zoomLevel, setZoomLevel] = useState(13);
    
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
            zoom: zoomLevel,
        });

        mapRef.current = map;

        map.on('load', () => {
            setMapLoaded(true);

            // --- Load Custom Cluster Images ---
            const clusterImageUrl = clusterIcon;

            map.loadImage(
                clusterImageUrl,
                (error, image) => {
                    if (error) throw error;
                    // Add the image to the map's style as 'cluster-icon'
                    if (!map.hasImage('cluster-icon')) {
                        map.addImage('cluster-icon', image, { pixelRatio: 1.5 }); // pixelRatio for retina displays
                    }
                }
            );

            const sourceData = {
                type: 'FeatureCollection',
                features: stations.map(station => ({
                    type: 'Feature',
                    properties: {
                        ...station.data,
                        hasEV: station.hasEV,
                        id: station.id,
                        lng: station.lng,
                        lat: station.lat,
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [station.lng, station.lat],
                    },
                }))
            };

            map.addSource('stations', {
                type: 'geojson',
                data: sourceData,
                cluster: true,
                clusterMaxZoom: 20, // Adjust max zoom for clustering as needed
                clusterRadius: 25, // Radius in pixels for clustering
            });

            // --- Layer for Clusters (using images) ---
            map.addLayer({
                id: 'clusters',
                type: 'symbol', // Changed to 'symbol' to use images
                source: 'stations',
                filter: ['has', 'point_count'], // Only show features that are clusters
                layout: {
                    'icon-image': 'cluster-icon', // Use the ID of the loaded image
                    'icon-size': [ // Dynamically size the icon based on cluster count
                        'step',
                        ['get', 'point_count'],
                        0.3, // 30% of original image size for < 100 points
                        100,
                        0.5, // 50% of original image size for < 750 points
                        750,
                        0.7  // 70% of original image size for >= 750 points
                    ],
                    'icon-allow-overlap': true // Allow icons to overlap if necessary
                }
            });

            // --- Layer for Cluster Counts (text labels) ---
            map.addLayer({
                id: 'cluster-count',
                type: 'symbol',
                source: 'stations',
                filter: ['has', 'point_count'], // Only show for cluster features
                layout: {
                    'text-field': ['get', 'point_count_abbreviated'], // Display the abbreviated count
                    'text-font': ['Arial Unicode MS Bold'], // Standard Mapbox fonts
                    'text-size': 12,
                    'text-allow-overlap': true, // Keep this for smooth text rendering
                },
                paint: {
                    'text-color': '#fff'
                }
            });

            // --- Layer for Unclustered Points ---
            map.addLayer({
                id: 'unclustered-point',
                type: 'circle', // using circle to detect clicks, but visually transparent
                source: 'stations',
                filter: ['!', ['has', 'point_count']], // Only show features that are NOT clusters
                paint: {
                    'circle-color': 'transparent', // Make the circle invisible
                    'circle-radius': 0,             // Make the circle radius 0
                }
            });

            // --- Click event for Clusters: Zoom in to expand ---
            map.on('click', 'clusters', (e) => {
                const features = map.queryRenderedFeatures(e.point, {
                    layers: ['clusters']
                });
                if (!features.length) return; // Add check if no feature is found

                const clusterId = features[0].properties.cluster_id;
                map.getSource('stations').getClusterExpansionZoom(
                    clusterId,
                    (err, zoom) => {
                        if (err) return;
                        map.easeTo({
                            center: features[0].geometry.coordinates,
                            zoom: zoom + 3.5
                        });
                    }
                );
            });

            // --- Click event for Unclustered Points (your existing logic) ---
            map.on('click', 'unclustered-point', (e) => {
                const feature = e.features[0];
                const station = stations.find(s => s.id === feature.properties.id);
                if (station) handleMarkerClick(station);
            });

            // Optional: Change cursor on hover for clusters
            map.on('mouseenter', 'clusters', () => {
                map.getCanvas().style.cursor = 'pointer';
            });

            map.on('mouseleave', 'clusters', () => {
                map.getCanvas().style.cursor = '';
            });

            // --- Update visibleMarkers for individual (unclustered) points ---
            const updateVisibleMarkers = () => {
                if (!mapRef.current) return;
                // Query only the *rendered* features from the 'unclustered-point' layer.
                const features = mapRef.current.queryRenderedFeatures({
                    layers: ['unclustered-point']
                });
                const visible = features.map(f => ({
                    lat: f.geometry.coordinates[1],
                    lng: f.geometry.coordinates[0],
                    id: f.properties.id
                }));
                setVisibleMarkers(visible);
            };

            // Update visible markers when the map finishes moving or zooming
            map.on('moveend', updateVisibleMarkers);
            map.on('zoomend', updateVisibleMarkers);
            // Perform initial update of visible markers once the map is idle
            map.once('idle', () => {
                updateVisibleMarkers();
            });
        });

        // Cleanup: Remove the map instance when the component unmounts
        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []); // Empty dependency array ensures this effect runs only once on mount

    const handleMarkerClick = (station) => {
        setSelectedStation(station);
        setOpenDrawer(true);

        mapRef.current.flyTo({
            center: [station.lng, station.lat],
            zoom: zoomLevel, 
            speed: 2.0,
        });
    };

    // Effect for handling clicks outside the drawer or Escape key press
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                (drawerRef.current && !drawerRef.current.contains(event.target)) ||
                event.key === 'Escape'
            ) {
                document.querySelectorAll('.bubble.active').forEach(b => b.classList.remove('active'));
                document.querySelectorAll('.icon.active').forEach(i => i.classList.remove('active'));
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleClickOutside);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleClickOutside);
        };
    }, []);

    // Add Simulate bike movements when mount
    const geofenceStates = {};

    const animationIntervalsRef = useRef({});

    useEffect(() => {
        if (!mapRef.current) return;
        const map = mapRef.current;

        // Clean up everything if zoom level is too low
        if (zoomLevel < 11) {
            bikesMoves?.forEach((_, i) => {
                const layerId = `bike-${i}-layer`;
                const sourceId = `bike-${i}-source`;
                const markerId = `bike-marker-${i}`;
                const intervalKey = `bike-${i}`;

                // Remove layer, source, and marker image
                if (map.getLayer(layerId)) map.removeLayer(layerId);
                if (map.getSource(sourceId)) map.removeSource(sourceId);
                if (map.hasImage(markerId)) map.removeImage(markerId);

                // Clear interval if exists
                if (animationIntervalsRef.current[intervalKey]) {
                    clearInterval(animationIntervalsRef.current[intervalKey]);
                    delete animationIntervalsRef.current[intervalKey];
                }
            });

            return;
        }

        const loadMarkerAndAnimate = () => {
            bikesMoves?.forEach((bike, i) => {
                const markerId = `bike-marker-${i}`;
                const bikeId = `bike-${i}`;
                const sourceId = `${bikeId}-source`;
                const layerId = `${bikeId}-layer`;
                const imagePath = bike.isEV ? eBikeMoving : bikeMoving;

                if (!map.hasImage(markerId)) {
                    map.loadImage(imagePath, (error, image) => {
                        if (error) {
                            console.error(`Error loading image for bike ${i}:`, error);
                            return;
                        }

                        if (!map.hasImage(markerId)) map.addImage(markerId, image);

                        if (!map.getSource(sourceId)) {
                            map.addSource(sourceId, {
                                type: 'geojson',
                                data: {
                                    type: 'FeatureCollection',
                                    features: [{
                                        type: 'Feature',
                                        geometry: { type: 'Point', coordinates: bike.moves[0] }
                                    }]
                                }
                            });
                        }

                        if (!map.getLayer(layerId)) {
                            map.addLayer({
                                id: layerId,
                                type: 'symbol',
                                source: sourceId,
                                layout: {
                                    'icon-image': markerId,
                                    'icon-size': 0.2,
                                    'icon-allow-overlap': true,
                                    'icon-offset': [0, -185],
                                }
                            });
                        }

                        let index = 0;
                        const intervalKey = `bike-${i}`;

                        // Clear existing interval just in case
                        if (animationIntervalsRef.current[intervalKey]) {
                            clearInterval(animationIntervalsRef.current[intervalKey]);
                        }

                        const intervalId = window.setInterval(() => {
                            index = (index + 1) % bike.moves.length;
                            const newCoord = bike.moves[index];

                            const source = map.getSource(sourceId);
                            if (source) {
                                source.setData({
                                    type: 'FeatureCollection',
                                    features: [{
                                        type: 'Feature',
                                        geometry: {
                                            type: 'Point',
                                            coordinates: newCoord
                                        }
                                    }]
                                });
                            }

                            const point = turf.point(newCoord);
                            const bikeKey = `Bike ID (${bike.id})`;

                            geofencesStore.forEach((geofence, gfIndex) => {
                                const polygon = turf.polygon(geofence.geometry.coordinates);
                                const inside = turf.booleanPointInPolygon(point, polygon);

                                if (!geofenceStates[bikeKey]) geofenceStates[bikeKey] = {};

                                const wasInside = geofenceStates[bikeKey][gfIndex] || false;

                                if (inside && !wasInside) {
                                    toast.success(`${bikeKey} entered geofence at ${geofence.location}`);
                                } else if (!inside && wasInside) {
                                    toast.warning(`${bikeKey} exited geofence at ${geofence.location}`);
                                }

                                geofenceStates[bikeKey][gfIndex] = inside;
                            });
                        }, 300);

                        animationIntervalsRef.current[intervalKey] = intervalId;
                    });
                }
            });
        };

        if (map.isStyleLoaded()) {
            loadMarkerAndAnimate();
        } else {
            map.once('load', loadMarkerAndAnimate);
        }
    }, [mapLoaded, zoomLevel]);


    // Track zoom level only after zoom ends
    useEffect(() => {
        if (!mapRef.current) return;
        const map = mapRef.current;

        const handleZoom = () => {
            setZoomLevel(map.getZoom());
        };

        map.on('zoom', handleZoom);

        return () => {
            map.off('zoom', handleZoom);
        };
    }, []);

    // Applying filters on Markers
    const { filterBy } = useFilter();



    return (
        <>
            <div id="map-container" ref={mapContainerRef} className="h-full w-full overflow-hidden">

                {/* Markers */}
                {mapLoaded && mapRef.current && visibleMarkers.map((marker) => {
                    const station = stations.find(s => s.id === marker.id);
                    if (!station) return null;

                    return (
                        <Marker
                            key={station.id}
                            map={mapRef.current}
                            filter={filterBy}
                            lng={marker.lng}
                            lat={marker.lat}
                            count={
                                filterBy === 0 ? (station.data.classicBikes < 1 ? 0 : station.data.classicBikes) :
                                    filterBy === 1 ? (station.data.eBikes < 1 ? 0 : station.data.eBikes) :
                                        filterBy === 2 ? (station.data.openDocks < 1 ? 0 : station.data.openDocks) :
                                            station.data.classicBikes + station.data.eBikes
                            }
                            iconPath={inActiveMarker}
                            iconPathActive={activeMarker}
                            hasEV={
                                filterBy === 0 && false ||
                                filterBy === 1 && true ||
                                filterBy === 2 && station.hasEV
                            }
                            onClick={() => handleMarkerClick(station)}
                        />
                    );
                })}

                {/* Markers Drawers */}
                <Drawer open={openDrawer} onOpenChange={setOpenDrawer}>
                    <DrawerContent data-vaul-no-drag className="max-w-[950px] max-h-[350px] mx-auto">
                        <div ref={drawerRef}>
                            <CustomDrawer data={selectedStation} />
                        </div>
                    </DrawerContent>
                </Drawer>

                {/* Add Geofence */}
                {mapLoaded && mapRef.current &&
                    (<Geofence map={mapRef.current} />)}

            </div>
        </>
    );
}