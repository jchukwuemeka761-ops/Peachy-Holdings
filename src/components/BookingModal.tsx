import React, { useEffect, useState } from 'react';
import { Calendar, CheckCircle2, Heart, ShieldCheck, ShoppingBag, X } from 'lucide-react';
import { useEnterprise } from '../context/EnterpriseContext';

export const BookingModal: React.FC = () => {
  const {
    modal,
    setModal,
    currentUser,
    addVehicleBooking,
    addSpaReservation,
    addToCart,
    wishlist,
    toggleWishlist,
  } = useEnterprise();

  const [customerName, setCustomerName] = useState(currentUser.fullName);
  const [customerPhone, setCustomerPhone] = useState(currentUser.phone);
  const [pickupLocation, setPickupLocation] = useState('Abuja VIP Aviation Ramp');
  const [destination, setDestination] = useState('Umuahia Sanctuary Estate, Abia State');
  const [pickupDate, setPickupDate] = useState('2026-11-20');
  const [returnDate, setReturnDate] = useState('2026-11-23');
  const [driveType, setDriveType] = useState<'chauffeur' | 'self-drive'>('chauffeur');

  const [spaDate, setSpaDate] = useState('2026-11-20');
  const [spaTime, setSpaTime] = useState('14:00');
  const [spaGuests, setSpaGuests] = useState(1);
  const [spaNotes, setSpaNotes] = useState('');

  useEffect(() => {
    setCustomerName(currentUser.fullName);
    setCustomerPhone(currentUser.phone);
  }, [currentUser.fullName, currentUser.phone, modal]);

  if (!modal) return null;

  if (modal.type === 'car') {
    const v = modal.vehicle;
    const d1 = new Date(pickupDate);
    const d2 = new Date(returnDate);
    const diffDays = Math.max(1, Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24)));
    const estTotal = diffDays * v.dailyPrice;

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      addVehicleBooking({
        vehicleId: v.id,
        vehicleName: v.name,
        vehicleImage: v.image,
        customerName,
        customerPhone,
        pickupLocation,
        destination,
        pickupDate,
        returnDate,
        driveType,
        estimatedTotal: estTotal,
      });
      setModal(null);
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setModal(null)} />
        <div className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#141414] border border-[#C8A45D]/40 shadow-2xl p-6 sm:p-8 text-[#F7F4ED] space-y-6">
          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-4">
              <img src={v.image} alt={v.name} className="w-20 h-14 rounded-lg object-cover border border-white/10" />
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#C8A45D] font-bold">{v.manufacturer}</div>
                <h3 className="font-serif text-xl font-bold text-white">{v.name}</h3>
                <div className="text-xs text-[#C8A45D] font-mono tabular-nums">₦{v.dailyPrice.toLocaleString()} / day</div>
              </div>
            </div>
            <button type="button" onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F7F4ED]/70 mb-1">Client Full Name</label>
                <input
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F7F4ED]/70 mb-1">Direct Phone</label>
                <input
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F7F4ED]/70 mb-1">Pickup Point</label>
                <input
                  required
                  value={pickupLocation}
                  onChange={(e) => setPickupLocation(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F7F4ED]/70 mb-1">Destination Corridor</label>
                <input
                  required
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F7F4ED]/70 mb-1">Pickup Date</label>
                <input
                  type="date"
                  required
                  value={pickupDate}
                  onChange={(e) => setPickupDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F7F4ED]/70 mb-1">Return Date</label>
                <input
                  type="date"
                  required
                  value={returnDate}
                  onChange={(e) => setReturnDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F7F4ED]/70 mb-1">Protocol</label>
                <select
                  value={driveType}
                  onChange={(e) => setDriveType(e.target.value as 'chauffeur' | 'self-drive')}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                >
                  <option value="chauffeur">Protocol Chauffeur</option>
                  <option value="self-drive">Direct Self-Drive</option>
                </select>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-black/50 border border-[#C8A45D]/30 flex items-center justify-between">
              <div className="text-xs text-[#F7F4ED]/70">
                Estimated Reservation ({diffDays} day{diffDays > 1 ? 's' : ''})
              </div>
              <div className="font-serif text-2xl font-bold text-[#C8A45D] tabular-nums">
                ₦{estTotal.toLocaleString()}
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button type="button" onClick={() => setModal(null)} className="px-5 py-2.5 rounded-lg border border-white/15 text-xs">
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] font-bold text-xs uppercase tracking-wider inline-flex items-center gap-2"
              >
                <Calendar className="w-4 h-4" />
                <span>Confirm Vehicle Booking</span>
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  if (modal.type === 'spa') {
    const tr = modal.treatment;
    const totalFee = tr.priceNgn * spaGuests;

    const handleSpaSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      addSpaReservation({
        treatmentId: tr.id,
        treatmentName: tr.name,
        treatmentImage: tr.image,
        customerName,
        customerPhone,
        date: spaDate,
        timeSlot: spaTime,
        guests: spaGuests,
        priceNgn: totalFee,
        notes: spaNotes,
      });
      setModal(null);
    };

    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setModal(null)} />
        <div className="relative z-10 w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#141414] border border-[#C8A45D]/40 shadow-2xl p-6 sm:p-8 text-[#F7F4ED] space-y-6">
          <div className="flex items-start justify-between border-b border-white/10 pb-4">
            <div className="flex items-center gap-4">
              <img src={tr.image} alt={tr.name} className="w-20 h-16 rounded-lg object-cover border border-white/10" />
              <div>
                <div className="text-[11px] uppercase tracking-wider text-[#C8A45D] font-bold">
                  Umuahia Sanctuary · {tr.durationMinutes} Min
                </div>
                <h3 className="font-serif text-xl font-bold text-white">{tr.name}</h3>
                <div className="text-xs text-[#C8A45D] font-mono tabular-nums">₦{tr.priceNgn.toLocaleString()} per guest</div>
              </div>
            </div>
            <button type="button" onClick={() => setModal(null)} className="p-1.5 rounded-lg hover:bg-white/10">
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSpaSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F7F4ED]/70 mb-1">Guest Name</label>
                <input
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F7F4ED]/70 mb-1">Contact Phone</label>
                <input
                  required
                  value={customerPhone}
                  onChange={(e) => setCustomerPhone(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F7F4ED]/70 mb-1">Appointment Date</label>
                <input
                  type="date"
                  required
                  value={spaDate}
                  onChange={(e) => setSpaDate(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F7F4ED]/70 mb-1">Time Slot</label>
                <select
                  value={spaTime}
                  onChange={(e) => setSpaTime(e.target.value)}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                >
                  <option value="09:00">09:00 AM</option>
                  <option value="11:30">11:30 AM</option>
                  <option value="14:00">02:00 PM</option>
                  <option value="16:30">04:30 PM</option>
                  <option value="19:00">07:00 PM (VIP Evening)</option>
                </select>
              </div>
              <div>
                <label className="block text-[11px] uppercase tracking-wider text-[#F7F4ED]/70 mb-1">Guests</label>
                <input
                  type="number"
                  min={1}
                  max={6}
                  value={spaGuests}
                  onChange={(e) => setSpaGuests(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-3 py-2.5 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] uppercase tracking-wider text-[#F7F4ED]/70 mb-1">Preferences / Aroma Notes</label>
              <textarea
                rows={2}
                value={spaNotes}
                onChange={(e) => setSpaNotes(e.target.value)}
                placeholder="Optional oil preference or pressure level..."
                className="w-full px-3 py-2 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A45D] focus:outline-none"
              />
            </div>

            <div className="p-4 rounded-xl bg-black/50 border border-[#C8A45D]/30 flex items-center justify-between">
              <div className="text-xs text-[#F7F4ED]/70">Total Sanctuary Fee</div>
              <div className="font-serif text-2xl font-bold text-[#C8A45D] tabular-nums">
                ₦{totalFee.toLocaleString()}
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button type="button" onClick={() => setModal(null)} className="px-5 py-2.5 rounded-lg border border-white/15 text-xs">
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-lg bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] font-bold text-xs uppercase tracking-wider"
              >
                Confirm Spa Reservation
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Watch Specification & Acquisition Modal
  const w = modal.watch;
  const saved = wishlist.includes(w.id);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-black/85 backdrop-blur-md" onClick={() => setModal(null)} />
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#141414] border border-[#C8A45D]/40 shadow-2xl p-6 sm:p-8 text-[#F7F4ED]">
        <button
          type="button"
          onClick={() => setModal(null)}
          aria-label="Close details"
          className="absolute top-4 right-4 p-2 rounded-lg hover:bg-white/10 text-white"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="space-y-4">
            <div className="rounded-xl overflow-hidden border border-[#C8A45D]/25 bg-black">
              <img src={w.image} alt={`${w.brand} ${w.model}`} className="w-full h-80 object-cover" />
            </div>
            <div className="flex items-center justify-between text-xs text-[#F7F4ED]/70 px-1">
              <span>Ref: <strong className="text-white font-mono">{w.referenceNumber}</strong></span>
              <span>Year: <strong className="text-white">{w.year}</strong></span>
              <span>Stock: <strong className="text-emerald-400">{w.stockCount} Available</strong></span>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="text-xs uppercase tracking-widest text-[#C8A45D] font-bold">
                {w.brand} · {w.category}
              </div>
              <h3 className="font-serif text-2xl sm:text-3xl font-bold text-white mt-1">{w.model}</h3>
              <div className="font-serif text-2xl sm:text-3xl font-bold text-[#C8A45D] tabular-nums mt-2">
                ₦{w.priceNgn.toLocaleString()}
              </div>
            </div>

            <p className="text-xs text-[#F7F4ED]/80 leading-relaxed">{w.description}</p>

            {/* Full Mechanical Specifications Table */}
            <div className="p-4 rounded-xl bg-black/50 border border-white/10 grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Calibre</span>
                <strong className="text-white">{w.calibre}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Movement</span>
                <strong className="text-white">{w.movementType}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Case Material</span>
                <strong className="text-white">{w.caseMaterial}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Diameter</span>
                <strong className="text-white tabular-nums">{w.caseDiameterMm} mm</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Power Reserve</span>
                <strong className="text-white">{w.powerReserve}</strong>
              </div>
              <div>
                <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Water Resistance</span>
                <strong className="text-white">{w.waterResistance}</strong>
              </div>
              <div className="col-span-2">
                <span className="text-[10px] uppercase text-[#F7F4ED]/45 block">Strap / Bracelet</span>
                <strong className="text-white">{w.braceletStrap}</strong>
              </div>
            </div>

            <ul className="space-y-1.5 text-xs text-[#F7F4ED]/80">
              {w.specifications.map((spec) => (
                <li key={spec} className="flex items-center gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#C8A45D] shrink-0" />
                  <span>{spec}</span>
                </li>
              ))}
            </ul>

            <div className="flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{w.condition} · {w.warranty}</span>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => {
                  addToCart(w);
                  setModal(null);
                }}
                className="flex-1 py-3 rounded-xl bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add to Cart · ₦{w.priceNgn.toLocaleString()}</span>
              </button>
              <button
                type="button"
                onClick={() => toggleWishlist(w.id)}
                aria-label="Toggle wishlist"
                className={`p-3 rounded-xl border transition-colors ${
                  saved ? 'border-[#C8A45D] text-[#C8A45D] bg-[#C8A45D]/15' : 'border-white/15 text-white/70 hover:text-white'
                }`}
              >
                <Heart className={`w-4 h-4 ${saved ? 'fill-[#C8A45D]' : ''}`} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
