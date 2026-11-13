import React, { useState } from 'react';
import { Send, TrendingUp } from 'lucide-react';
import { DIGITAL_ASSETS } from '../data/enterpriseData';
import { useEnterprise } from '../context/EnterpriseContext';
import { LiveBackdropSlideshow } from '../components/LiveBackdropSlideshow';

export const DigitalAssetsPage: React.FC = () => {
  const { addInquiry } = useEnterprise();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [allocationNgn, setAllocationNgn] = useState('₦50,000,000+');
  const [sent, setSent] = useState(false);

  const handleConsult = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({
      name,
      email,
      phone: '+234',
      division: 'Digital Asset Treasury Advisory',
      message: `Confidential treasury desk consultation requested for Naira portfolio band: ${allocationNgn}`,
    });
    setSent(true);
    setName('');
    setEmail('');
  };

  return (
    <div className="bg-[#090909] text-[#F7F4ED] min-h-screen">
      <section className="relative py-24 border-b border-[#C8A45D]/30 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/watch_mechanical_tourbillon_gold_1794595222285.jpg',
            '/images/watches_vault.jpg',
            '/images/car_bmw_760i_executive_1794595219744.jpg',
          ]}
          intervalMs={3800}
          overlayClassName="bg-gradient-to-r from-black/85 via-black/60 to-black/35"
          showIndicators
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
            Division 05 · Institutional Digital Assets
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white max-w-3xl">
            Digital Asset Valuations in <span className="gold-gradient-text">Nigerian Naira</span>
          </h1>
          <p className="text-sm sm:text-base text-[#F7F4ED]/90 max-w-2xl bg-black/55 backdrop-blur-md p-4 rounded-xl border border-white/10">
            Track major digital reserves priced cleanly in Naira (₦ NGN) and schedule private treasury structuring consultations.
          </p>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/richard_mille_vault.jpg',
            '/images/car_mercedes_maybach_s680_1794595220258.jpg',
            '/images/watch_ap_royaloak_1794595200951.jpg',
          ]}
          intervalMs={4200}
          overlayClassName="bg-gradient-to-b from-[#090909]/85 via-black/75 to-[#090909]/92"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {DIGITAL_ASSETS.map((coin) => (
              <div key={coin.symbol} className="luxury-card rounded-2xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xs font-mono font-bold text-[#C8A45D]">{coin.symbol} / NGN</div>
                    <h2 className="font-serif text-xl font-bold text-white">{coin.name}</h2>
                  </div>
                  <span className="inline-flex items-center gap-1 text-xs font-mono font-semibold text-emerald-400">
                    <TrendingUp className="w-3.5 h-3.5" />+{coin.change24h}%
                  </span>
                </div>

                <div className="font-serif text-2xl font-bold text-white tabular-nums">
                  ₦{coin.priceNgn.toLocaleString()}
                </div>

                <div className="space-y-1.5 text-[11px] text-[#F7F4ED]/70 border-t border-white/10 pt-3">
                  <div className="flex justify-between">
                    <span>24h High</span>
                    <span className="font-mono text-white tabular-nums">₦{coin.high24hNgn.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>24h Low</span>
                    <span className="font-mono text-white tabular-nums">₦{coin.low24hNgn.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Market Cap</span>
                    <span className="font-mono text-[#DFBF7A]">{coin.marketCapNgn}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>24h Volume</span>
                    <span className="font-mono text-white">{coin.volume24hNgn}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-2xl mx-auto glass-panel rounded-2xl p-8 space-y-5">
            <h3 className="font-serif text-2xl font-bold text-white">Request Private Treasury Consultation</h3>
            {sent ? (
              <div className="p-4 rounded-xl bg-emerald-950/60 border border-emerald-500/30 text-xs text-emerald-300">
                Your consultation request has been logged for review by our Executive Treasury Desk.
              </div>
            ) : (
              <form onSubmit={handleConsult} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Legal Name"
                    className="px-3 py-2.5 rounded-lg bg-[#181818] border border-white/15 text-white"
                  />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Corporate Email"
                    className="px-3 py-2.5 rounded-lg bg-[#181818] border border-white/15 text-white"
                  />
                </div>
                <select
                  value={allocationNgn}
                  onChange={(e) => setAllocationNgn(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#181818] border border-white/15 text-white"
                >
                  <option value="₦25,000,000 – ₦100,000,000">Allocation Band: ₦25M – ₦100M NGN</option>
                  <option value="₦100,000,000 – ₦500,000,000">Allocation Band: ₦100M – ₦500M NGN</option>
                  <option value="₦500,000,000+ Institutional">Allocation Band: ₦500M+ Institutional Desk</option>
                </select>
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] font-bold uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Schedule Advisory Briefing</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
