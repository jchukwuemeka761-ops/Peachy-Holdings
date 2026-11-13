import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Calendar,
  Car,
  CheckCircle2,
  Eye,
  Heart,
  Package,
  Printer,
  ShoppingBag,
  Sparkles,
  Trash2,
  UserCheck,
  Watch,
  X,
} from 'lucide-react';
import { useEnterprise } from '../context/EnterpriseContext';
import { CAR_GALLERY_SLIDES, SPA_GALLERY_SLIDES, WATCH_GALLERY_SLIDES } from '../data/enterpriseData';
import { LiveBackdropSlideshow } from '../components/LiveBackdropSlideshow';
import { Order } from '../types/enterprise';

type AccountTab = 'bookings' | 'spa' | 'orders' | 'shipments' | 'wishlist' | 'profile';

export const AccountPage: React.FC = () => {
  const {
    currentUser,
    watches,
    wishlist,
    toggleWishlist,
    addToCart,
    vehicleBookings,
    updateVehicleBookingStatus,
    spaReservations,
    updateSpaReservationStatus,
    orders,
    shipments,
    showToast,
  } = useEnterprise();

  const [activeTab, setActiveTab] = useState<AccountTab>('bookings');
  const [selectedInvoice, setSelectedInvoice] = useState<Order | null>(null);

  const wishlistedWatches = watches.filter((w) => wishlist.includes(w.id));

  const tabs: { id: AccountTab; label: string; count?: number; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'bookings', label: 'Fleet Bookings', count: vehicleBookings.length, icon: Car },
    { id: 'spa', label: 'Spa Reservations', count: spaReservations.length, icon: Sparkles },
    { id: 'orders', label: 'Watch Invoices', count: orders.length, icon: ShoppingBag },
    { id: 'shipments', label: 'Shipments', count: shipments.length, icon: Package },
    { id: 'wishlist', label: 'Wishlist', count: wishlistedWatches.length, icon: Heart },
    { id: 'profile', label: 'Client Profile', icon: UserCheck },
  ];

  return (
    <div className="bg-[#090909] text-[#F7F4ED] min-h-screen">
      {/* Live Account Portal Hero */}
      <section className="relative py-24 border-b border-[#C8A45D]/30 overflow-hidden">
        <LiveBackdropSlideshow
          images={[...WATCH_GALLERY_SLIDES.slice(0, 2), ...CAR_GALLERY_SLIDES.slice(0, 2)]}
          intervalMs={4000}
          overlayClassName="bg-gradient-to-r from-black/82 via-black/50 to-black/35"
          showIndicators
        />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
              VIP Client Portal · Naira Settlement Ledger
            </div>
            <h1 className="font-serif text-4xl sm:text-5xl font-bold text-white">
              Welcome, <span className="gold-gradient-text">{currentUser.fullName}</span>
            </h1>
            <p className="text-xs sm:text-sm text-[#F7F4ED]/80">
              {currentUser.tier} · {currentUser.email} · Preferred Currency: ₦ NGN
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              to="/luxury-watches"
              className="px-5 py-2.5 rounded-xl bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Browse Watches
            </Link>
            <Link
              to="/luxury-cars"
              className="px-5 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 border border-white/20 text-white text-xs font-bold uppercase tracking-wider transition-colors"
            >
              Reserve Fleet
            </Link>
          </div>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="bg-[#0d0d0d] border-b border-white/10 sticky top-18 z-20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center gap-2 overflow-x-auto">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const active = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                  active
                    ? 'bg-[#C8A45D] text-[#090909]'
                    : 'bg-[#181818] text-[#F7F4ED]/75 hover:text-white border border-white/10'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.label}</span>
                {typeof tab.count === 'number' && (
                  <span
                    className={`px-1.5 py-0.5 rounded-full text-[10px] font-bold tabular-nums ${
                      active ? 'bg-[#090909]/20 text-[#090909]' : 'bg-white/10 text-[#C8A45D]'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* Main Content with Live Slideshow Subheading */}
      <section className="relative py-16 overflow-hidden">
        <LiveBackdropSlideshow
          images={
            activeTab === 'spa'
              ? SPA_GALLERY_SLIDES
              : activeTab === 'bookings' || activeTab === 'shipments'
                ? CAR_GALLERY_SLIDES.slice(0, 4)
                : WATCH_GALLERY_SLIDES.slice(0, 4)
          }
          intervalMs={4200}
          overlayClassName="bg-gradient-to-b from-[#090909]/82 via-black/62 to-[#090909]/92"
          showIndicators
        />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          {activeTab === 'bookings' && (
            <div className="space-y-4">
              <div className="glass-panel rounded-2xl p-5 max-w-xl">
                <h2 className="font-serif text-2xl font-bold text-white">Executive Vehicle Bookings</h2>
                <p className="text-xs text-[#F7F4ED]/70 mt-1">All mobility itineraries quoted and settled in Naira (₦).</p>
              </div>
              {vehicleBookings.length === 0 ? (
                <div className="luxury-card rounded-2xl p-10 text-center space-y-3">
                  <p className="text-sm text-[#F7F4ED]/70">No vehicle reservations recorded yet.</p>
                  <Link to="/luxury-cars" className="inline-block px-5 py-2.5 rounded-lg bg-[#C8A45D] text-[#090909] text-xs font-bold uppercase">
                    Explore Luxury Fleet
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {vehicleBookings.map((bk) => (
                    <div key={bk.id} className="luxury-card rounded-2xl overflow-hidden flex flex-col sm:flex-row">
                      <img src={bk.vehicleImage} alt={bk.vehicleName} className="w-full sm:w-44 h-44 sm:h-auto object-cover bg-black" />
                      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex items-center justify-between text-[11px] font-mono">
                            <span className="text-[#C8A45D] font-bold">{bk.id}</span>
                            <span
                              className={`font-semibold ${
                                bk.status === 'Confirmed'
                                  ? 'text-emerald-400'
                                  : bk.status === 'Cancelled'
                                    ? 'text-red-400'
                                    : 'text-amber-300'
                              }`}
                            >
                              {bk.status}
                            </span>
                          </div>
                          <h3 className="font-serif text-lg font-bold text-white mt-1">{bk.vehicleName}</h3>
                          <p className="text-xs text-[#F7F4ED]/70 mt-1">
                            {bk.pickupLocation} &rarr; {bk.destination}
                          </p>
                          <div className="text-[11px] text-[#F7F4ED]/60 mt-1 flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5 text-[#C8A45D]" />
                            <span>
                              {bk.pickupDate} to {bk.returnDate} ({bk.driveType})
                            </span>
                          </div>
                        </div>
                        <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                          <span className="font-mono text-sm font-bold text-[#C8A45D] tabular-nums">
                            ₦{bk.estimatedTotal.toLocaleString()}
                          </span>
                          {bk.status !== 'Cancelled' && (
                            <button
                              type="button"
                              onClick={() => updateVehicleBookingStatus(bk.id, 'Cancelled')}
                              className="text-[11px] text-red-400 hover:underline"
                            >
                              Cancel Request
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'spa' && (
            <div className="space-y-4">
              <div className="glass-panel rounded-2xl p-5 max-w-xl">
                <h2 className="font-serif text-2xl font-bold text-white">Umuahia Sanctuary Appointments</h2>
                <p className="text-xs text-[#F7F4ED]/70 mt-1">53 Awolowo Street by Umuwaya Road · All tariffs in ₦ NGN.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {spaReservations.map((res) => (
                  <div key={res.id} className="luxury-card rounded-2xl overflow-hidden flex flex-col sm:flex-row">
                    <img src={res.treatmentImage} alt={res.treatmentName} className="w-full sm:w-44 h-44 sm:h-auto object-cover bg-black" />
                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="flex items-center justify-between text-[11px] font-mono">
                          <span className="text-[#C8A45D] font-bold">{res.id}</span>
                          <span className={res.status === 'Cancelled' ? 'text-red-400' : 'text-emerald-400'}>{res.status}</span>
                        </div>
                        <h3 className="font-serif text-lg font-bold text-white mt-1">{res.treatmentName}</h3>
                        <p className="text-xs text-[#F7F4ED]/70 mt-1">
                          {res.date} at {res.timeSlot} · {res.guests} Guest(s)
                        </p>
                        {res.notes && <p className="text-[11px] text-[#F7F4ED]/55 italic mt-1">{res.notes}</p>}
                      </div>
                      <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                        <span className="font-mono text-sm font-bold text-[#C8A45D] tabular-nums">
                          ₦{res.priceNgn.toLocaleString()}
                        </span>
                        {res.status !== 'Cancelled' && (
                          <button
                            type="button"
                            onClick={() => updateSpaReservationStatus(res.id, 'Cancelled')}
                            className="text-[11px] text-red-400 hover:underline"
                          >
                            Cancel Session
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'orders' && (
            <div className="space-y-4">
              <div className="glass-panel rounded-2xl p-5 max-w-xl">
                <h2 className="font-serif text-2xl font-bold text-white">Horology Invoices & Escrow Orders</h2>
                <p className="text-xs text-[#F7F4ED]/70 mt-1">Click View Invoice for official Naira tax & escrow documentation.</p>
              </div>
              <div className="space-y-4">
                {orders.map((ord) => (
                  <div key={ord.id} className="luxury-card rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="space-y-1">
                      <div className="flex items-center gap-3 text-xs font-mono">
                        <span className="text-[#C8A45D] font-bold">{ord.invoiceNumber}</span>
                        <span className="text-emerald-400 flex items-center gap-1">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          {ord.paymentStatus}
                        </span>
                        <span className="text-[#F7F4ED]/50">{ord.createdAt}</span>
                      </div>
                      <div className="text-sm font-semibold text-white">
                        {ord.items.map((it) => `${it.brand} ${it.model} (x${it.quantity})`).join(', ')}
                      </div>
                      <div className="text-xs text-[#F7F4ED]/60">
                        {ord.paymentMethod} · Dispatch to {ord.shippingAddress.city}, {ord.shippingAddress.country}
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="text-right">
                        <div className="text-[10px] uppercase text-[#F7F4ED]/50">Total Settled</div>
                        <div className="font-mono text-lg font-bold text-[#C8A45D] tabular-nums">
                          ₦{ord.totalNgn.toLocaleString()}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => setSelectedInvoice(ord)}
                        className="px-4 py-2.5 rounded-xl bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] text-xs font-bold uppercase tracking-wider flex items-center gap-1.5"
                      >
                        <Eye className="w-4 h-4" />
                        <span>View Invoice</span>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'shipments' && (
            <div className="space-y-4">
              <div className="glass-panel rounded-2xl p-5 max-w-xl">
                <h2 className="font-serif text-2xl font-bold text-white">Active Armored Logistics Waybills</h2>
                <p className="text-xs text-[#F7F4ED]/70 mt-1">All insured cargo declarations denominated in Naira (₦).</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {shipments.map((s) => (
                  <div key={s.trackingNumber} className="luxury-card rounded-2xl p-6 space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-sm font-bold text-[#C8A45D]">{s.trackingNumber}</span>
                      <span className="text-xs text-emerald-400 font-semibold">{s.currentStage}</span>
                    </div>
                    <div className="text-xs text-[#F7F4ED]/80">
                      {s.origin} &rarr; {s.destination}
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-xs pt-2 border-t border-white/10">
                      <div>
                        <span className="text-[#F7F4ED]/50 block">Declared Value</span>
                        <strong className="font-mono text-[#C8A45D]">₦{s.declaredValueNgn.toLocaleString()}</strong>
                      </div>
                      <div>
                        <span className="text-[#F7F4ED]/50 block">ETA</span>
                        <strong className="text-white">{s.estimatedDelivery}</strong>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'wishlist' && (
            <div className="space-y-4">
              <div className="glass-panel rounded-2xl p-5 max-w-xl">
                <h2 className="font-serif text-2xl font-bold text-white">Saved Wristwatch Wishlist</h2>
                <p className="text-xs text-[#F7F4ED]/70 mt-1">Standalone mechanical references saved for immediate Naira checkout.</p>
              </div>
              {wishlistedWatches.length === 0 ? (
                <div className="luxury-card rounded-2xl p-10 text-center space-y-3">
                  <Watch className="w-10 h-10 text-[#C8A45D]/40 mx-auto" />
                  <p className="text-sm text-[#F7F4ED]/70">No wristwatches saved to your wishlist yet.</p>
                  <Link to="/luxury-watches" className="inline-block px-5 py-2.5 rounded-lg bg-[#C8A45D] text-[#090909] text-xs font-bold uppercase">
                    Browse Watch Vault
                  </Link>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {wishlistedWatches.map((w) => (
                    <div key={w.id} className="luxury-card rounded-2xl overflow-hidden flex flex-col justify-between">
                      <div>
                        <img src={w.image} alt={w.model} className="w-full h-48 object-cover bg-black" />
                        <div className="p-5 space-y-2">
                          <div className="text-[11px] uppercase tracking-widest text-[#C8A45D] font-bold">{w.brand}</div>
                          <h3 className="font-serif text-lg font-bold text-white">{w.model}</h3>
                          <div className="text-xs text-[#F7F4ED]/60">Ref: {w.referenceNumber} · {w.calibre}</div>
                        </div>
                      </div>
                      <div className="p-5 pt-3 border-t border-white/10 flex items-center justify-between gap-2">
                        <span className="font-mono text-sm font-bold text-[#C8A45D]">₦{w.priceNgn.toLocaleString()}</span>
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => addToCart(w)}
                            className="px-3 py-2 rounded-lg bg-[#C8A45D] text-[#090909] text-xs font-bold"
                          >
                            Add to Bag
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleWishlist(w.id)}
                            aria-label="Remove from wishlist"
                            className="p-2 rounded-lg border border-white/15 text-red-400 hover:bg-white/5"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="luxury-card rounded-2xl p-6 sm:p-8 max-w-2xl space-y-5">
              <h2 className="font-serif text-2xl font-bold text-white">VIP Member Profile</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-[#F7F4ED]/50 block">Account Holder</span>
                  <strong className="text-white text-sm">{currentUser.fullName}</strong>
                </div>
                <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-[#F7F4ED]/50 block">Membership Tier</span>
                  <strong className="text-[#C8A45D] text-sm">{currentUser.tier}</strong>
                </div>
                <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-[#F7F4ED]/50 block">Primary Email</span>
                  <strong className="text-white text-sm">{currentUser.email}</strong>
                </div>
                <div className="p-4 rounded-xl bg-black/50 border border-white/10">
                  <span className="text-[#F7F4ED]/50 block">Direct Telephone</span>
                  <strong className="text-white text-sm">{currentUser.phone}</strong>
                </div>
                <div className="p-4 rounded-xl bg-black/50 border border-white/10 sm:col-span-2">
                  <span className="text-[#F7F4ED]/50 block">Settlement Currency</span>
                  <strong className="text-[#C8A45D] text-sm">Nigerian Naira (₦ NGN — Strictly Enforced Platform-Wide)</strong>
                </div>
              </div>
              <button
                type="button"
                onClick={() => showToast('VIP account profile verified in Nigerian Naira (₦).')}
                className="px-5 py-2.5 rounded-xl bg-[#C8A45D] text-[#090909] text-xs font-bold uppercase tracking-wider"
              >
                Verify VIP Dossier
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Invoice Modal */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-black/85 backdrop-blur-sm" onClick={() => setSelectedInvoice(null)} />
          <div className="relative z-10 max-w-xl w-full bg-[#121212] border border-[#C8A45D]/40 rounded-2xl p-6 sm:p-8 space-y-5 shadow-2xl">
            <div className="flex items-start justify-between border-b border-white/10 pb-4">
              <div>
                <div className="text-[11px] uppercase tracking-widest text-[#C8A45D] font-bold">Peachy Holdings Official Invoice</div>
                <h3 className="font-serif text-2xl font-bold text-white">{selectedInvoice.invoiceNumber}</h3>
                <div className="text-xs text-[#F7F4ED]/60">Issued {selectedInvoice.createdAt} · {selectedInvoice.paymentStatus}</div>
              </div>
              <button
                type="button"
                onClick={() => setSelectedInvoice(null)}
                aria-label="Close invoice"
                className="p-1.5 rounded-lg hover:bg-white/10 text-[#F7F4ED]/70"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-[#F7F4ED]/75">
                <span>Billed To</span>
                <strong className="text-white">{selectedInvoice.customerName}</strong>
              </div>
              <div className="flex justify-between text-[#F7F4ED]/75">
                <span>Delivery Address</span>
                <span className="text-white text-right">
                  {selectedInvoice.shippingAddress.street}, {selectedInvoice.shippingAddress.city}
                </span>
              </div>
              <div className="flex justify-between text-[#F7F4ED]/75">
                <span>Method</span>
                <span className="text-white">{selectedInvoice.paymentMethod}</span>
              </div>
            </div>

            <div className="rounded-xl bg-black/50 border border-white/10 p-4 space-y-2 text-xs">
              {selectedInvoice.items.map((item) => (
                <div key={item.watchId} className="flex items-center justify-between">
                  <div>
                    <div className="font-semibold text-white">{item.brand} {item.model}</div>
                    <div className="text-[11px] text-[#F7F4ED]/55">Ref: {item.referenceNumber} · Qty {item.quantity}</div>
                  </div>
                  <div className="font-mono text-[#C8A45D] font-bold">
                    ₦{(item.unitPriceNgn * item.quantity).toLocaleString()}
                  </div>
                </div>
              ))}
              <div className="pt-2 border-t border-white/10 flex justify-between text-sm font-bold">
                <span>Total (NGN)</span>
                <span className="font-mono text-[#C8A45D]">₦{selectedInvoice.totalNgn.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg bg-[#C8A45D] text-[#090909] text-xs font-bold flex items-center gap-1.5"
              >
                <Printer className="w-4 h-4" />
                <span>Print Receipt</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
