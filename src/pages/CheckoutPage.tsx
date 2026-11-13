import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Lock, ShieldCheck, Truck } from 'lucide-react';
import { useEnterprise } from '../context/EnterpriseContext';
import { WATCH_GALLERY_SLIDES } from '../data/enterpriseData';
import { LiveBackdropSlideshow } from '../components/LiveBackdropSlideshow';
import { Order } from '../types/enterprise';

export const CheckoutPage: React.FC = () => {
  const { cart, cartSubtotal, cartDiscount, cartTotal, currentUser, placeWatchOrder } = useEnterprise();

  const [fullName, setFullName] = useState(currentUser.fullName);
  const [street, setStreet] = useState('14 Maitama Diplomatic Crescent');
  const [city, setCity] = useState('Abuja');
  const [country, setCountry] = useState('Nigeria');
  const [phone, setPhone] = useState(currentUser.phone);
  const [paymentMethod, setPaymentMethod] = useState('Naira Corporate Escrow Wire');
  const [confirmedOrder, setConfirmedOrder] = useState<Order | null>(null);

  const handleCheckout = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    const order = placeWatchOrder({ fullName, street, city, country, phone }, paymentMethod);
    setConfirmedOrder(order);
  };

  return (
    <div className="bg-[#090909] text-[#F7F4ED] min-h-screen relative overflow-hidden">
      <LiveBackdropSlideshow
        images={WATCH_GALLERY_SLIDES}
        intervalMs={4200}
        overlayClassName="bg-gradient-to-b from-[#090909]/80 via-black/68 to-[#090909]/92"
        showIndicators
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-10">
        <div className="space-y-2">
          <Link
            to="/luxury-watches"
            className="inline-flex items-center gap-1.5 text-xs text-[#C8A45D] hover:underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to Watch Vault</span>
          </Link>
          <h1 className="font-serif text-4xl font-bold text-white">
            Armored <span className="gold-gradient-text">Naira Checkout</span>
          </h1>
          <p className="text-xs sm:text-sm text-[#F7F4ED]/75">
            Secured Nigerian Naira (₦) escrow settlement with biometric courier handover.
          </p>
        </div>

        {confirmedOrder ? (
          <div className="luxury-card rounded-2xl p-8 max-w-2xl space-y-6">
            <div className="flex items-center gap-3 text-emerald-400">
              <CheckCircle2 className="w-8 h-8 shrink-0" />
              <div>
                <h2 className="font-serif text-2xl font-bold text-white">Acquisition Settled in Naira</h2>
                <p className="text-xs text-[#F7F4ED]/70">Invoice {confirmedOrder.invoiceNumber}</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/55 border border-white/10 space-y-2 text-xs">
              {confirmedOrder.items.map((item) => (
                <div key={item.watchId} className="flex justify-between">
                  <span className="text-white">
                    {item.brand} {item.model} &times; {item.quantity}
                  </span>
                  <span className="font-mono text-[#C8A45D]">
                    ₦{(item.unitPriceNgn * item.quantity).toLocaleString()}
                  </span>
                </div>
              ))}
              <div className="pt-2 border-t border-white/10 flex justify-between font-bold text-sm">
                <span>Total Paid (NGN)</span>
                <span className="font-mono text-[#C8A45D]">₦{confirmedOrder.totalNgn.toLocaleString()}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <Link
                to="/account"
                className="px-6 py-3 rounded-xl bg-[#C8A45D] text-[#090909] text-xs font-bold uppercase tracking-wider"
              >
                View Invoice in Client Portal
              </Link>
              <Link
                to="/luxury-watches"
                className="px-6 py-3 rounded-xl border border-white/20 text-white text-xs font-bold uppercase tracking-wider"
              >
                Continue Browsing
              </Link>
            </div>
          </div>
        ) : cart.length === 0 ? (
          <div className="luxury-card rounded-2xl p-10 text-center max-w-lg space-y-4">
            <h2 className="font-serif text-2xl font-bold text-white">Your Shopping Bag is Empty</h2>
            <p className="text-xs text-[#F7F4ED]/70">
              Select a standalone mechanical wristwatch from the Peachy Holdings vault before initiating Naira checkout.
            </p>
            <Link
              to="/luxury-watches"
              className="inline-block px-6 py-3 rounded-xl bg-[#C8A45D] text-[#090909] text-xs font-bold uppercase tracking-wider"
            >
              Browse Wristwatches
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <form onSubmit={handleCheckout} className="lg:col-span-7 luxury-card rounded-2xl p-6 sm:p-8 space-y-5">
              <h2 className="font-serif text-2xl font-bold text-white">Armored Dispatch & Settlement</h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase text-[#C8A45D] font-bold block mb-1">Recipient Full Name</label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase text-[#C8A45D] font-bold block mb-1">Security Contact Phone</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase text-[#C8A45D] font-bold block mb-1">Street / Diplomatic Residence</label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] uppercase text-[#C8A45D] font-bold block mb-1">City</label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase text-[#C8A45D] font-bold block mb-1">Country</label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-[#181818] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] uppercase text-[#C8A45D] font-bold block mb-2">Naira Settlement Method</label>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    'Naira Corporate Escrow Wire',
                    'Private Bank NIP Transfer (₦)',
                    'Umuahia Sanctuary Vault Pickup',
                  ].map((method) => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setPaymentMethod(method)}
                      className={`p-3 rounded-xl border text-left text-xs transition-colors ${
                        paymentMethod === method
                          ? 'bg-[#C8A45D]/15 border-[#C8A45D] text-[#DFBF7A] font-semibold'
                          : 'bg-black/40 border-white/10 text-[#F7F4ED]/70'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span>Confirm & Settle ₦{cartTotal.toLocaleString()}</span>
              </button>
            </form>

            <aside className="lg:col-span-5 luxury-card rounded-2xl p-6 sm:p-8 space-y-5 h-fit">
              <h3 className="font-serif text-xl font-bold text-white">Order Summary</h3>
              <div className="space-y-3">
                {cart.map((item) => (
                  <div key={item.watch.id} className="flex items-center gap-3 p-3 rounded-xl bg-black/50 border border-white/10">
                    <img src={item.watch.image} alt={item.watch.model} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="text-[10px] text-[#C8A45D] uppercase font-bold">{item.watch.brand}</div>
                      <div className="text-xs font-semibold text-white truncate">{item.watch.model}</div>
                      <div className="text-[11px] text-[#F7F4ED]/55">Qty: {item.quantity}</div>
                    </div>
                    <div className="font-mono text-xs text-[#C8A45D] font-bold tabular-nums">
                      ₦{(item.unitPrice * item.quantity).toLocaleString()}
                    </div>
                  </div>
                ))}
              </div>

              <div className="space-y-2 text-xs pt-4 border-t border-white/10">
                <div className="flex justify-between text-[#F7F4ED]/75">
                  <span>Subtotal</span>
                  <span className="font-mono">₦{cartSubtotal.toLocaleString()}</span>
                </div>
                {cartDiscount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Privilege Discount</span>
                    <span className="font-mono">-₦{cartDiscount.toLocaleString()}</span>
                  </div>
                )}
                <div className="flex justify-between text-[#F7F4ED]/75">
                  <span className="flex items-center gap-1">
                    <Truck className="w-3.5 h-3.5 text-[#C8A45D]" /> Armored Dispatch
                  </span>
                  <span className="text-[#C8A45D]">Complimentary</span>
                </div>
                <div className="pt-2 border-t border-white/10 flex justify-between text-base font-bold">
                  <span>Total (NGN)</span>
                  <span className="font-mono text-[#C8A45D]">₦{cartTotal.toLocaleString()}</span>
                </div>
              </div>

              <div className="flex items-start gap-2 text-[11px] text-[#F7F4ED]/65 p-3 rounded-xl bg-black/40 border border-white/5">
                <ShieldCheck className="w-4 h-4 text-[#C8A45D] shrink-0 mt-0.5" />
                <span>Every Peachy Holdings watch ships with box, papers, and verified Swiss provenance certificate.</span>
              </div>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
};
