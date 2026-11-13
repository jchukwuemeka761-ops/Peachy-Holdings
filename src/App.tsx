import React, { useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { AlertCircle, CheckCircle2 } from 'lucide-react';
import { useEnterprise } from './context/EnterpriseContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { CartDrawer } from './components/CartDrawer';
import { BookingModal } from './components/BookingModal';
import { HomePage } from './pages/HomePage';
import { DivisionsPage } from './pages/DivisionsPage';
import { CarsPage } from './pages/CarsPage';
import { WatchesPage } from './pages/WatchesPage';
import { SpaPage } from './pages/SpaPage';
import { GpsMapPage } from './pages/GpsMapPage';
import { LogisticsPage } from './pages/LogisticsPage';
import { DigitalAssetsPage } from './pages/DigitalAssetsPage';
import { ConciergePage } from './pages/ConciergePage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { AccountPage } from './pages/AccountPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { AdminPage } from './pages/AdminPage';

const ScrollToTop: React.FC = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
};

export const App: React.FC = () => {
  const { toast } = useEnterprise();

  return (
    <div className="min-h-screen flex flex-col bg-[#090909] text-[#F7F4ED]">
      <ScrollToTop />
      <Header />

      <main className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/divisions" element={<DivisionsPage />} />
          <Route path="/luxury-cars" element={<CarsPage />} />
          <Route path="/vehicles" element={<CarsPage />} />
          <Route path="/luxury-watches" element={<WatchesPage />} />
          <Route path="/spa-wellness" element={<SpaPage />} />
          <Route path="/gps-map" element={<GpsMapPage />} />
          <Route path="/logistics" element={<LogisticsPage />} />
          <Route path="/digital-assets" element={<DigitalAssetsPage />} />
          <Route path="/lifestyle-concierge" element={<ConciergePage />} />
          <Route path="/about-us" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </main>

      <Footer />
      <CartDrawer />
      <BookingModal />

      {toast && (
        <div className="fixed bottom-5 right-5 z-50 max-w-sm px-4 py-3 rounded-xl bg-[#121212] border border-[#C8A45D]/50 shadow-2xl flex items-center gap-2.5 text-xs text-white">
          {toast.type === 'error' ? (
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          ) : (
            <CheckCircle2 className="w-4 h-4 text-[#C8A45D] shrink-0" />
          )}
          <span>{toast.message}</span>
        </div>
      )}
    </div>
  );
};

export default App;
