import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { LiveBackdropSlideshow } from '../components/LiveBackdropSlideshow';
import { CAR_GALLERY_SLIDES, SPA_GALLERY_SLIDES, WATCH_GALLERY_SLIDES } from '../data/enterpriseData';

const DIVISION_SECTIONS = [
  {
    number: '01',
    title: 'Luxury Cars & Competition Fleet',
    subtitle: 'Executive Chauffeur & Self-Drive Mobility',
    description:
      'Featuring BMW M4 & M5 Competition, BMW 760i Executive, Toyota Land Cruiser Prado VX-L & GR-Sport, Lexus IS 350 F Sport, Mercedes-AMG G63, Maybach S680, Rolls-Royce, and Lamborghini Revuelto.',
    priceNote: 'Daily tariffs from ₦420,000 / day',
    to: '/luxury-cars',
    cta: 'Open Fleet Catalogue',
    slides: CAR_GALLERY_SLIDES,
  },
  {
    number: '02',
    title: 'Haute Horlogerie & Mechanical Wristwatches',
    subtitle: '21 Unique Verified Timepieces · Zero Makeup or Bags',
    description:
      'Collectible horology spanning Richard Mille tourbillons, Rolex Daytona & Day-Date, Audemars Piguet Royal Oak, Alexander McQueen mechanical skeletons, Omega Moonwatch, Casio G-Shock MR-G, and Casio.',
    priceNote: 'Valuations from ₦220,000 to ₦1.85B NGN',
    to: '/luxury-watches',
    cta: 'Open Wristwatches Vault',
    slides: WATCH_GALLERY_SLIDES,
  },
  {
    number: '03',
    title: 'Peachy Spa & Five-Star Wellness Sanctuary',
    subtitle: 'Store 5, 53 Awolowo Street, Umuahia · Abia State',
    description:
      'Hydro-thermal mineralized pools, Nordic cedar infrared saunas, 24K gold LED phototherapy facials, couples suites, and commercial clinical wellness machinery.',
    priceNote: 'Sessions from ₦120,000 NGN',
    to: '/spa-wellness',
    cta: 'Enter Wellness Sanctuary',
    slides: SPA_GALLERY_SLIDES,
  },
  {
    number: '04',
    title: 'Armored Global Freight & Courier',
    subtitle: 'Vault-to-Vault Priority Security Logistics',
    description:
      'Bonded diplomatic air corridors linking Geneva, Munich, London, Lagos, Abuja, and Umuahia with live waybill telemetry and Naira transit quoting.',
    priceNote: 'Domestic Armored Dispatch from ₦85,000 NGN',
    to: '/logistics',
    cta: 'Track & Quote Freight',
    slides: [
      '/images/car_prado_gr_sport_1794595221295.jpg',
      '/images/car_toyota_prado_1794595203870.jpg',
      '/images/car_mercedes_g63_1794595205186.jpg',
    ],
  },
  {
    number: '05',
    title: 'Digital Assets & Naira Treasury Advisory',
    subtitle: 'Institutional Portfolio Strategy',
    description:
      'Transparent NGN market tracking across BTC, ETH, SOL, and BNB alongside confidential wealth structuring and private desk consultations.',
    priceNote: 'Live NGN Settlement Desk',
    to: '/digital-assets',
    cta: 'Open Digital Assets',
    slides: [
      '/images/watch_mechanical_tourbillon_gold_1794595222285.jpg',
      '/images/watches_vault.jpg',
      '/images/car_bmw_760i_executive_1794595219744.jpg',
    ],
  },
  {
    number: '06',
    title: 'Lifestyle Concierge & GPS Command',
    subtitle: 'Private Aviation, Sourcing & Live Umuahia Navigation',
    description:
      'Charter aviation tarmac transfers, bespoke off-catalog watch procurement, armored convoys, and step-by-step GPS guidance to our Umuahia Wellness Sanctuary.',
    priceNote: 'Direct Liaison: +234 708 827 7884',
    to: '/lifestyle-concierge',
    cta: 'Request Private Concierge',
    slides: [
      '/images/car_mercedes_maybach_s680_1794595220258.jpg',
      '/images/watch_ap_royaloak_1794595200951.jpg',
      '/images/spa_aromatherapy_suite_1794595223231.jpg',
    ],
  },
];

export const DivisionsPage: React.FC = () => {
  return (
    <div className="bg-[#090909] text-[#F7F4ED] min-h-screen">
      {/* Page Hero with Visible Multi-Slide Backdrop */}
      <section className="relative py-28 border-b border-[#C8A45D]/30 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/hero_holding.jpg',
            '/images/richard_mille_vault.jpg',
            '/images/spa_sanctuary.jpg',
            '/images/car_bmw_m_competition_1794595203554.jpg',
          ]}
          intervalMs={4000}
          overlayClassName="bg-gradient-to-b from-black/65 via-black/45 to-[#090909]"
          showIndicators
        />
        <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
            Peachy Holdings Architecture
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white max-w-3xl">
            Six Autonomous <span className="gold-gradient-text">Luxury Divisions</span>
          </h1>
          <p className="text-sm sm:text-base text-[#F7F4ED]/90 max-w-2xl bg-black/55 backdrop-blur-md p-4 rounded-xl border border-white/10">
            Every business unit operates on its own dedicated platform route with live background showcases and transparent Naira (₦) pricing.
          </p>
        </div>
      </section>

      {/* Each Subheading Section has its own 3-4 Photo Live Background Slideshow */}
      <div className="divide-y divide-white/10">
        {DIVISION_SECTIONS.map((div) => (
          <section key={div.number} className="relative py-24 overflow-hidden">
            <LiveBackdropSlideshow
              images={div.slides}
              intervalMs={3600}
              overlayClassName="bg-gradient-to-r from-black/85 via-black/60 to-black/35"
              showIndicators
            />
            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-2xl glass-panel rounded-2xl p-8 space-y-4 shadow-2xl">
                <div className="flex items-center gap-3 text-xs uppercase tracking-widest text-[#C8A45D] font-bold">
                  <span>Division {div.number}</span>
                  <span>·</span>
                  <span>{div.subtitle}</span>
                </div>
                <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white">{div.title}</h2>
                <p className="text-sm text-[#F7F4ED]/85 leading-relaxed">{div.description}</p>
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-white/10">
                  <span className="font-mono text-xs font-semibold text-[#DFBF7A]">{div.priceNote}</span>
                  <Link
                    to={div.to}
                    className="px-6 py-3 rounded-xl bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2 transition-colors"
                  >
                    <span>{div.cta}</span>
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};
