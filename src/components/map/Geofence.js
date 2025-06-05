// src/components/Geofence.js
import { useEffect } from 'react';
import * as turf from '@turf/turf';
import geofencesStore from '@/api/geofencesStore.js';

const Geofence = ({ map }) => {
  useEffect(() => {
    if (!map) return;

    // Build a FeatureCollection of all geofence circles
    const features = geofencesStore.map((geofence) => {
      const geometry = geofence.geometry
        ? geofence.geometry
        : turf.circle(geofence.center, geofence.radius, {
          steps: 64,
          units: 'kilometers',
        }).geometry;

      return {
        type: 'Feature',
        geometry,
        properties: {
          fillColor: geofence.fillColor,
          fillOpacity: geofence.fillOpacity,
        },
      };
    });

    const featureCollection = {
      type: 'FeatureCollection',
      features,
    };

    // Add a single GeoJSON source
    if (!map.getSource('geofences')) {
      map.addSource('geofences', {
        type: 'geojson',
        data: featureCollection,
      });
    }

    // Add one layer for all geofences
    if (!map.getLayer('geofences-layer')) {
      map.addLayer({
        id: 'geofences-layer',
        type: 'fill',
        source: 'geofences',
        paint: {
          'fill-color': ['get', 'fillColor'],
          'fill-opacity': ['get', 'fillOpacity'],
        },
      });
    }

    return () => {
      // Cleanup on unmount
      if (map.getLayer('geofences-layer')) map.removeLayer('geofences-layer');
      if (map.getSource('geofences')) map.removeSource('geofences');
    };
  }, [map]);

  return null;
};

export default Geofence;
