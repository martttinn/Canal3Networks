"use client";

import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Clock, ChevronRight, Layers } from 'lucide-react';
import Reveal from '@/app/components/Reveal';
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

// Child component to reliably manage coverage polygons through map context
const CoverageLayers = ({ isSatellite }: { isSatellite: boolean }) => {
  const { map, isLoaded } = useMap();

  useEffect(() => {
    if (!map || !isLoaded) return;

    const addOrUpdateLayers = () => {
      // Add source if missing
      if (!map.getSource('coverage')) {
        map.addSource('coverage', {
          type: 'geojson',
          data: coverageZones,
        });
      }

      const addLayerIfMissing = (layer: MapLibreGL.AddLayerObject) => {
        if (!map.getLayer(layer.id)) {
          map.addLayer(layer as any);
        }
      };

      // Full coverage fill
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

      // Expanding coverage fill
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

      // Coverage borders - full
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

      // Coverage borders - expanding
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

    // Run first time
    addOrUpdateLayers();
    
    // Bind to style data to re-add layers if base style changes
    map.on('styledata', addOrUpdateLayers);

    return () => {
      map.off('styledata', addOrUpdateLayers);
    };
  }, [map, isLoaded, isSatellite]);
  
  // Re-trigger style update explicitly when toggling so opacity updates immediately
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

const CoverageMapSection = () => {
  const mapRef = useRef<MapLibreGL.Map | null>(null);
  const [activeStore, setActiveStore] = useState<Store | null>(null);
  const [userLocation, setUserLocation] = useState<{ longitude: number; latitude: number } | null>(null);
  const [isSatellite, setIsSatellite] = useState(false);

  // Auto-fetch location on load if permission is already granted
  useEffect(() => {
    if ('geolocation' in navigator && 'permissions' in navigator) {
      navigator.permissions.query({ name: 'geolocation' }).then((result) => {
        if (result.state === 'granted') {
          navigator.geolocation.getCurrentPosition(
            (position) => {
              setUserLocation({
                longitude: position.coords.longitude,
                latitude: position.coords.latitude,
              });
              
              // Optionally fly to user location on initial load?
              // The user request only said "el indicador de ubicacion debera aparecer automaticamente"
              // so we just set the location, no flyTo.
            },
            (error) => {
              console.error("Error getting location automatically:", error);
            }
          );
        }
      }).catch((err) => {
        console.warn("Permissions API not supported or failed:", err);
      });
    }
  }, []);

  // Re-trigger style update explicitly when toggling so opacity updates immediately
  useEffect(() => {
    const map = mapRef.current;
    if (map && map.getLayer('coverage-fill-full')) {
      map.setPaintProperty('coverage-fill-full', 'fill-opacity', isSatellite ? 0.35 : 0.15);
      map.setPaintProperty('coverage-fill-expanding', 'fill-opacity', isSatellite ? 0.25 : 0.10);
      map.setPaintProperty('coverage-border-full', 'line-width', isSatellite ? 3 : 2);
      map.setPaintProperty('coverage-border-expanding', 'line-width', isSatellite ? 3 : 2);
    }
  }, [isSatellite]);

  const handleFlyTo = (store: Store) => {
    setActiveStore(store);
    mapRef.current?.flyTo({
      center: [store.lng, store.lat],
      zoom: 14,
      duration: 1500,
    });
  };

  return (
    <section className="py-24 bg-[#080510] relative border-t border-white/5">
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold mb-4 brand-font text-white">
              Nuestra <span className="text-[#6F70DE]">Cobertura</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto">
              Fibra óptica propia en expansión continua. Consulta si llegamos a tu zona.
            </p>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar — Store List */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Reveal delay={100}>
              {/* Legend */}
              <div className="glass-card rounded-2xl p-5 mb-4">
                <h4 className="text-white font-bold text-sm mb-3 uppercase tracking-wider">Leyenda</h4>
                <div className="flex flex-col gap-2">
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-sm bg-[#6F70DE]/30 border border-[#6F70DE]/60 border-dashed"></div>
                    <span className="text-gray-300 text-sm">Cobertura activa</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-sm bg-[#85EDAF]/20 border border-[#85EDAF]/40 border-dashed"></div>
                    <span className="text-gray-300 text-sm">En expansión</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-[#6F70DE] border-2 border-white"></div>
                    <span className="text-gray-300 text-sm">Tienda física</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-4 h-4 rounded-full bg-blue-500 border-2 border-white"></div>
                    <span className="text-gray-300 text-sm">Tu ubicación</span>
                  </div>
                </div>
              </div>
            </Reveal>

            {/* Store cards */}
            {stores.map((store, i) => (
              <Reveal key={store.id} delay={150 + i * 100}>
                <div
                  onClick={() => handleFlyTo(store)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleFlyTo(store); }}
                  className={`w-full text-left glass-card rounded-2xl p-5 transition-all duration-300 group hover:border-[#6F70DE]/40 hover:bg-white/5 cursor-pointer ${
                    activeStore?.id === store.id ? 'border-[#6F70DE]/50 bg-[#6F70DE]/5' : ''
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                    <h4 className="text-white font-bold text-sm">{store.name}</h4>
                    <a 
                      href={`https://www.google.com/maps/dir/?api=1&destination=${store.lat},${store.lng}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] font-semibold text-white bg-[#6F70DE] hover:bg-[#5b5cc4] px-3 py-1.5 rounded-full transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-[#6F70DE]/25 self-start shrink-0 active:scale-95"
                    >
                      Cómo llegar
                    </a>
                  </div>
                  <div className="flex flex-col gap-2 text-xs text-gray-400">
                    <div className="flex items-center gap-2">
                      <MapPin size={12} className="text-[#6F70DE] shrink-0" />
                      <span>{store.address}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone size={12} className="text-[#85EDAF] shrink-0" />
                      <span>{store.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock size={12} className="text-[#78D4EF] shrink-0" />
                      <span>{store.hours}</span>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>

          {/* Map */}
          <Reveal className="lg:col-span-8" delay={200}>
            <div className="rounded-3xl overflow-hidden border border-white/10 h-[500px] lg:h-[600px] relative group/map">
              <Map
                ref={mapRef}
                theme="dark"
                styles={isSatellite ? { dark: satelliteStyle as any } : undefined}
                center={[-1.0299534, 38.0390444]}
                zoom={11.5}
                className="w-full h-full"
              >
                <CoverageLayers isSatellite={isSatellite} />
                
                <MapControls
                  position="bottom-right"
                  showZoom
                  showLocate
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
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default CoverageMapSection;
