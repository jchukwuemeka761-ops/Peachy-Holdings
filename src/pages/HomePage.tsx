import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Car,
  ChevronLeft,
  ChevronRight,
  Compass,
  ShieldCheck,
  Sparkles,
  Truck,
  Watch,
} from 'lucide-react';
import { CAR_GALLERY_SLIDES, SPA_GALLERY_SLIDES, WATCH_GALLERY_SLIDES } from '../data/enterpriseData';
import { LiveBackdropSlideshow } from '../components/LiveBackdropSlideshow';

interface HeroSlide {
  id: number;
  category: string;
  title: string;
  highlight: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  badge: string;
}

const HERO_SLIDES: HeroSlide[] = [
  {
    id: 0,
    category: 'LUXURY MOBILITY FLEET',
    title: 'SUPREME EXECUTIVE',
    highlight: 'MOTORCADE FLEET',
    subtitle:
      'BMW M Competition Series, Toyota Land Cruiser Prado, Lexus IS 350, Mercedes-AMG G63, Maybach S680, and Rolls-Royce. Settled seamlessly in Naira (₦).',
    image: '/images/car_bmw_m_competition_1794595203554.jpg',
    ctaText: 'EXPLORE VEHICLES',
    ctaLink: '/luxury-cars',
    badge: '12 Standalone Unique Motorcars',
  },
  {
    id: 1,
    category: 'HAUTE HORLOGERIE VAULT',
    title: 'MASTERPIECE WATCHES &',
    highlight: 'MECHANICAL ICONS',
    subtitle:
      'Richard Mille, Rolex, Audemars Piguet, Alexander McQueen mechanicals, Omega, Casio G-Shock & Casio — each standalone with full specifications and Naira valuations.',
    image: '/images/richard_mille_vault.jpg',
    ctaText: 'EXPLORE WRISTWATCHES',
    ctaLink: '/luxury-watches',
    badge: '21 Unique Mechanical & Tactical Timepieces',
  },
  {
    id: 2,
    category: 'FIVE-STAR SPA SANCTUARY',
    title: 'RESTORATIVE HOLISTIC',
    highlight: 'WELLNESS SANCTUARY',
    subtitle:
      'Italian travertine chambers, infrared saunas, hydrotherapy circuits, and 24K gold facials at Store 5, 53 Awolowo Street, Umuahia, Abia State.',
    image: '/images/spa_hydro_cryo_1794595205178.jpg',
    ctaText: 'ENTER SPA SANCTUARY',
    ctaLink: '/spa-wellness',
    badge: 'Umuahia Flagship · +234 708 827 7884',
  },
  {
    id: 3,
    category: 'PEACHY HOLDINGS FLAGSHIP',
    title: 'EXPERIENCE THE',
    highlight: 'EXTRAORDINARY.',
    subtitle:
      'One Enterprise. Multiple Possibilities. Exceptional Experiences — Dedicated pages with live visual slideshows across every division and Naira escrow.',
    image: '/images/car_mercedes_maybach_s680_1794595220258.jpg',
    ctaText: 'VIEW ALL DIVISIONS',
    ctaLink: '/divisions',
    badge: 'Peachy Holdings · Excellence Beyond Expectations',
  },
];

const PORTAL_GATEWAYS = [
  {
    title: 'Business Divisions',
    subtitle: 'All 6 pillars on one dedicated command showcase',
    to: '/divisions',
    slides: ['/images/hero_holding.jpg', '/images/car_mercedes_g63_1794595205186.jpg', '/images/spa_sanctuary.jpg'],
    icon: Sparkles,
  },
  {
    title: 'Luxury Cars & Vehicles',
    subtitle: 'BMW Competition, Land Cruiser Prado, Lexus IS 350 & Mercedes-Benz',
    to: '/luxury-cars',
    slides: CAR_GALLERY_SLIDES.slice(0, 4),
    icon: Car,
  },
  {
    title: 'Mechanical Wristwatches',
    subtitle: 'Richard Mille, Rolex, AP, Alexander McQueen, G-Shock & Casio',
    to: '/luxury-watches',
    slides: WATCH_GALLERY_SLIDES.slice(0, 4),
    icon: Watch,
  },
  {
    title: 'Five-Star Spa Sanctuary',
    subtitle: 'Umuahia wellness suites, holistic therapies & clinical systems',
    to: '/spa-wellness',
    slides: SPA_GALLERY_SLIDES,
    icon: Sparkles,
  },
  {
    title: 'GPS & Live Navigation',
    subtitle: 'Interactive map & directions to 53 Awolowo Street, Umuahia',
    to: '/gps-map',
    slides: ['/images/car_toyota_prado_1794595203870.jpg', '/images/spa_sanctuary.jpg', '/images/car_lexus_is350_white_1794595222533.jpg'],
    icon: Compass,
  },
  {
    title: 'Armored Logistics',
    subtitle: 'Freight quote calculator in Naira (₦) & real-time tracking',
    to: '/logistics',
    slides: ['/images/car_prado_gr_sport_1794595221295.jpg', '/images/car_mercedes_g63_1794595205186.jpg', '/images/watches_vault.jpg'],
    icon: Truck,
  },
];

export const HomePage: React.FC = () => {
  const [slideIdx, setSlideIdx] = useState(0);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5200);
    return () => window.clearInterval(timer);
  }, []);

  const currentSlide = HERO_SLIDES[slideIdx];

  return (
    <div className="bg-[#090909] text-[#F7F4ED]">
      {/* Acclaimed Fullscreen Hero Slideshow Preserved */}
      <section className="relative min-h-[88vh] flex items-center justify-center overflow-hidden bg-black">
        <div className="absolute inset-0 z-0">
          {HERO_SLIDES.map((s, idx) => (
            <img
              key={s.id}
              src={s.image}
              alt={s.title}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-all duration-1000 ${
                idx === slideIdx ? 'opacity-100 scale-105' : 'opacity-0 scale-100'
              }`}
            />
          ))}
          <div className="absolute inset-0 bg-gradient-to-t from-[#090909] via-black/45 to-black/55" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-20 space-y-6">
          <div className="text-xs uppercase tracking-[0.25em] text-[#DFBF7A] font-semibold">
            {currentSlide.category} · {currentSlide.badge}
          </div>

          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-white drop-shadow-xl">
            {currentSlide.title} <span className="gold-gradient-text block sm:inline">{currentSlide.highlight}</span>
          </h1>

          <p className="text-sm sm:text-base text-[#F7F4ED]/90 max-w-2xl mx-auto leading-relaxed bg-black/55 backdrop-blur-sm px-6 py-3 rounded-2xl border border-white/10">
            {currentSlide.subtitle}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              to={currentSlide.ctaLink}
              className="px-7 py-3.5 rounded-xl bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] font-bold text-xs uppercase tracking-widest inline-flex items-center gap-2 transition-colors shadow-xl"
            >
              <span>{currentSlide.ctaText}</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/admin"
              className="px-7 py-3.5 rounded-xl bg-black/70 hover:bg-black border border-[#C8A45D]/50 text-[#F7F4ED] font-semibold text-xs uppercase tracking-widest inline-flex items-center gap-2 transition-colors backdrop-blur-md"
            >
              <ShieldCheck className="w-4 h-4 text-[#C8A45D]" />
              <span>Operations Control Console</span>
            </Link>
          </div>

          <div className="pt-4 flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={() => setSlideIdx((prev) => (prev - 1 + HERO_SLIDES.length) % HERO_SLIDES.length)}
              aria-label="Previous Slide"
              className="p-2 rounded-full border border-white/25 bg-black/60 hover:border-[#C8A45D] text-white transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2">
              {HERO_SLIDES.map((s, idx) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => setSlideIdx(idx)}
                  aria-label={`Slide ${idx + 1}`}
                  className={`h-1.5 rounded-full transition-all ${
                    idx === slideIdx ? 'w-8 bg-[#C8A45D]' : 'w-2.5 bg-white/35 hover:bg-white/60'
                  }`}
                />
              ))}
            </div>
            <button
              type="button"
              onClick={() => setSlideIdx((prev) => (prev + 1) % HERO_SLIDES.length)}
              aria-label="Next Slide"
              className="p-2 rounded-full border border-white/25 bg-black/60 hover:border-[#C8A45D] text-white transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Direct Architectural Portal Directory (Multi-Page Separation) */}
      <section className="relative py-20 border-t border-white/10 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/hero_holding.jpg',
            '/images/watch_mechanical_tourbillon_gold_1794595222285.jpg',
            '/images/spa_sanctuary.jpg',
            '/images/car_lamborghini_revuelto_1794595221404.jpg',
          ]}
          overlayClassName="bg-gradient-to-b from-[#090909]/85 via-black/70 to-[#090909]/90"
          showIndicators
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
                Dedicated Enterprise Destinations
              </div>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold text-white mt-1">
                Navigate Each Division Page Directly
              </h2>
            </div>
            <Link
              to="/divisions"
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#C8A45D] hover:underline"
            >
              <span>Open Full Divisions Hub</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {PORTAL_GATEWAYS.map((portal) => {
              const IconComp = portal.icon;
              return (
                <Link
                  key={portal.to}
                  to={portal.to}
                  className="relative rounded-2xl overflow-hidden border border-[#C8A45D]/30 hover:border-[#C8A45D] min-h-[220px] flex flex-col justify-end p-6 group transition-all"
                >
                  <LiveBackdropSlideshow
                    images={portal.slides}
                    intervalMs={3800}
                    overlayClassName="bg-gradient-to-t from-black/95 via-black/55 to-black/25 group-hover:via-black/40 transition-colors"
                  />
                  <div className="relative z-10 space-y-2">
                    <div className="w-9 h-9 rounded-lg bg-black/70 border border-[#C8A45D]/50 flex items-center justify-center text-[#C8A45D]">
                      <IconComp className="w-4 h-4" />
                    </div>
                    <h3 className="font-serif text-xl font-bold text-white group-hover:text-[#C8A45D] transition-colors">
                      {portal.title}
                    </h3>
                    <p className="text-xs text-[#F7F4ED]/80 leading-relaxed">{portal.subtitle}</p>
                    <div className="pt-1 inline-flex items-center gap-1.5 text-[11px] font-bold uppercase tracking-wider text-[#C8A45D]">
                      <span>Open Page</span>
                      <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};
