import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';
import { ENTERPRISE_INFO } from '../data/enterpriseData';
import { useEnterprise } from '../context/EnterpriseContext';

export const Footer: React.FC = () => {
  const { setCartDrawerOpen } = useEnterprise();

  return (
    <footer className="bg-[#070707] border-t border-[#C8A45D]/20 text-[#F7F4ED] pt-14 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 pb-12 border-b border-white/10">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white border border-[#C8A45D] p-1 flex items-center justify-center shrink-0">
                <img src="/images/peachy_logo.svg" alt="Peachy Holdings Logo" className="w-full h-full object-contain" />
              </div>
              <div>
                <h3 className="font-serif text-lg font-bold tracking-widest text-white">PEACHY HOLDINGS</h3>
                <p className="text-[11px] uppercase tracking-[0.2em] text-[#C8A45D]">Excellence Beyond Expectations</p>
              </div>
            </div>

            <p className="text-xs text-[#F7F4ED]/65 max-w-md leading-relaxed">
              One Enterprise. Multiple Possibilities. Exceptional Experiences. Uniting luxury automobiles, exclusive wristwatches, five-star holistic wellness in Umuahia, armored logistics, and digital asset advisory settled transparently in Nigerian Naira (₦).
            </p>

            <div className="space-y-2 text-xs text-[#F7F4ED]/75 pt-1">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                <span>
                  {ENTERPRISE_INFO.spaLocation.address}, {ENTERPRISE_INFO.spaLocation.city},{' '}
                  {ENTERPRISE_INFO.spaLocation.state} {ENTERPRISE_INFO.spaLocation.postalCode},{' '}
                  {ENTERPRISE_INFO.spaLocation.country}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[#C8A45D] shrink-0" />
                <a href={`tel:${ENTERPRISE_INFO.contact.phone}`} className="text-[#C8A45D] font-semibold hover:underline">
                  {ENTERPRISE_INFO.contact.formattedPhone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[#C8A45D] shrink-0" />
                <span>{ENTERPRISE_INFO.contact.email}</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs tracking-widest uppercase text-[#C8A45D] font-bold">Divisions & Pages</h4>
            <ul className="space-y-2 text-xs text-[#F7F4ED]/70">
              <li><Link to="/divisions" className="hover:text-[#C8A45D] transition-colors">All 6 Business Divisions</Link></li>
              <li><Link to="/luxury-cars" className="hover:text-[#C8A45D] transition-colors">Luxury Cars & Competition Fleet</Link></li>
              <li><Link to="/luxury-watches" className="hover:text-[#C8A45D] transition-colors">Luxury Wristwatches Vault</Link></li>
              <li><Link to="/spa-wellness" className="hover:text-[#C8A45D] transition-colors">5-Star Spa & Wellness Sanctuary</Link></li>
              <li><Link to="/logistics" className="hover:text-[#C8A45D] transition-colors">Global Armored Logistics</Link></li>
              <li><Link to="/digital-assets" className="hover:text-[#C8A45D] transition-colors">Digital Assets Advisory</Link></li>
              <li><Link to="/lifestyle-concierge" className="hover:text-[#C8A45D] transition-colors">Lifestyle Concierge</Link></li>
            </ul>
          </div>

          <div className="space-y-3">
            <h4 className="text-xs tracking-widest uppercase text-[#C8A45D] font-bold">Portals & Navigation</h4>
            <ul className="space-y-2 text-xs text-[#F7F4ED]/70">
              <li><Link to="/gps-map" className="hover:text-[#C8A45D] transition-colors">GPS Navigation & Umuahia Map</Link></li>
              <li><Link to="/account" className="hover:text-[#C8A45D] transition-colors">VIP Client Portal & Invoices</Link></li>
              <li>
                <button
                  type="button"
                  onClick={() => setCartDrawerOpen(true)}
                  className="hover:text-[#C8A45D] transition-colors text-left"
                >
                  Open Shopping Bag
                </button>
              </li>
              <li><Link to="/checkout" className="hover:text-[#C8A45D] transition-colors">Naira Escrow Checkout</Link></li>
              <li><Link to="/about-us" className="hover:text-[#C8A45D] transition-colors">About Peachy Holdings</Link></li>
              <li><Link to="/contact" className="hover:text-[#C8A45D] transition-colors">Executive Contact Desk</Link></li>
              <li><Link to="/admin" className="text-[#C8A45D] hover:underline font-semibold">Admin Operations Console</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-[#F7F4ED]/50">
          <div>&copy; {new Date().getFullYear()} PEACHY HOLDINGS. All Rights Reserved.</div>
          <div className="flex items-center gap-3">
            <span>Netlify Static Production Build</span>
            <span>·</span>
            <span>All Valuations in Naira (₦ NGN)</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
