import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShieldCheck } from 'lucide-react';
import { LiveBackdropSlideshow } from '../components/LiveBackdropSlideshow';

const PILLARS = [
  {
    title: 'Uncompromising Exclusivity',
    desc: 'Every BMW Competition coupe, Toyota Land Cruiser Prado, Lexus IS 350, and Richard Mille timepiece is individually inspected for perfection.',
  },
  {
    title: 'Verified Naira Settlement',
    desc: '100% transparent valuations in Nigerian Naira (₦ NGN) across private acquisitions, mobility contracts, and spa wellness.',
  },
  {
    title: 'Bespoke Discretion',
    desc: 'Dedicated client custody backed by Geneva horological certification and diplomatic escort teams.',
  },
];

export const AboutPage: React.FC = () => {
  return (
    <div className="bg-[#090909] text-[#F7F4ED] min-h-screen">
      {/* Hero with Live Corporate Showcase Slideshow */}
      <section className="relative py-28 border-b border-[#C8A45D]/30 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/hero_holding.jpg',
            '/images/car_mercedes_maybach_s680_1794595220258.jpg',
            '/images/spa_sanctuary.jpg',
            '/images/watch_mechanical_tourbillon_gold_1794595222285.jpg',
          ]}
          intervalMs={3800}
          overlayClassName="bg-gradient-to-r from-black/85 via-black/50 to-black/35"
          showIndicators
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
            Corporate Heritage · Peachy Holdings
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white max-w-3xl">
            Excellence Beyond <span className="gold-gradient-text">Expectations</span>
          </h1>
          <p className="text-sm sm:text-base text-[#F7F4ED]/90 max-w-2xl bg-black/55 backdrop-blur-md p-4 rounded-xl border border-white/10">
            One Enterprise. Multiple Possibilities. Exceptional Experiences. Uniting premier executive vehicles, mechanical watches, holistic wellness, and armored freight under Peachy Holdings.
          </p>
        </div>
      </section>

      {/* Governance Subheading with Rotating Backdrop */}
      <section className="relative py-20 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/car_bmw_760i_executive_1794595219744.jpg',
            '/images/richard_mille_vault.jpg',
            '/images/spa_hydro_cryo_1794595205178.jpg',
          ]}
          intervalMs={4200}
          overlayClassName="bg-gradient-to-b from-[#090909]/85 via-black/70 to-[#090909]/92"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PILLARS.map((p) => (
              <div key={p.title} className="luxury-card rounded-2xl p-6 space-y-3">
                <ShieldCheck className="w-6 h-6 text-[#C8A45D]" />
                <h2 className="font-serif text-xl font-bold text-white">{p.title}</h2>
                <p className="text-xs text-[#F7F4ED]/75 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>

          <div className="glass-panel rounded-2xl p-8 flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl font-bold text-white">Explore What Peachy Holdings Offers</h3>
              <p className="text-xs text-[#F7F4ED]/75 mt-1">
                Visit each specialized division or arrange a private briefing with our operations desk.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                to="/luxury-cars"
                className="px-5 py-2.5 rounded-lg bg-[#C8A45D] text-[#090909] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-1.5"
              >
                <span>Vehicles</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <Link
                to="/luxury-watches"
                className="px-5 py-2.5 rounded-lg border border-[#C8A45D]/40 text-[#C8A45D] hover:bg-[#C8A45D]/10 font-bold text-xs uppercase tracking-wider"
              >
                Watches
              </Link>
              <Link
                to="/spa-wellness"
                className="px-5 py-2.5 rounded-lg border border-white/20 text-white hover:border-[#C8A45D] font-semibold text-xs uppercase tracking-wider"
              >
                Spa Sanctuary
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
