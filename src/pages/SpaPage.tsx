import React, { useState } from 'react';
import { Calendar, CheckCircle2, MapPin, Phone, ShieldCheck } from 'lucide-react';
import { ENTERPRISE_INFO, SPA_GALLERY_SLIDES, SPA_SPACES } from '../data/enterpriseData';
import { useEnterprise } from '../context/EnterpriseContext';
import { LiveBackdropSlideshow } from '../components/LiveBackdropSlideshow';

const TREATMENT_CATS = ['All', 'Massage', 'Facial & Skincare', 'Hydro & Thermal', 'Holistic & Packages'];

export const SpaPage: React.FC = () => {
  const { treatments, equipment, setModal } = useEnterprise();
  const [selectedCat, setSelectedCat] = useState('All');

  const visibleTreatments = treatments.filter((t) => selectedCat === 'All' || t.category === selectedCat);

  return (
    <div className="bg-[#090909] text-[#F7F4ED] min-h-screen">
      {/* Hero with Live 4-Slide Spa Sanctuary Backdrop */}
      <section className="relative min-h-[72vh] flex items-center justify-center overflow-hidden border-b border-[#C8A45D]/30">
        <LiveBackdropSlideshow
          images={SPA_GALLERY_SLIDES}
          intervalMs={3800}
          overlayClassName="bg-gradient-to-t from-[#090909] via-black/45 to-black/50"
          showIndicators
        />

        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 space-y-5">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
            Division 03 · Five-Star Sanctuary & Medical Wellness
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white">
            Peachy Spa & <span className="gold-gradient-text">Wellness Sanctuary</span>
          </h1>
          <p className="font-serif text-lg italic text-[#DFBF7A]">
            Restorative Holistic Rejuvenation in an Atmosphere of Five-Star Elegance
          </p>

          <div className="inline-flex flex-col sm:flex-row items-center gap-3 p-4 rounded-xl bg-black/75 backdrop-blur-md border border-[#C8A45D]/40 text-xs">
            <span className="flex items-center gap-2 font-semibold text-white">
              <MapPin className="w-4 h-4 text-[#C8A45D]" />
              {ENTERPRISE_INFO.spaLocation.address}, {ENTERPRISE_INFO.spaLocation.city},{' '}
              {ENTERPRISE_INFO.spaLocation.state}
            </span>
            <span className="hidden sm:inline text-white/30">|</span>
            <a
              href={`tel:${ENTERPRISE_INFO.spaLocation.phone}`}
              className="flex items-center gap-1.5 text-[#DFBF7A] font-bold hover:underline"
            >
              <Phone className="w-4 h-4" />
              {ENTERPRISE_INFO.spaLocation.formattedPhone}
            </a>
          </div>
        </div>
      </section>

      {/* Subheading 1: Sanctuary Architecture & Treatment Suites (4-Slide Live Spa Background) */}
      <section className="relative py-20 border-b border-white/10 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/spa_hydro_cryo_1794595205178.jpg',
            '/images/spa_aromatherapy_suite_1794595223231.jpg',
            '/images/spa_facial_suite_1794595223155.jpg',
            '/images/spa_sanctuary.jpg',
          ]}
          intervalMs={3600}
          overlayClassName="bg-gradient-to-b from-[#090909]/78 via-black/58 to-[#090909]/88"
          showIndicators
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="glass-panel rounded-2xl p-6 max-w-2xl">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
              Architectural Suites · 4 Specialized Zones
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
              Hydro-Thermal, LED Facial & Couples Chambers
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {SPA_SPACES.map((space) => (
              <div key={space.id} className="luxury-card rounded-2xl overflow-hidden group">
                <div className="relative h-52 overflow-hidden">
                  <img
                    src={space.image}
                    alt={space.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent p-4 flex flex-col justify-end">
                    <span className="text-[10px] uppercase text-[#C8A45D] font-bold">Suite 0{space.id}</span>
                    <h3 className="font-serif text-base font-bold text-white leading-snug">{space.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <p className="text-xs text-[#F7F4ED]/75 leading-relaxed">{space.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subheading 2: Treatment Protocols Menu (4-Slide Live Spa Background) */}
      <section className="relative py-20 border-b border-white/10 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/spa_facial_suite_1794595223155.jpg',
            '/images/spa_sanctuary.jpg',
            '/images/spa_aromatherapy_suite_1794595223231.jpg',
            '/images/spa_hydro_cryo_1794595205178.jpg',
          ]}
          intervalMs={4000}
          overlayClassName="bg-gradient-to-b from-[#090909]/80 via-black/62 to-[#090909]/90"
          showIndicators
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="glass-panel rounded-2xl p-6 max-w-xl">
              <div className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
                Restorative Treatment Catalogue
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                Holistic & Clinical Therapies (₦ NGN)
              </h2>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1">
              {TREATMENT_CATS.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCat(cat)}
                  className={`px-3.5 py-2 rounded-lg text-xs whitespace-nowrap transition-colors ${
                    selectedCat === cat
                      ? 'bg-[#C8A45D] text-[#090909] font-bold'
                      : 'bg-black/75 border border-white/15 text-[#F7F4ED]/80 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {visibleTreatments.map((tr) => (
              <div key={tr.id} className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between group">
                <div>
                  <div className="relative h-52 overflow-hidden">
                    <img
                      src={tr.image}
                      alt={tr.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-semibold">
                      <span className="text-[#C8A45D] uppercase">{tr.category}</span>
                      <span className="text-white tabular-nums">{tr.durationMinutes} Min</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-white">{tr.name}</h3>
                    <p className="text-xs text-[#F7F4ED]/75 leading-relaxed">{tr.description}</p>
                    <ul className="space-y-1 text-[11px] text-[#F7F4ED]/70 pt-2 border-t border-white/10">
                      {tr.includes.map((inc) => (
                        <li key={inc} className="flex items-center gap-1.5">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                          <span>{inc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="p-6 pt-4 border-t border-white/10 bg-black/40 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Treatment Fee</span>
                    <span className="font-serif text-2xl font-bold text-[#C8A45D] tabular-nums">
                      ₦{tr.priceNgn.toLocaleString()}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setModal({ type: 'spa', treatment: tr })}
                    className="px-5 py-2.5 rounded-xl bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5 transition-colors"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>Reserve</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Subheading 3: Commercial Spa Equipment & Medical Technology (4-Slide Live Spa Background) */}
      <section className="relative py-20 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/spa_aromatherapy_suite_1794595223231.jpg',
            '/images/spa_hydro_cryo_1794595205178.jpg',
            '/images/spa_sanctuary.jpg',
            '/images/spa_facial_suite_1794595223155.jpg',
          ]}
          intervalMs={4200}
          overlayClassName="bg-gradient-to-b from-[#090909]/80 via-black/62 to-[#090909]/92"
          showIndicators
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div className="glass-panel rounded-2xl p-6 max-w-2xl">
              <div className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
                Commercial & Private Estate Acquisitions
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                Professional Spa Equipment & Clinical Systems
              </h2>
            </div>

            <div className="glass-panel px-4 py-2.5 rounded-xl text-xs text-[#DFBF7A] inline-flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-[#C8A45D]" />
              <span>Full Commissioning & Manufacturer Warranty</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {equipment.map((eq) => (
              <div key={eq.id} className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between group">
                <div className="grid grid-cols-1 sm:grid-cols-5">
                  <div className="sm:col-span-2 relative h-52 sm:h-auto overflow-hidden">
                    <img
                      src={eq.image}
                      alt={eq.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                  <div className="sm:col-span-3 p-6 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="text-[11px] uppercase tracking-wider text-[#C8A45D] font-bold">
                        {eq.manufacturer} · {eq.model}
                      </div>
                      <h3 className="font-serif text-xl font-bold text-white">{eq.name}</h3>
                      <p className="text-xs text-[#F7F4ED]/75 leading-relaxed">{eq.description}</p>
                      <div className="text-[11px] text-[#F7F4ED]/65 flex items-center justify-between pt-1">
                        <span>Stock: <strong className="text-white">{eq.stockCount} units</strong></span>
                        <span className="text-emerald-400 font-semibold">{eq.warrantyYears} Yr Warranty</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3">
                      <div>
                        <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Commission Price</span>
                        <span className="font-serif text-xl font-bold text-[#C8A45D] tabular-nums">
                          ₦{eq.priceNgn.toLocaleString()}
                        </span>
                      </div>
                      <a
                        href={`tel:${ENTERPRISE_INFO.spaLocation.phone}`}
                        className="px-4 py-2 rounded-lg bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
                      >
                        <Phone className="w-3.5 h-3.5" />
                        <span>Acquire</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
