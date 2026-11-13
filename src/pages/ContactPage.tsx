import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, Mail, MapPin, Navigation, Phone, Send } from 'lucide-react';
import { ENTERPRISE_INFO } from '../data/enterpriseData';
import { useEnterprise } from '../context/EnterpriseContext';
import { LiveBackdropSlideshow } from '../components/LiveBackdropSlideshow';

export const ContactPage: React.FC = () => {
  const { addInquiry } = useEnterprise();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [division, setDivision] = useState('Luxury Cars & Mobility');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addInquiry({ name, email, phone, division, message });
    setSubmitted(true);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <div className="bg-[#090909] text-[#F7F4ED] min-h-screen">
      <section className="relative py-24 border-b border-[#C8A45D]/30 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/spa_sanctuary.jpg',
            '/images/car_bmw_760i_executive_1794595219744.jpg',
            '/images/watch_rolex_daydate_1794595203107.jpg',
            '/images/car_toyota_prado_1794595203870.jpg',
          ]}
          intervalMs={3600}
          overlayClassName="bg-gradient-to-r from-black/85 via-black/55 to-black/35"
          showIndicators
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
            Executive Desk · Peachy Holdings
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white max-w-3xl">
            Private Client <span className="gold-gradient-text">Contact & Concierge</span>
          </h1>
          <p className="text-sm sm:text-base text-[#F7F4ED]/90 max-w-2xl bg-black/55 backdrop-blur-md p-4 rounded-xl border border-white/10">
            Reach our Umuahia Wellness Sanctuary desk, Horology Acquisition officers, or Armored Mobility dispatch team directly.
          </p>
        </div>
      </section>

      <section className="relative py-16 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/spa_facial_suite_1794595223155.jpg',
            '/images/car_lexus_is350_white_1794595222533.jpg',
            '/images/watch_ap_royaloak_1794595200951.jpg',
          ]}
          intervalMs={4200}
          overlayClassName="bg-gradient-to-b from-[#090909]/85 via-black/70 to-[#090909]/92"
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <div className="glass-panel rounded-2xl p-6 space-y-4 text-xs">
              <h2 className="font-serif text-2xl font-bold text-white">Direct Liaison Channels</h2>
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-white block">Umuahia Sanctuary Headquarters</strong>
                  <span className="text-[#F7F4ED]/75">
                    {ENTERPRISE_INFO.spaLocation.address}, {ENTERPRISE_INFO.spaLocation.city},{' '}
                    {ENTERPRISE_INFO.spaLocation.state} {ENTERPRISE_INFO.spaLocation.postalCode}, Nigeria
                  </span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-[#C8A45D] shrink-0" />
                <a href={`tel:${ENTERPRISE_INFO.contact.phone}`} className="font-bold text-[#DFBF7A] hover:underline">
                  {ENTERPRISE_INFO.contact.formattedPhone}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-[#C8A45D] shrink-0" />
                <span>{ENTERPRISE_INFO.contact.email}</span>
              </div>

              <div className="pt-3 border-t border-white/10">
                <Link
                  to="/gps-map"
                  className="inline-flex items-center gap-2 text-[#C8A45D] font-bold hover:underline"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Full Interactive GPS & Max Lux Spa Directions Page</span>
                </Link>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 glass-panel rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="font-serif text-2xl font-bold text-white">Send Executive Inquiry</h2>
            {submitted ? (
              <div className="p-6 rounded-xl bg-emerald-950/60 border border-emerald-500/30 space-y-2 text-xs text-emerald-300">
                <div className="flex items-center gap-2 font-bold text-sm">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Inquiry Received by Peachy Holdings Desk</span>
                </div>
                <p>A dedicated specialist will contact you shortly via phone or email.</p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="text-[#C8A45D] underline pt-1"
                >
                  Send another inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 text-xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Full Name *"
                    className="px-3 py-2.5 rounded-lg bg-[#181818] border border-white/15 text-white focus:border-[#C8A45D] focus:outline-none"
                  />
                  <input
                    required
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email Address *"
                    className="px-3 py-2.5 rounded-lg bg-[#181818] border border-white/15 text-white focus:border-[#C8A45D] focus:outline-none"
                  />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <input
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Phone (+234...) *"
                    className="px-3 py-2.5 rounded-lg bg-[#181818] border border-white/15 text-white focus:border-[#C8A45D] focus:outline-none"
                  />
                  <select
                    value={division}
                    onChange={(e) => setDivision(e.target.value)}
                    className="px-3 py-2.5 rounded-lg bg-[#181818] border border-white/15 text-white focus:border-[#C8A45D] focus:outline-none"
                  >
                    <option value="Luxury Cars & Mobility">Luxury Cars & Mobility</option>
                    <option value="Haute Horlogerie Watches">Luxury Wristwatches Vault</option>
                    <option value="Spa Sanctuary & Equipment">Umuahia Spa & Equipment</option>
                    <option value="Armored Logistics">Armored Freight & Tracking</option>
                  </select>
                </div>
                <textarea
                  required
                  rows={4}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Describe your vehicle, wristwatch, spa, or logistics request..."
                  className="w-full px-3 py-2.5 rounded-lg bg-[#181818] border border-white/15 text-white focus:border-[#C8A45D] focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] font-bold uppercase tracking-wider inline-flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>Transmit Inquiry</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};
