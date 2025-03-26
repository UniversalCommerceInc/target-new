import React, { useState, useEffect, useRef } from 'react';
import {
  MapContainer,
  TileLayer,
  Marker,
  Tooltip,
  useMap,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import axios from 'axios';

// Custom icon for user location (red icon)
const userIcon = new L.Icon({
  iconUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
  iconRetinaUrl:
    'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Custom icon for shops (green icon)
const shopIcon = new L.Icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  tooltipAnchor: [16, -28],
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  shadowSize: [41, 41],
});

// Fix for missing marker icons in React-Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl:
    'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// ✅ Auto-Open Tooltips when Zoom Level is High
const AutoOpenTooltips = ({ markersRef }) => {
  const map = useMap();

  useEffect(() => {
    const handleZoom = () => {
      const zoomLevel = map.getZoom();
      if (zoomLevel >= 8) {
        Object.values(markersRef.current).forEach((marker) => {
          if (marker) marker.openTooltip();
        });
      } else {
        Object.values(markersRef.current).forEach((marker) => {
          if (marker) marker.closeTooltip();
        });
      }
    };

    map.on('zoomend', handleZoom);
    handleZoom(); // Initial check

    return () => map.off('zoomend', handleZoom);
  }, [map, markersRef]);

  return null;
};

// ✅ Maps Component
const Maps = ({ currentLocation, nearbyShops = [] }) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState(null);
  const markersRef = useRef({});

  useEffect(() => {
    if (currentLocation) {
      axios
        .get(
          `https://nominatim.openstreetmap.org/reverse?lat=${currentLocation.lat}&lon=${currentLocation.lng}&format=json`
        )
        .then((res) => setAddress(res.data.display_name))
        .catch(() => setError('Unable to fetch address'));
    }
  }, [currentLocation]);

  // ✅ Fix coordinates order [lat, lng]
  const position = currentLocation
    ? [currentLocation.lng, currentLocation.lat]
    : null;

  return (
    <div>
      {error && <p className="text-red-500">{error}</p>}
      {currentLocation ? (
        <MapContainer
          center={position}
          zoom={13}
          style={{ height: '400px', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
          />

          {/* ✅ Current User Location Marker */}
          <Marker position={position} icon={userIcon}>
            <Tooltip
              direction="top"
              offset={[0, -10]}
              opacity={1}
              permanent
              className="tooltip-content"
            >
              <div>
                <strong>You are here</strong>
                <br />
                {address || 'Fetching address...'}
              </div>
            </Tooltip>
          </Marker>

          {/* ✅ Nearby Shops Markers */}
          {nearbyShops.length > 0 ? (
            nearbyShops.map((shop) => (
              <Marker
                key={shop?.sellerId}
                position={[
                  shop.coordinates.lat,
                  shop.coordinates.lng,
                ]}
                icon={shopIcon}
                ref={(ref) => {
                  if (ref) {
                    markersRef.current[shop.sellerId] = ref;
                  }
                }}
              >
                <Tooltip
                  direction="top"
                  offset={[0, -10]}
                  permanent
                  opacity={1}
                  className="tooltip-content"
                >
                  <div>
                    <strong>{shop.name}</strong>
                    <p>Distance: {shop.distance} km</p>
                  </div>
                </Tooltip>
              </Marker>
            ))
          ) : (
            <p>No shops available nearby.</p>
          )}

          {/* ✅ Auto-open tooltips */}
          <AutoOpenTooltips markersRef={markersRef} />
        </MapContainer>
      ) : (
        <p>Fetching location...</p>
      )}
    </div>
  );
};

export default Maps;
