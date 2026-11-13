import React, { useMemo, useState } from 'react';
import { Eye, Heart, Search, ShoppingBag, Star } from 'lucide-react';
import { WATCH_GALLERY_SLIDES } from '../data/enterpriseData';
import { useEnterprise } from '../context/EnterpriseContext';
import { LiveBackdropSlideshow } from '../components/LiveBackdropSlideshow';
import { LuxuryWatch } from '../types/enterprise';

const CATEGORIES = [
  'All',
  'Haute Horlogerie',
  'Mechanical',
  'Chronograph',
  'Sport & Diver',
  'Complications',
  'Tactical & Shock',
];

export const WatchesPage: React.FC = () => {
  const { watches, addToCart, toggleWishlist, wishlist, setModal } = useEnterprise();
  const [search, setSearch] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');

  const brands = useMemo(() => ['All', ...Array.from(new Set(watches.map((w) => w.brand)))], [watches]);

  const filteredWatches = useMemo(() => {
    const q = search.trim().toLowerCase();
    const list = watches.filter((w) => {
      const mBrand = selectedBrand === 'All' || w.brand === selectedBrand;
      const mCat = selectedCategory === 'All' || w.category === selectedCategory;
      const mQuery =
        !q ||
        w.brand.toLowerCase().includes(q) ||
        w.model.toLowerCase().includes(q) ||
        w.referenceNumber.toLowerCase().includes(q) ||
        w.calibre.toLowerCase().includes(q);
      return mBrand && mCat && mQuery;
    });

    if (sortBy === 'price-asc') return [...list].sort((a, b) => a.priceNgn - b.priceNgn);
    if (sortBy === 'price-desc') return [...list].sort((a, b) => b.priceNgn - a.priceNgn);
    return list;
  }, [watches, search, selectedBrand, selectedCategory, sortBy]);

  const swissUltraGroup = filteredWatches.filter((w) =>
    ['Richard Mille', 'Audemars Piguet', 'Patek Philippe', 'Vacheron Constantin', 'Peachy Geneva Atelier'].includes(
      w.brand,
    ),
  );
  const collectorIconsGroup = filteredWatches.filter((w) =>
    ['Rolex', 'Alexander McQueen', 'Omega', 'Casio G-Shock', 'Casio'].includes(w.brand),
  );

  const renderWatchCard = (watch: LuxuryWatch) => {
    const inWishlist = wishlist.includes(watch.id);
    return (
      <article
        key={watch.id}
        className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between shadow-xl group"
      >
        <div>
          <div className="relative h-64 overflow-hidden bg-black">
            <img
              src={watch.image}
              alt={`${watch.brand} ${watch.model}`}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
            <button
              type="button"
              onClick={() => toggleWishlist(watch.id)}
              aria-label="Save to wishlist"
              className="absolute top-3 right-3 p-2 rounded-full bg-black/70 border border-white/15 text-white hover:border-[#C8A45D] transition-colors"
            >
              <Heart className={`w-4 h-4 ${inWishlist ? 'fill-[#C8A45D] text-[#C8A45D]' : ''}`} />
            </button>
            <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[11px]">
              <span className="text-[#DFBF7A] font-semibold uppercase tracking-wider">{watch.category}</span>
              <span className="flex items-center gap-1 text-white font-semibold tabular-nums">
                <Star className="w-3 h-3 fill-[#C8A45D] text-[#C8A45D]" />
                {watch.rating.toFixed(1)}
              </span>
            </div>
          </div>

          <div className="p-5 space-y-3">
            <div>
              <div className="text-[11px] uppercase tracking-widest text-[#C8A45D] font-bold">
                {watch.brand}
              </div>
              <h3 className="font-serif text-lg font-bold text-white leading-snug mt-0.5">{watch.model}</h3>
              <div className="text-[11px] font-mono text-[#F7F4ED]/55 mt-0.5">Ref: {watch.referenceNumber}</div>
            </div>

            <div className="grid grid-cols-2 gap-2 p-2.5 rounded-xl bg-black/50 border border-white/10 text-[11px]">
              <div>
                <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Movement</span>
                <strong className="text-white truncate block">{watch.movementType}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Diameter</span>
                <strong className="text-white tabular-nums">{watch.caseDiameterMm} mm</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Case</span>
                <strong className="text-white truncate block">{watch.caseMaterial}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Reserve</span>
                <strong className="text-white truncate block">{watch.powerReserve}</strong>
              </div>
            </div>
          </div>
        </div>

        <div className="p-5 pt-3 border-t border-white/10 bg-black/40 space-y-3">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Naira Price</span>
              <div className="font-serif text-xl font-bold text-[#C8A45D] tabular-nums">
                ₦{watch.priceNgn.toLocaleString()}
              </div>
            </div>
            <span className="text-[11px] text-emerald-400 font-semibold">{watch.stockCount} In Vault</span>
          </div>

          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setModal({ type: 'watch', watch })}
              className="py-2.5 px-3 rounded-lg border border-white/15 hover:border-[#C8A45D] text-xs font-semibold text-white inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              <Eye className="w-3.5 h-3.5 text-[#C8A45D]" />
              <span>Full Specs</span>
            </button>
            <button
              type="button"
              onClick={() => addToCart(watch)}
              className="py-2.5 px-3 rounded-lg bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-1.5 transition-colors"
            >
              <ShoppingBag className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </article>
    );
  };

  return (
    <div className="bg-[#090909] text-[#F7F4ED] min-h-screen">
      {/* Live Horology Background Hero */}
      <section className="relative py-28 border-b border-[#C8A45D]/30 overflow-hidden">
        <LiveBackdropSlideshow
          images={WATCH_GALLERY_SLIDES}
          intervalMs={3600}
          overlayClassName="bg-gradient-to-r from-black/85 via-black/50 to-black/35"
          showIndicators
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
            Division 02 · Haute Horlogerie & Mechanical Wristwatches
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white max-w-3xl">
            Curated Standalone <span className="gold-gradient-text">Wristwatches</span>
          </h1>
          <p className="text-sm sm:text-base text-[#F7F4ED]/90 max-w-2xl bg-black/55 backdrop-blur-md p-4 rounded-xl border border-white/10">
            21 completely unique timepieces with zero duplication — spanning Richard Mille, Audemars Piguet, Rolex, Alexander McQueen mechanicals, Omega, Casio G-Shock, and Casio, all specified and priced strictly in Naira (₦).
          </p>
        </div>
      </section>

      {/* Filter Toolbar */}
      <section className="bg-[#0d0d0d] border-b border-white/10 py-4 sticky top-18 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-3">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-3">
            <div className="relative w-full lg:w-72">
              <Search className="w-4 h-4 text-[#C8A45D] absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Richard Mille, Rolex, AP, McQueen, G-Shock..."
                className="w-full pl-9 pr-3 py-2 rounded-xl bg-[#181818] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
              />
            </div>

            <div className="w-full lg:w-auto flex flex-wrap items-center gap-2.5 text-xs">
              <select
                value={selectedBrand}
                onChange={(e) => setSelectedBrand(e.target.value)}
                className="px-3 py-2 rounded-lg bg-[#181818] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
              >
                {brands.map((b) => (
                  <option key={b} value={b}>
                    Brand: {b}
                  </option>
                ))}
              </select>

              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="px-3 py-2 rounded-lg bg-[#181818] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
              >
                {CATEGORIES.map((c) => (
                  <option key={c} value={c}>
                    Category: {c}
                  </option>
                ))}
              </select>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'featured' | 'price-asc' | 'price-desc')}
                className="px-3 py-2 rounded-lg bg-[#181818] border border-[#C8A45D]/40 text-xs text-[#C8A45D] font-semibold focus:border-[#C8A45D] focus:outline-none"
              >
                <option value="featured">Sort: Featured Vault</option>
                <option value="price-asc">Price (₦): Low to High</option>
                <option value="price-desc">Price (₦): High to Low</option>
              </select>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
            <div className="flex items-center gap-2 overflow-x-auto">
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3 py-1 rounded-lg text-[11px] whitespace-nowrap transition-colors ${
                    selectedCategory === cat
                      ? 'bg-[#C8A45D] text-[#090909] font-bold'
                      : 'bg-white/5 text-[#F7F4ED]/75 hover:text-white'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
            <span className="text-[11px] text-[#F7F4ED]/60 tabular-nums shrink-0 ml-4">
              {filteredWatches.length} unique pieces
            </span>
          </div>
        </div>
      </section>

      {/* Subheading 1: Richard Mille, Audemars Piguet & Tourbillons (Live Rotating Backdrop) */}
      {swissUltraGroup.length > 0 && (
        <section className="relative py-16 border-b border-white/10 overflow-hidden">
          <LiveBackdropSlideshow
            images={[
              '/images/richard_mille_vault.jpg',
              '/images/watch_ap_royaloak_1794595200951.jpg',
              '/images/watch_ap_offshore_1794595200627.jpg',
              '/images/watch_mechanical_tourbillon_gold_1794595222285.jpg',
            ]}
            intervalMs={3800}
            overlayClassName="bg-gradient-to-b from-[#090909]/80 via-black/60 to-[#090909]/90"
            showIndicators
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="glass-panel rounded-2xl p-6 max-w-2xl">
              <div className="text-xs uppercase tracking-widest text-[#C8A45D] font-bold">
                Grand Complications & Independent Ateliers
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Richard Mille, Audemars Piguet & Flying Tourbillons
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {swissUltraGroup.map(renderWatchCard)}
            </div>
          </div>
        </section>
      )}

      {/* Subheading 2: Rolex, Alexander McQueen Mechanical & G-Shock / Casio (Live Rotating Backdrop) */}
      {collectorIconsGroup.length > 0 && (
        <section className="relative py-16 overflow-hidden">
          <LiveBackdropSlideshow
            images={[
              '/images/watch_rolex_daydate_1794595203107.jpg',
              '/images/watch_rolex_gmt_1794595203675.jpg',
              '/images/watch_amq_skeleton_1794595201604.jpg',
              '/images/gshock_mrg_watch.jpg',
            ]}
            intervalMs={3600}
            overlayClassName="bg-gradient-to-b from-[#090909]/80 via-black/60 to-[#090909]/90"
            showIndicators
          />
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
            <div className="glass-panel rounded-2xl p-6 max-w-2xl">
              <div className="text-xs uppercase tracking-widest text-[#C8A45D] font-bold">
                Heritage Chronometers & Mechanical Icons
              </div>
              <h2 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">
                Rolex, Alexander McQueen, Omega & Casio G-Shock
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {collectorIconsGroup.map(renderWatchCard)}
            </div>
          </div>
        </section>
      )}
    </div>
  );
};
