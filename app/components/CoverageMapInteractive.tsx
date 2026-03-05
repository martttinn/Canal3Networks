"use client";

import React, { useEffect } from 'react';
import { MapPin, Phone, Clock, Layers } from 'lucide-react';
import {
  Map,
  MapMarker,
  MarkerContent,
  MarkerPopup,
  MapControls,
  useMap
} from '@/app/components/ui/map';
import type MapLibreGL from 'maplibre-gl';
import { stores, coverageZones, type Store } from '@/app/data/coverage';

const satelliteStyle = {
  version: 8,
  sources: {
    satellite: {
      type: 'raster',
      tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
      tileSize: 256,
      attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
    }
  },
  layers: [
    {
      id: 'satellite',
      type: 'raster',
      source: 'satellite'
    }
  ]
};

const CoverageLayers = ({ isSatellite }: { isSatellite: boolean }) => {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    const addOrUpdateLayers = () => {
      if (!map.getSource('coverage')) {
        map.addSource('coverage', {
          type: 'geojson',
          data: coverageZones,
        });
      }

      const addLayerIfMissing = (layer: MapLibreGL.AddLayerObject) => {
        if (!map.getLayer(layer.id)) {
          map.addLayer(layer as MapLibreGL.AddLayerObject);
        }
      };

      addLayerIfMissing({
        id: 'coverage-fill-full',
        type: 'fill',
        source: 'coverage',
        filter: ['==', ['get', 'level'], 'full'],
        paint: {
          'fill-color': '#6F70DE',
          'fill-opacity': isSatellite ? 0.35 : 0.15,
        },
      });

      addLayerIfMissing({
        id: 'coverage-fill-expanding',
        type: 'fill',
        source: 'coverage',
        filter: ['==', ['get', 'level'], 'expanding'],
        paint: {
          'fill-color': '#85EDAF',
          'fill-opacity': isSatellite ? 0.25 : 0.10,
        },
      });

      addLayerIfMissing({
        id: 'coverage-border-full',
        type: 'line',
        source: 'coverage',
        filter: ['==', ['get', 'level'], 'full'],
        paint: {
          'line-color': '#6F70DE',
          'line-width': isSatellite ? 3 : 2,
          'line-opacity': 0.8,
          'line-dasharray': [2, 1],
        },
      });

      addLayerIfMissing({
        id: 'coverage-border-expanding',
        type: 'line',
        source: 'coverage',
        filter: ['==', ['get', 'level'], 'expanding'],
        paint: {
          'line-color': '#85EDAF',
          'line-width': isSatellite ? 3 : 2,
          'line-opacity': 0.7,
          'line-dasharray': [4, 3],
        },
      });
    };

    addOrUpdateLayers();
    map.on('styledata', addOrUpdateLayers);

    return () => {
      map.off('styledata', addOrUpdateLayers);
    };
  }, [map, isLoaded, isSatellite]);
  
  useEffect(() => {
    if (!map || !isLoaded) return;
    
    if (map.getLayer('coverage-fill-full')) {
      map.setPaintProperty('coverage-fill-full', 'fill-opacity', isSatellite ? 0.35 : 0.15);
      map.setPaintProperty('coverage-fill-expanding', 'fill-opacity', isSatellite ? 0.25 : 0.10);
      map.setPaintProperty('coverage-border-full', 'line-width', isSatellite ? 3 : 2);
      map.setPaintProperty('coverage-border-expanding', 'line-width', isSatellite ? 3 : 2);
    }
  }, [map, isLoaded, isSatellite]);

  return null;
};

interface Props {
  mapRef: React.MutableRefObject<MapLibreGL.Map | null>;
  activeStore: Store | null;
  userLocation: { longitude: number; latitude: number } | null;
  setUserLocation: (loc: { longitude: number; latitude: number } | null) => void;
  isSatellite: boolean;
  setIsSatellite: (isSatellite: boolean) => void;
  handleFlyTo: (store: Store) => void;
}

const CoverageMapInteractive = ({
  mapRef,
  userLocation,
  setUserLocation,
  isSatellite,
  setIsSatellite,
  handleFlyTo
}: Props) => {
  return (
    <Map
      ref={mapRef}
      theme="dark"
      styles={isSatellite ? { dark: satelliteStyle as MapLibreGL.StyleSpecification } : undefined}
      center={[-1.0299534, 38.0390444]}
      zoom={11.5}
      className="w-full h-full"
    >
      <CoverageLayers isSatellite={isSatellite} />
      
      <MapControls
        position="bottom-right"
        showZoom
        showLocate
        showFullscreen
        onLocate={(coords) => setUserLocation(coords)}
      />

      {/* Satellite Toggle Button overlaying map */}
      <button 
        onClick={() => setIsSatellite(!isSatellite)}
        className="absolute top-4 right-4 z-10 bg-[#121217] text-[#ededed] border border-white/12 px-3 py-2 text-sm font-medium hover:bg-neutral-800 hover:text-white cursor-pointer transition-all duration-200 flex items-center gap-2 shadow-lg hover:shadow-xl"
        aria-label="Alternar vista Satélite"
      >
        <Layers size={16} />
        <span>{isSatellite ? 'Plano' : 'Satélite'}</span>
      </button>

      {/* User Location Marker */}
      {userLocation && (
        <MapMarker
          longitude={userLocation.longitude}
          latitude={userLocation.latitude}
        >
          <MarkerContent>
            <div className="relative flex items-center justify-center">
              <div className="absolute w-8 h-8 rounded-full bg-blue-500/30 animate-ping" />
              <div className="absolute w-4 h-4 rounded-full bg-blue-500/20" />
              <div className="relative w-3.5 h-3.5 rounded-full bg-blue-500 border-2 border-white shadow-[0_0_10px_rgba(59,130,246,0.5)]" />
            </div>
          </MarkerContent>
          <MarkerPopup>
            <div className="bg-[#121217] border border-white/10 rounded-xl px-3 py-2 shadow-2xl">
              <span className="text-white font-bold text-xs whitespace-nowrap">Tu ubicación</span>
            </div>
          </MarkerPopup>
        </MapMarker>
      )}

      {/* Store Markers */}
      {stores.map((store) => (
        <MapMarker
          key={store.id}
          longitude={store.lng}
          latitude={store.lat}
          onClick={() => handleFlyTo(store)}
        >
          <MarkerContent>
            <div className="relative group cursor-pointer">
              {/* Pulse ring */}
              <div className="absolute -inset-2 rounded-full bg-[#6F70DE]/30 animate-ping" />
              {/* Pin */}
              <div className="relative w-5 h-5 rounded-full bg-[#6F70DE] border-2 border-white shadow-lg shadow-[#6F70DE]/40 flex items-center justify-center">
                <MapPin size={10} className="text-white" />
              </div>
            </div>
          </MarkerContent>
          <MarkerPopup>
            <div className="bg-[#121217] border border-white/10 rounded-xl p-4 min-w-[220px] shadow-2xl">
              <h4 className="text-white font-bold text-sm mb-2">{store.name}</h4>
              <div className="flex flex-col gap-1.5 text-xs text-gray-400">
                <div className="flex items-center gap-2">
                  <MapPin size={11} className="text-[#6F70DE] shrink-0" />
                  <span>{store.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={11} className="text-[#85EDAF] shrink-0" />
                  <span>{store.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock size={11} className="text-[#78D4EF] shrink-0" />
                  <span>{store.hours}</span>
                </div>
              </div>
            </div>
          </MarkerPopup>
        </MapMarker>
      ))}
    </Map>
  );
};

export default CoverageMapInteractive;
