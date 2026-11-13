import React, { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Heart, Menu, ShieldCheck, ShoppingBag, User, X } from 'lucide-react';
import { useEnterprise } from '../context/EnterpriseContext';

const NAV_LINKS = [
  { to: '/', label: 'Home', end: true },
  { to: '/divisions', label: 'Divisions' },
  { to: '/luxury-cars', label: 'Cars' },
  { to: '/luxury-watches', label: 'Watches' },
  { to: '/spa-wellness', label: 'Spa' },
  { to: '/gps-map', label: 'GPS & Maps' },
  { to: '/about-us', label: 'About' },
  { to: '/contact', label: 'Contact' },
];

export const Header: React.FC = () => {
  const { cartCount, wishlist, setCartDrawerOpen, isAdmin } = useEnterprise();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full bg-[#090909]/95 backdrop-blur-md border-b border-[#C8A45D]/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* Zone 1: Brand Identity */}
        <Link
          to="/"
          onClick={() => setMobileOpen(false)}
          className="flex items-center gap-3 shrink-0 group"
        >
          <div className="w-10 h-10 rounded-full bg-white border border-[#C8A45D] p-1 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
            <img
              src="/images/peachy_logo.svg"
              alt="Peachy Holdings Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <span className="font-serif text-base sm:text-lg font-bold tracking-[0.14em] text-[#F7F4ED] whitespace-nowrap">
            PEACHY HOLDINGS
          </span>
        </Link>

        {/* Zone 2: Clean Single-Line Navigation */}
        <nav className="hidden lg:flex items-center gap-5 text-[13px] font-medium">
          {NAV_LINKS.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.end}
              className={({ isActive }) =>
                `whitespace-nowrap shrink-0 py-1 transition-colors border-b ${
                  isActive
                    ? 'text-[#C8A45D] border-[#C8A45D]'
                    : 'text-[#F7F4ED]/80 border-transparent hover:text-[#C8A45D]'
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Zone 3: Actions */}
        <div className="flex items-center gap-2.5 shrink-0">
          <Link
            to="/admin"
            className={`hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors whitespace-nowrap shrink-0 ${
              isAdmin
                ? 'bg-[#C8A45D]/15 border-[#C8A45D] text-[#DFBF7A]'
                : 'border-white/15 text-[#F7F4ED]/80 hover:border-[#C8A45D]/50 hover:text-[#C8A45D]'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5 text-[#C8A45D]" />
            <span>Admin</span>
          </Link>

          <Link
            to="/account"
            aria-label="Account & Wishlist"
            className="hidden sm:inline-flex items-center justify-center w-9 h-9 rounded-lg border border-white/10 text-[#F7F4ED]/80 hover:border-[#C8A45D]/50 hover:text-[#C8A45D] transition-colors relative shrink-0"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-[#C8A45D] text-[#090909] text-[10px] font-bold flex items-center justify-center tabular-nums">
                {wishlist.length}
              </span>
            )}
          </Link>

          <button
            type="button"
            onClick={() => setCartDrawerOpen(true)}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#181818] border border-[#C8A45D]/40 hover:border-[#C8A45D] text-xs font-semibold text-[#F7F4ED] transition-colors whitespace-nowrap shrink-0"
          >
            <ShoppingBag className="w-4 h-4 text-[#C8A45D]" />
            <span className="hidden md:inline">Cart</span>
            <span className="min-w-4 h-4 px-1 rounded-full bg-[#C8A45D] text-[#090909] text-[10px] font-bold flex items-center justify-center tabular-nums">
              {cartCount}
            </span>
          </button>

          <Link
            to="/account"
            className="hidden xl:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-white/10 text-xs text-[#F7F4ED]/85 hover:border-[#C8A45D]/50 hover:text-[#C8A45D] transition-colors whitespace-nowrap shrink-0"
          >
            <User className="w-3.5 h-3.5 text-[#C8A45D]" />
            <span>Account</span>
          </Link>

          <button
            type="button"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label="Toggle Menu"
            className="lg:hidden p-2 rounded-lg text-[#F7F4ED] hover:bg-white/5 transition-colors"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-[#0c0c0c] border-t border-white/10 px-4 py-4 space-y-3">
          <div className="grid grid-cols-2 gap-2">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                onClick={() => setMobileOpen(false)}
                className="px-3 py-2.5 rounded-lg bg-white/5 hover:bg-[#C8A45D]/15 text-xs font-medium text-[#F7F4ED]"
              >
                {item.label}
              </Link>
            ))}
            <Link
              to="/logistics"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-lg bg-white/5 text-xs font-medium text-[#F7F4ED]"
            >
              Logistics
            </Link>
            <Link
              to="/digital-assets"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-lg bg-white/5 text-xs font-medium text-[#F7F4ED]"
            >
              Digital Assets
            </Link>
            <Link
              to="/account"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-lg bg-white/5 text-xs font-medium text-[#F7F4ED]"
            >
              Client Account
            </Link>
            <Link
              to="/admin"
              onClick={() => setMobileOpen(false)}
              className="px-3 py-2.5 rounded-lg bg-[#C8A45D]/15 border border-[#C8A45D]/40 text-xs font-semibold text-[#C8A45D]"
            >
              Admin Console
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
