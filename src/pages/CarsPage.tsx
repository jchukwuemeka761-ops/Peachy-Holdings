import React, { useMemo, useState } from 'react';
import { Calendar, CheckCircle2, Gauge, Search, Users, Zap } from 'lucide-react';
import { CAR_GALLERY_SLIDES } from '../data/enterpriseData';
import { useEnterprise } from '../context/EnterpriseContext';
import { LiveBackdropSlideshow } from '../components/LiveBackdropSlideshow';
import { LuxuryVehicle } from '../types/enterprise';

const SEGMENTS = [
  'All',
  'BMW',
  'Competition',
  'Toyota Prado',
  'Lexus IS 350',
  'Mercedes-Benz',
  'Rolls-Royce',
  'Lamborghini',
] as const;

export const CarsPage: React.FC = () => {
  const { vehicles, setModal } = useEnterprise();
  const [selectedSegment, setSelectedSegment] = useState<string>('All');
  const [search, setSearch] = useState('');

  const filteredVehicles = useMemo(() => {
    const q = search.trim().toLowerCase();
    return vehicles.filter((v) => {
      const matchesSeg = selectedSegment === 'All' || v.segment === selectedSegment;
      const matchesQ =
        !q ||
        v.name.toLowerCase().includes(q) ||
        v.manufacturer.toLowerCase().includes(q) ||
        v.segment.toLowerCase().includes(q) ||
        v.engine.toLowerCase().includes(q);
      return matchesSeg && matchesQ;
    });
  }, [vehicles, selectedSegment, search]);

  const performanceGroup = filteredVehicles.filter((v) =>
    ['Competition', 'BMW', 'Lexus IS 350', 'Lamborghini'].includes(v.segment),
  );
  const suvSovereignGroup = filteredVehicles.filter((v) =>
    ['Toyota Prado', 'Mercedes-Benz', 'Rolls-Royce'].includes(v.segment),
  );

  const renderVehicleCard = (v: LuxuryVehicle) => (
    <article
      key={v.id}
      className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl group"
    >
      <div>
        <div className="relative h-60 overflow-hidden bg-black">
          <img
            src={v.image}
            alt={v.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px] font-semibold">
            <span className="text-[#DFBF7A] uppercase tracking-wider">
              {v.segment} · {v.modelYear}
            </span>
            <span className="text-emerald-400">{v.status}</span>
          </div>
        </div>

        <div className="p-6 space-y-4">
          <div>
            <div className="text-[11px] uppercase tracking-widest text-[#C8A45D] font-bold">
              {v.manufacturer}
            </div>
            <h3 className="font-serif text-2xl font-bold text-white mt-0.5">{v.name}</h3>
          </div>

          <p className="text-xs text-[#F7F4ED]/75 leading-relaxed">{v.description}</p>

          {/* Complete Vehicle Specifications */}
          <div className="grid grid-cols-3 gap-2 p-3 rounded-xl bg-black/50 border border-white/10 text-[11px]">
            <div>
              <span className="text-[#F7F4ED]/45 block text-[10px] uppercase">Power</span>
              <strong className="text-white flex items-center gap-1">
                <Zap className="w-3 h-3 text-[#C8A45D]" />
                {v.horsepower}
              </strong>
            </div>
            <div>
              <span className="text-[#F7F4ED]/45 block text-[10px] uppercase">0-100 km/h</span>
              <strong className="text-white flex items-center gap-1 tabular-nums">
                <Gauge className="w-3 h-3 text-[#C8A45D]" />
                {v.zeroToHundred}
              </strong>
            </div>
            <div>
              <span className="text-[#F7F4ED]/45 block text-[10px] uppercase">Seats</span>
              <strong className="text-white flex items-center gap-1 tabular-nums">
                <Users className="w-3 h-3 text-[#C8A45D]" />
                {v.seats} Adults
              </strong>
            </div>
            <div className="col-span-3 pt-1 border-t border-white/5 text-[11px] text-[#F7F4ED]/70">
              Engine: <strong className="text-white">{v.engine}</strong> · {v.transmission}
            </div>
          </div>

          <ul className="space-y-1 text-[11px] text-[#F7F4ED]/70">
            {v.features.map((feat) => (
              <li key={feat} className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                <span>{feat}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Pricing in NGN Naira + Booking Button */}
      <div className="p-6 pt-4 border-t border-white/10 bg-black/40 space-y-3">
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div>
            <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Daily Rate</span>
            <strong className="font-mono text-sm text-[#C8A45D] tabular-nums">
              ₦{v.dailyPrice.toLocaleString()}
            </strong>
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Weekly Rate</span>
            <strong className="font-mono text-xs text-white tabular-nums">
              ₦{v.weeklyPrice.toLocaleString()}
            </strong>
          </div>
          <div>
            <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Monthly Rate</span>
            <strong className="font-mono text-xs text-white tabular-nums">
              ₦{v.monthlyPrice.toLocaleString()}
            </strong>
          </div>
        </div>

        <button
          type="button"
          onClick={() => setModal({ type: 'car', vehicle: v })}
          className="w-full py-3 rounded-xl bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-colors"
        >
          <Calendar className="w-4 h-4" />
          <span>Reserve {v.name}</span>
        </button>
      </div>
    </article>
  );

  return (
    <div className="bg-[#090909] text-[#F7F4ED] min-h-screen">
      {/* Live Automotive Background Slideshow Hero */}
      <section className="relative py-28 border-b border-[#C8A45D]/30 overflow-hidden">
        <LiveBackdropSlideshow
          images={CAR_GALLERY_SLIDES}
          intervalMs={3600}
          overlayClassName="bg-gradient-to-r from-black/80 via-black/45 to-black/30"
          showIndicators
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
            Division 01 · Executive Fleet & Mobility
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white max-w-3xl">
            Standalone <span className="gold-gradient-text">Luxury Vehicles</span>
          </h1>
          <p className="text-sm sm:text-base text-[#F7F4ED]/90 max-w-2xl bg-black/55 backdrop-blur-md p-4 rounded-xl border border-white/10">
            Zero duplicate cars: BMWs, Competition Coupés & Sedans, Toyota Land Cruiser Prados, Lexus IS 350 F Sport, Mercedes-AMG G63, Maybach S680, Rolls-Royce, and Lamborghini — each individually photographed and priced in Naira (₦).
          </p>
        </div>
      </section>

      {/* Filter Bar */}
      <section className="bg-[#0d0d0d] border-b border-white/10 py-4 sticky top-18 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="relative w-full lg:w-72">
            <Search className="w-4 h-4 text-[#C8A45D] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search BMW, Competition, Prado, Lexus..."
              className="w-full pl-9 pr-4 py-2 rounded-xl bg-[#181818] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2 overflow-x-auto py-1">
            {SEGMENTS.map((seg) => (
              <button
                key={seg}
                type="button"
                onClick={() => setSelectedSegment(seg)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${
                  selectedSegment === seg
                    ? 'bg-[#C8A45D] text-[#090909] font-bold'
                    : 'bg-[#181818] text-[#F7F4ED]/75 hover:text-white border border-white/10'
                }`}
              >
                {seg}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Subheading 1: BMWs, Competition Series, Lexus IS 350 & Supercars (Live Background Slideshow) */}
      {performanceGroup.length > 0 && (
        <section className="relative py-16 border-b border-white/10 overflow-hidden">
          <LiveBackdropSlideshow
            images={[
              '/images/car_bmw_m_competition_1794595203554.jpg',
              '/images/car_bmw_m5_competition_1794595219895.jpg',
              '/images/car_lexus_is350_1794595205656.jpg',
              '/images/car_lamborghini_revuelto_1794595221404.jpg',
            ]}
            intervalMs={4000}
            overlayClassName="bg-gradient-to-b from-[#090909]/80 via-black/60 to-[#090909]/90"
            showIndicators
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="glass-panel rounded-2xl p-6 max-w-2xl">
              <div className="text-xs uppercase tracking-widest text-[#C8A45D] font-bold">
                Performance & Executive Saloons
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                BMWs, M Competition Series & Lexus IS 350 Fleet
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {performanceGroup.map(renderVehicleCard)}
            </div>
          </div>
        </section>
      )}

      {/* Subheading 2: Toyota Land Cruiser Prado, Mercedes-Benz & Sovereign Fleet (Live Background Slideshow) */}
      {suvSovereignGroup.length > 0 && (
        <section className="relative py-16 overflow-hidden">
          <LiveBackdropSlideshow
            images={[
              '/images/car_toyota_prado_1794595203870.jpg',
              '/images/car_prado_gr_sport_1794595221295.jpg',
              '/images/car_mercedes_g63_1794595205186.jpg',
              '/images/car_mercedes_maybach_s680_1794595220258.jpg',
            ]}
            intervalMs={3800}
            overlayClassName="bg-gradient-to-b from-[#090909]/80 via-black/60 to-[#090909]/90"
            showIndicators
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="glass-panel rounded-2xl p-6 max-w-2xl">
              <div className="text-xs uppercase tracking-widest text-[#C8A45D] font-bold">
                Command SUVs & Diplomatic Limousines
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Toyota Land Cruiser Prados, Mercedes-Benz & Rolls-Royce
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {suvSovereignGroup.map(renderVehicleCard)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
