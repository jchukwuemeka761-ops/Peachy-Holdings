import React from 'react';
import { Compass, ExternalLink, MapPin, Navigation, Phone } from 'lucide-react';
import { ENTERPRISE_INFO } from '../data/enterpriseData';
import { LiveBackdropSlideshow } from '../components/LiveBackdropSlideshow';

export const GpsMapPage: React.FC = () => {
  return (
    <div className="bg-[#090909] text-[#F7F4ED] min-h-screen">
      {/* Hero with Live Umuahia Mobility & Sanctuary Slideshow */}
      <section className="relative py-24 border-b border-[#C8A45D]/30 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/car_toyota_prado_1794595203870.jpg',
            '/images/spa_sanctuary.jpg',
            '/images/car_lexus_is350_white_1794595222533.jpg',
            '/images/car_bmw_760i_executive_1794595219744.jpg',
          ]}
          intervalMs={3600}
          overlayClassName="bg-gradient-to-r from-black/85 via-black/55 to-black/35"
          showIndicators
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
          <div className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
            GPS Positioning & Private Escort Routing
          </div>
          <h1 className="font-serif text-4xl sm:text-6xl font-bold text-white max-w-3xl">
            Live GPS Navigation & <span className="gold-gradient-text">Sanctuary Map</span>
          </h1>
          <p className="text-sm sm:text-base text-[#F7F4ED]/90 max-w-2xl bg-black/55 backdrop-blur-md p-4 rounded-xl border border-white/10">
            Locate Peachy Spa & Wellness Sanctuary in Umuahia, Abia State and inspect recommended routes from Max Lux Spa (Umuahia Commercial Corridor).
          </p>
        </div>
      </section>

      {/* Interactive Embedded Map & Turn-by-Turn Route Subheading (Live Slideshow Background) */}
      <section className="relative py-16 overflow-hidden">
        <LiveBackdropSlideshow
          images={[
            '/images/car_mercedes_g63_1794595205186.jpg',
            '/images/spa_hydro_cryo_1794595205178.jpg',
            '/images/car_prado_gr_sport_1794595221295.jpg',
          ]}
          intervalMs={4200}
          overlayClassName="bg-gradient-to-b from-[#090909]/85 via-black/70 to-[#090909]/92"
          showIndicators
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5 glass-panel rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="space-y-2">
              <div className="text-xs uppercase tracking-widest text-[#C8A45D] font-bold">
                Verified Sanctuary Coordinates
              </div>
              <h2 className="font-serif text-2xl font-bold text-white">
                53 Awolowo Street by Umuwaya Road
              </h2>
              <p className="text-xs text-[#F7F4ED]/80">
                {ENTERPRISE_INFO.spaLocation.address}, {ENTERPRISE_INFO.spaLocation.city},{' '}
                {ENTERPRISE_INFO.spaLocation.state} {ENTERPRISE_INFO.spaLocation.postalCode},{' '}
                {ENTERPRISE_INFO.spaLocation.country}
              </p>
              <div className="text-[11px] font-mono text-[#DFBF7A]">
                GPS: 5.5249° N, 7.4946° E
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/55 border border-[#C8A45D]/25 space-y-3 text-xs">
              <div className="flex items-center gap-2 font-bold text-[#C8A45D]">
                <Navigation className="w-4 h-4" />
                <span>GPS Route: From Max Lux Spa (Umuahia)</span>
              </div>
              <ol className="space-y-2 text-[#F7F4ED]/80 list-decimal pl-4">
                <li>Depart Max Lux Spa corridor heading toward Isi Gate / Umuwaya Road Junction (approx. 1.2 km).</li>
                <li>Proceed straight onto Umuwaya Road and turn onto Awolowo Street adjacent to Store 5.</li>
                <li>Arrive at <strong>Store 5, 53 Awolowo Street by Umuwaya Road</strong> (~4–6 min drive).</li>
              </ol>
            </div>

            <div className="flex flex-wrap gap-3">
              <a
                href="https://maps.google.com/?q=53+Awolowo+Street+by+Umuwaya+Road+Umuahia+Abia+State+Nigeria"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-3 px-4 rounded-xl bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4" />
                <span>Open in Google Maps</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
              <a
                href={`tel:${ENTERPRISE_INFO.spaLocation.phone}`}
                className="py-3 px-4 rounded-xl border border-[#C8A45D]/40 text-[#DFBF7A] hover:bg-[#C8A45D]/10 font-bold text-xs uppercase tracking-wider inline-flex items-center justify-center gap-2"
              >
                <Phone className="w-4 h-4" />
                <span>Call Escort</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-7 glass-panel rounded-2xl overflow-hidden shadow-2xl">
            <div className="p-4 border-b border-white/10 flex items-center justify-between text-xs">
              <span className="flex items-center gap-2 font-semibold text-white">
                <MapPin className="w-4 h-4 text-[#C8A45D]" />
                Interactive Satellite & Road Grid — Umuahia, Abia State
              </span>
              <span className="text-[#C8A45D] font-mono">Store 5 · 900103</span>
            </div>
            <iframe
              title="Peachy Spa Sanctuary Umuahia Google Map"
              src="https://maps.google.com/maps?q=53%20Awolowo%20Street,%20Umuahia,%20Nigeria&t=&z=15&ie=UTF8&iwloc=&output=embed"
              className="w-full h-[460px] border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
