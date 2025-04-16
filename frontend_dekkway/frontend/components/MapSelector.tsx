'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import { OpenStreetMapProvider } from 'leaflet-geosearch';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'leaflet/dist/leaflet.css';
import 'leaflet-geosearch/dist/geosearch.css';

// Correction de l'icône manquante
const DefaultIcon = L.icon({
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});

interface MapSelectorProps {
  onLocationChange: (coordinates: [number, number], radius: number) => void;
  initialCoordinates?: [number, number];
  initialRadius?: number;
}

const MapSelector = ({
  onLocationChange,
  initialCoordinates = [14.6937, -17.4441], // Coordonnées par défaut (Dakar)
  initialRadius = 5
}: MapSelectorProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);
  const circleRef = useRef<L.Circle | null>(null);
  const [coordinates, setCoordinates] = useState<[number, number]>(initialCoordinates);
  const [radius, setRadius] = useState<number>(initialRadius);
  const [mapReady, setMapReady] = useState<boolean>(false);
  
  // Initialisation de la carte
  useEffect(() => {
    if (typeof window !== 'undefined' && !mapRef.current) {
      const map = L.map('location-map').setView(coordinates, 13);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Ajout de la recherche
      const provider = new OpenStreetMapProvider();
      
      // Création du marqueur initial
      markerRef.current = L.marker(coordinates, { icon: DefaultIcon, draggable: true })
        .addTo(map)
        .bindPopup('Position sélectionnée')
        .openPopup();

      // Création du cercle initial pour le rayon
      circleRef.current = L.circle(coordinates, {
        radius: radius * 1000, // Conversion km en mètres
        color: '#FC9B89',
        fillColor: '#FC9B89',
        fillOpacity: 0.2
      }).addTo(map);

      // Gestion du déplacement du marqueur
      markerRef.current.on('dragend', function() {
        if (markerRef.current) {
          const newPos = markerRef.current.getLatLng();
          const newCoords: [number, number] = [newPos.lat, newPos.lng];
          setCoordinates(newCoords);
          
          // Mise à jour du cercle
          if (circleRef.current) {
            circleRef.current.setLatLng(newPos);
          }
          
          // Notification du changement
          onLocationChange(newCoords, radius);
        }
      });

      // Gestion du clic sur la carte
      map.on('click', function(e) {
        const newCoords: [number, number] = [e.latlng.lat, e.latlng.lng];
        setCoordinates(newCoords);
        
        // Mise à jour du marqueur
        if (markerRef.current) {
          markerRef.current.setLatLng(e.latlng);
        }
        
        // Mise à jour du cercle
        if (circleRef.current) {
          circleRef.current.setLatLng(e.latlng);
        }
        
        // Notification du changement
        onLocationChange(newCoords, radius);
      });

      setMapReady(true);
    }

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  // Mise à jour du rayon
  useEffect(() => {
    if (mapReady && circleRef.current) {
      circleRef.current.setRadius(radius * 1000); // Conversion km en mètres
      onLocationChange(coordinates, radius);
    }
  }, [radius, mapReady]);

  return (
    <div className="space-y-4">
      <div id="location-map" className="h-64 w-full rounded-lg shadow-md"></div>
      
      <div className="mt-4">
        <h3 className="text-lg font-semibold mb-2">Rayon de recherche: {radius} km</h3>
        <Slider
          min={1}
          max={50}
          value={radius}
          onChange={(value) => setRadius(value as number)}
          trackStyle={{ backgroundColor: "#FC9B89" }}
          railStyle={{ backgroundColor: "#E5E7EB" }}
          handleStyle={{
            backgroundColor: "#FC9B89",
            borderColor: "#FFFFFF",
            boxShadow: "0 3px 4px rgba(0, 0, 0, 0.2)"
          }}
        />
        <div className="flex justify-between text-sm text-gray-600 mt-1">
          <span>1 km</span>
          <span>50 km</span>
        </div>
      </div>
    </div>
  );
};

export default MapSelector;