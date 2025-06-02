import { useEffect } from 'react';
import mapboxgl from 'mapbox-gl';

// STYLES
import './markerStyles.css'

// ICONS
import hasEVicon from '@/assets/icons/hasEV.png'

export default function Marker({ map, lng, lat, count, hasEV, onClick, filter }) {
  useEffect(() => {
    if (!map) return;

    // Create the marker DOM element
    const el = document.createElement('div');
    el.className =
      filter === 0 ? (count === 0 ? 'notAvailable' : 'classic-bike') :
        filter === 1 ? (count === 0 ? 'notAvailable' : 'e-bike') :
          filter === 2 ? (count === 0 ? 'notAvailable' : 'parking') :
            'noFilter';

    el.innerHTML = `
    <div>
    ${hasEV === true ? `<span class="hasEV"><img src="${hasEVicon}" class="hasEVicon" alt="EV"/></span>` : ''}
    <div class="bubble">
      <span alt="bike" class="icon"></span>
      <span class="count">${count}</span>
    </div>
    </div>
    `;

    const bubble = el.querySelector('.bubble');
    const icon = el.querySelector('.icon');

    // Add click listener
    el.addEventListener('click', () => {
      bubble.classList.toggle('active');
      icon.classList.toggle('active');
      if (onClick) onClick();
    });

    const marker = new mapboxgl.Marker(el)
      .setLngLat([lng, lat])
      .addTo(map);

    return () => marker.remove();
  }, [map, lng, lat, count, filter]);

  return null;
}
