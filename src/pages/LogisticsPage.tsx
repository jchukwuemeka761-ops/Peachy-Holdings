import React, { useState } from 'react';
import { CheckCircle2, PackageCheck, Search, ShieldCheck, Truck } from 'lucide-react';
import { LOGISTICS_SERVICES } from '../data/enterpriseData';
import { useEnterprise } from '../context/EnterpriseContext';
import { LiveBackdropSlideshow } from '../components/LiveBackdropSlideshow';

export const LogisticsPage: React.FC = () => {
  const { shipments } = useEnterprise();
  const [trackingQuery, setTrackingQuery] = useState('PHE-8827-010');
  const [weightKg, setWeightKg] = useState(5);
  const [serviceTier, setServiceTier] = useState<'local' | 'international' | 'armored'>('armored');

  const activeShipment = shipments.find(
    (s) => s.trackingNumber.toLowerCase() === trackingQuery.trim().toLowerCase(),
  );

  const estimatedQuoteNgn =
    (serviceTier === 'armored' ? 280000 : serviceTier === 'international' ? 165000 : 45000) +
    Math.max(1, weightKg) * (serviceTier === 'armored' ? 35000 : 18500);

  return (
    <div className="bg-[#090909] text-[#F7F4ED] min-h-screen">
      {/* Hero with Live Armored Freight Slideshow */}
      <section className="relative py-24 border-b border-[#C8A45D]/30 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/car_prado_gr_sport_1794595221295.jpg',
            '/images/car_mercedes_g63_1794595205186.jpg',
            '/images/car_toyota_prado_1794595203870.jpg',
          ]}
          intervalMs={3800}
          overlayClassName="bg-gradient-to-r from-black/85 via-black/55 to-black/35"
          showIndicators
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
            Division 04 · Global Freight & Armored Custody
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white max-w-3xl">
            Armored Logistics & <span className="gold-gradient-text">Live Tracking</span>
          </h1>
          <p className="text-sm sm:text-base text-[#F7F4ED]/90 max-w-2xl bg-black/55 backdrop-blur-md p-4 rounded-xl border border-white/10">
            Calculate instant insured freight quotes in Nigerian Naira (₦) and monitor active high-value horology and motorcade cargo across every hub.
          </p>
        </div>
      </section>

      {/* Services & Live Quote Subheading */}
      <section className="relative py-16 border-b border-white/10 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/watches_vault.jpg',
            '/images/car_bmw_760i_executive_1794595219744.jpg',
            '/images/richard_mille_vault.jpg',
          ]}
          intervalMs={4000}
          overlayClassName="bg-gradient-to-b from-[#090909]/85 via-black/70 to-[#090909]/92"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-7 space-y-6">
            {LOGISTICS_SERVICES.map((srv) => (
              <div key={srv.id} className="luxury-card rounded-2xl overflow-hidden grid grid-cols-1 sm:grid-cols-5">
                <div className="sm:col-span-2 h-48 sm:h-auto">
                  <img src={srv.image} alt={srv.title} className="w-full h-full object-cover" />
                </div>
                <div className="sm:col-span-3 p-6 space-y-3">
                  <h2 className="font-serif text-xl font-bold text-white">{srv.title}</h2>
                  <p className="text-xs text-[#F7F4ED]/75 leading-relaxed">{srv.description}</p>
                  <ul className="space-y-1 text-[11px] text-[#F7F4ED]/70">
                    {srv.features.map((f) => (
                      <li key={f} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>

          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 text-xs uppercase tracking-widest text-[#C8A45D] font-bold">
              <Truck className="w-4 h-4" />
              <span>Instant Freight Calculator (₦ NGN)</span>
            </div>
            <h2 className="font-serif text-2xl font-bold text-white">Estimate Dispatch Tariff</h2>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block text-[#F7F4ED]/70 uppercase tracking-wider mb-1">Service Protocol</label>
                <select
                  value={serviceTier}
                  onChange={(e) => setServiceTier(e.target.value as 'local' | 'international' | 'armored')}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#181818] border border-white/10 text-white"
                >
                  <option value="armored">Armored Horology Vault Escort</option>
                  <option value="international">International Air Cargo (EU / Nigeria)</option>
                  <option value="local">Same-Day Domestic Priority Dispatch</option>
                </select>
              </div>
              <div>
                <label className="block text-[#F7F4ED]/70 uppercase tracking-wider mb-1">Consignment Weight (KG)</label>
                <input
                  type="number"
                  min={1}
                  max={1000}
                  value={weightKg}
                  onChange={(e) => setWeightKg(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#181818] border border-white/10 text-white"
                />
              </div>

              <div className="p-5 rounded-xl bg-black/60 border border-[#C8A45D]/35 space-y-1">
                <span className="text-[10px] uppercase text-[#F7F4ED]/50 block">Estimated Insured Quote</span>
                <div className="font-serif text-3xl font-bold text-[#C8A45D] tabular-nums">
                  ₦{estimatedQuoteNgn.toLocaleString()}
                </div>
                <div className="text-[11px] text-emerald-400 flex items-center gap-1 pt-1">
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Full biometric custody & transit bond included</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Shipment Waybill Tracker */}
      <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <div className="text-xs uppercase tracking-widest text-[#C8A45D] font-bold">Waybill Telemetry</div>
            <h2 className="font-serif text-3xl font-bold text-white">Track Active Shipment</h2>
          </div>

          <div className="flex items-center gap-2">
            {shipments.map((s) => (
              <button
                key={s.trackingNumber}
                type="button"
                onClick={() => setTrackingQuery(s.trackingNumber)}
                className={`px-3 py-1.5 rounded-lg text-xs font-mono border transition-colors ${
                  trackingQuery.toUpperCase() === s.trackingNumber
                    ? 'bg-[#C8A45D] text-[#090909] border-[#C8A45D] font-bold'
                    : 'bg-[#181818] text-[#F7F4ED]/80 border-white/15'
                }`}
              >
                {s.trackingNumber}
              </button>
            ))}
          </div>
        </div>

        <div className="relative max-w-md">
          <Search className="w-4 h-4 text-[#C8A45D] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={trackingQuery}
            onChange={(e) => setTrackingQuery(e.target.value)}
            placeholder="Enter waybill e.g. PHE-8827-010"
            className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-[#181818] border border-white/15 text-xs text-white font-mono focus:border-[#C8A45D] focus:outline-none"
          />
        </div>

        {activeShipment ? (
          <div className="luxury-card rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-5">
              <div>
                <div className="font-mono text-sm font-bold text-[#C8A45D]">{activeShipment.trackingNumber}</div>
                <h3 className="font-serif text-2xl font-bold text-white mt-0.5">
                  {activeShipment.origin} → {activeShipment.destination}
                </h3>
                <div className="text-xs text-[#F7F4ED]/65 mt-1">
                  {activeShipment.serviceType} · Declared Value:{' '}
                  <strong className="text-[#DFBF7A] font-mono">
                    ₦{activeShipment.declaredValueNgn.toLocaleString()}
                  </strong>
                </div>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-emerald-950/70 border border-emerald-500/30 text-emerald-300 text-xs font-semibold">
                <PackageCheck className="w-4 h-4" />
                <span>{activeShipment.currentStage}</span>
              </div>
            </div>

            <div className="space-y-3">
              {activeShipment.history.map((ev, idx) => (
                <div key={idx} className="p-4 rounded-xl bg-black/50 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div>
                    <div className="text-xs font-bold text-[#C8A45D]">{ev.stage} · {ev.location}</div>
                    <p className="text-xs text-[#F7F4ED]/80 mt-0.5">{ev.notes}</p>
                  </div>
                  <span className="text-[11px] font-mono text-[#F7F4ED]/50 shrink-0">{ev.timestamp}</span>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="luxury-card rounded-2xl p-8 text-center text-xs text-[#F7F4ED]/65">
            No shipment matched "{trackingQuery}". Try selecting <strong>PHE-8827-010</strong> or <strong>PHE-4391-772</strong>.
          </div>
        )}
      </section>
    </div>
  );
};
