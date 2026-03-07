"use client";

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { MapPin, Phone, Clock, Store as StoreIcon } from 'lucide-react';
import type MapLibreGL from 'maplibre-gl';
import Reveal from '@/app/components/Reveal';
import type { Store } from '@/app/data/coverage';
import { stores } from '@/app/data/coverage';

const CoverageMapInteractive = dynamic(() => import('@/app/components/CoverageMapInteractive'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex flex-col items-center justify-center bg-[#121217] text-gray-400 rounded-3xl border border-white/10 shadow-inner">
      <div className="w-10 h-10 border-4 border-white/10 border-t-[#6F70DE] rounded-full animate-spin mb-4"></div>
      <p className="text-sm font-medium animate-pulse">Cargando mapa interactivo...</p>
    </div>
  )
});




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



  const handleFlyTo = (store: Store) => {
    setActiveStore(store);
    mapRef.current?.flyTo({
      center: [store.lng, store.lat],
      zoom: 14,
      duration: 1500,
    });
  };

  return (
    <section className="py-16 md:py-24 relative">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-[#6F70DE] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.07] pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-[#F59E0B] rounded-full mix-blend-screen filter blur-[150px] opacity-[0.04] pointer-events-none"></div>
      <div className="container mx-auto px-6">
        <Reveal>
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-6 brand-font text-white tracking-tight">
              Nuestra <span className="text-[#6F70DE]">Fibra</span>
            </h2>
          </div>
        </Reveal>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Sidebar — Store List */}
          <div className="lg:col-span-4 flex flex-col gap-4">
            <Reveal delay={100}>
              {/* Legend */}
              <div className="bg-[#0d0915] rounded-[2rem] border border-white/5 p-6 mb-4 shadow-lg overflow-hidden relative">
                <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider relative z-10">Leyenda</h4>
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
                  className={`w-full text-left bg-[#0d0915] rounded-[2rem] border border-white/5 p-6 transition-all duration-500 group cursor-pointer relative overflow-hidden shadow-lg ${
                    activeStore?.id === store.id ? 'border-[#6F70DE]/40 shadow-xl shadow-[#6F70DE]/10' : 'hover:border-[#6F70DE]/30'
                  }`}
                >
                  <div className={`absolute inset-0 bg-gradient-to-r from-[#6F70DE]/10 via-transparent to-transparent transition-opacity duration-500 ${activeStore?.id === store.id ? 'opacity-100' : 'opacity-0 group-hover:opacity-50'}`}></div>
                  <div className="relative z-10 flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-5">
                    <h4 className="text-white font-bold text-base flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-xl flex items-center justify-center border transition-colors ${activeStore?.id === store.id ? 'bg-[#6F70DE]/20 border-[#6F70DE]/40 text-[#6F70DE]' : 'bg-white/5 border-white/10 text-gray-400 group-hover:bg-[#6F70DE]/10 group-hover:border-[#6F70DE]/30 group-hover:text-[#6F70DE]'}`}>
                        <StoreIcon size={14} />
                      </div>
                      {store.name}
                    </h4>
                    <a 
                      href={store.directionsUrl || `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(store.name + ", " + store.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-[11px] font-semibold text-white bg-[#6F70DE] hover:bg-[#5b5cc4] px-3 py-1.5 rounded-full transition-all flex items-center justify-center gap-1.5 shadow-lg shadow-[#6F70DE]/25 self-start shrink-0 active:scale-95"
                    >
                      Cómo llegar
                    </a>
                  </div>
                  <div className="relative z-10 flex flex-col gap-3 text-[13px] text-gray-400">
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
          <Reveal className="lg:col-span-8 h-full" delay={200}>
            <div className="bg-[#0d0915] rounded-[2.5rem] border border-white/5 shadow-2xl p-2 relative group/map overflow-hidden h-[450px] sm:h-[600px] lg:h-[650px] xl:h-[700px] flex flex-col transition-all duration-500 hover:border-white/10">
              <div className="absolute inset-0 bg-gradient-to-bl from-[#78D4EF]/5 via-transparent to-transparent opacity-50 pointer-events-none"></div>
              <div className="rounded-[2rem] overflow-hidden w-full flex-grow relative z-10">
              <CoverageMapInteractive
                mapRef={mapRef}
                activeStore={activeStore}
                userLocation={userLocation}
                setUserLocation={setUserLocation}
                isSatellite={isSatellite}
                setIsSatellite={setIsSatellite}
                handleFlyTo={handleFlyTo}
              />
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
};

export default CoverageMapSection;
