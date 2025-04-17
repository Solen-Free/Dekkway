'use client';
import { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import L from 'leaflet';
import { OpenStreetMapProvider, GeoSearchControl } from 'leaflet-geosearch';
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
  const searchControlRef = useRef<any>(null);
  const [coordinates, setCoordinates] = useState<[number, number]>(initialCoordinates);
  const [radius, setRadius] = useState<number>(initialRadius);
  const [mapReady, setMapReady] = useState<boolean>(false);
  const [searchAddress, setSearchAddress] = useState<string>("");
  
  // Initialisation de la carte
  useEffect(() => {
    if (typeof window !== 'undefined' && !mapRef.current) {
      const map = L.map('location-map').setView(coordinates, 13);
      mapRef.current = map;

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);

      // Configuration du fournisseur de recherche
      const provider = new OpenStreetMapProvider();
      
      // Ajout du contrôle de recherche
      const searchControl = new (GeoSearchControl as any)({
        provider,
        style: 'bar',
        showMarker: false,
        autoClose: true,
        retainZoomLevel: false,
        animateZoom: true,
        searchLabel: 'Entrez une adresse',
        keepResult: true
      });
      
      map.addControl(searchControl);
      searchControlRef.current = searchControl;
      
      // Gestion des résultats de recherche
      map.on('geosearch/showlocation', function(e: any) {
        const { location } = e;
        const newCoords: [number, number] = [location.y, location.x];
        setCoordinates(newCoords);
        
        // Mise à jour du marqueur
        if (markerRef.current) {
          markerRef.current.setLatLng([location.y, location.x]);
        }
        
        // Mise à jour du cercle
        if (circleRef.current) {
          circleRef.current.setLatLng([location.y, location.x]);
        }
        
        // Notification du changement
        onLocationChange(newCoords, radius);
      });
      
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
        if (searchControlRef.current) {
          mapRef.current.removeControl(searchControlRef.current);
        }
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
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2">Rechercher une adresse</h3>
        <p className="text-sm text-gray-600 mb-2">Utilisez la barre de recherche sur la carte ou cliquez directement sur la carte pour sélectionner un emplacement</p>
      </div>
      
      <div id="location-map" className="h-64 w-full rounded-lg shadow-md"></div>
      
      <div className="mt-4 flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">Coordonnées: </span>
          <span className="text-sm text-gray-600">{coordinates[0].toFixed(6)}, {coordinates[1].toFixed(6)}</span>
        </div>
      </div>
      
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