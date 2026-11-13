import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Phone } from 'lucide-react';
import { CONCIERGE_SERVICES, ENTERPRISE_INFO } from '../data/enterpriseData';
import { LiveBackdropSlideshow } from '../components/LiveBackdropSlideshow';

export const ConciergePage: React.FC = () => {
  return (
    <div className="bg-[#090909] text-[#F7F4ED] min-h-screen">
      <section className="relative py-24 border-b border-[#C8A45D]/30 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/car_mercedes_maybach_s680_1794595220258.jpg',
            '/images/watch_ap_royaloak_1794595200951.jpg',
            '/images/car_bmw_760i_executive_1794595219744.jpg',
          ]}
          intervalMs={3800}
          overlayClassName="bg-gradient-to-r from-black/85 via-black/50 to-black/35"
          showIndicators
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
            Division 06 · Bespoke Private Concierge
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white max-w-3xl">
            Private Aviation, Sourcing & <span className="gold-gradient-text">Diplomatic Escort</span>
          </h1>
          <p className="text-sm sm:text-base text-[#F7F4ED]/90 max-w-2xl bg-black/55 backdrop-blur-md p-4 rounded-xl border border-white/10">
            Discreet execution for chairmen, diplomats, and private collectors across Abuja, Lagos, Umuahia, and international hubs.
          </p>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/spa_aromatherapy_suite_1794595223231.jpg',
            '/images/car_mercedes_g63_1794595205186.jpg',
            '/images/richard_mille_vault.jpg',
          ]}
          intervalMs={4200}
          overlayClassName="bg-gradient-to-b from-[#090909]/85 via-black/70 to-[#090909]/92"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {CONCIERGE_SERVICES.map((srv) => (
            <div key={srv.id} className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between">
              <div>
                <div className="h-52 overflow-hidden">
                  <img src={srv.image} alt={srv.title} className="w-full h-full object-cover" />
                </div>
                <div className="p-6 space-y-3">
                  <div className="text-[11px] uppercase tracking-wider text-[#C8A45D] font-bold">{srv.category}</div>
                  <h2 className="font-serif text-xl font-bold text-white">{srv.title}</h2>
                  <p className="text-xs text-[#F7F4ED]/75 leading-relaxed">{srv.description}</p>
                  <ul className="space-y-1.5 text-[11px] text-[#F7F4ED]/75 pt-2 border-t border-white/10">
                    {srv.offerings.map((o) => (
                      <li key={o} className="flex items-center gap-1.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                        <span>{o}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
              <div className="p-6 pt-0 flex items-center gap-3">
                <Link
                  to="/contact"
                  className="flex-1 py-2.5 rounded-lg bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1.5"
                >
                  <span>Request Briefing</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <a
                  href={`tel:${ENTERPRISE_INFO.contact.phone}`}
                  aria-label="Call Concierge"
                  className="p-2.5 rounded-lg border border-white/15 hover:border-[#C8A45D] text-[#C8A45D]"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
