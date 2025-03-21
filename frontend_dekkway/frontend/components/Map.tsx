'use client';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useEffect } from 'react';
import { GeoSearchControl, OpenStreetMapProvider } from 'leaflet-geosearch';
import 'leaflet-geosearch/dist/geosearch.css';

// Correction de l'icône manquante
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = DefaultIcon;

export default function Map({ 
  coordinates,
  address
}: { 
  coordinates: [number, number];
  address?: string;
}) {
  useEffect(() => {
    const map = L.map('map').setView(coordinates, 15);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; OpenStreetMap contributors'
    }).addTo(map);

    const provider = new OpenStreetMapProvider();
    
    const searchControl = new (GeoSearchControl as any)({
      provider,
      style: 'bar',
      showMarker: false,
      autoClose: true
    });

    map.addControl(searchControl);

    L.marker(coordinates)
      .addTo(map)
      .bindPopup(address || 'Localisation du logement')
      .openPopup();

    return () => {
      map.removeControl(searchControl);
      map.remove();
    };
  }, [coordinates, address]);

  return <div id="map" className="h-full w-full" />;
}