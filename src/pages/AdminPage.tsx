import React, { useState } from 'react';
import {
  Activity,
  Car,
  CheckCircle2,
  KeyRound,
  Lock,
  LogOut,
  Mail,
  Package,
  Plus,
  ShieldCheck,
  Sparkles,
  Trash2,
  Watch,
} from 'lucide-react';
import { useEnterprise } from '../context/EnterpriseContext';
import { ADMIN_WATCH_SLIDES } from '../data/enterpriseData';
import { LiveBackdropSlideshow } from '../components/LiveBackdropSlideshow';
import { LuxuryVehicle, LuxuryWatch } from '../types/enterprise';

type AdminTab = 'overview' | 'fleet' | 'watches' | 'spa' | 'logistics' | 'inquiries';

export const AdminPage: React.FC = () => {
  const {
    adminUnlocked,
    unlockAdmin,
    lockAdmin,
    vehicles,
    watches,
    treatments,
    equipment,
    vehicleBookings,
    spaReservations,
    shipments,
    orders,
    inquiries,
    updateVehiclePrice,
    deleteVehicle,
    addVehicle,
    updateVehicleBookingStatus,
    updateWatchPrice,
    deleteWatch,
    addWatch,
    updateSpaReservationStatus,
    updateEquipmentPrice,
    deleteEquipment,
    updateShipmentStage,
    resolveInquiry,
  } = useEnterprise();

  const [passcode, setPasscode] = useState('');
  const [loginError, setLoginError] = useState('');
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');

  // Add Watch quick form
  const [newWatchBrand, setNewWatchBrand] = useState<LuxuryWatch['brand']>('Rolex');
  const [newWatchModel, setNewWatchModel] = useState('');
  const [newWatchRef, setNewWatchRef] = useState('');
  const [newWatchPrice, setNewWatchPrice] = useState('');

  // Add Vehicle quick form
  const [newVehName, setNewVehName] = useState('');
  const [newVehSeg, setNewVehSeg] = useState<LuxuryVehicle['segment']>('BMW');
  const [newVehPrice, setNewVehPrice] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ok = unlockAdmin(passcode);
    if (!ok) {
      setLoginError('Invalid clearance credentials.');
    } else {
      setLoginError('');
      setPasscode('');
    }
  };

  const handleCreateWatch = (e: React.FormEvent) => {
    e.preventDefault();
    const priceNum = Number(newWatchPrice);
    if (!newWatchModel.trim() || !Number.isFinite(priceNum) || priceNum <= 0) return;
    addWatch({
      brand: newWatchBrand,
      model: newWatchModel.trim(),
      referenceNumber: newWatchRef.trim() || `PH-${Date.now().toString().slice(-4)}`,
      category: 'Mechanical',
      movementType: 'Automatic',
      calibre: 'Calibre 3235 Manufacture',
      caseMaterial: '18K Yellow Gold & Titanium',
      caseDiameterMm: 41,
      dialColor: 'Skeleton Champagne',
      braceletStrap: 'Oyster / Integrated Bracelet',
      waterResistance: '100m / 10 ATM',
      powerReserve: '70 Hours',
      year: 2026,
      condition: 'Brand New',
      warranty: '5-Year International Peachy Vault Warranty',
      priceNgn: priceNum,
      stockCount: 1,
      rating: 5.0,
      image: '/images/watch_mechanical_tourbillon_gold_1794595222285.jpg',
      description: 'Newly inducted Peachy Holdings horological reference.',
      specifications: ['Certified Swiss Mechanical Movement', 'Box & Papers Included'],
    });
    setNewWatchModel('');
    setNewWatchRef('');
    setNewWatchPrice('');
  };

  const handleCreateVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    const daily = Number(newVehPrice);
    if (!newVehName.trim() || !Number.isFinite(daily) || daily <= 0) return;
    addVehicle({
      name: newVehName.trim(),
      manufacturer: newVehSeg,
      segment: newVehSeg,
      modelYear: 2026,
      image: '/images/car_bmw_m_competition_1794595203554.jpg',
      dailyPrice: daily,
      weeklyPrice: daily * 6,
      monthlyPrice: daily * 22,
      seats: 5,
      engine: 'Twin-Turbo Performance Powertrain',
      horsepower: '580 HP',
      zeroToHundred: '3.5s',
      transmission: '8-Speed Executive Automatic',
      fuelType: 'Petrol',
      chauffeurAvailable: true,
      description: 'Newly inducted executive motorcade vehicle ready for Naira charter.',
      status: 'Available',
      features: ['Executive Climate Suite', 'Armored Security Option', 'Chauffeur Ready'],
    });
    setNewVehName('');
    setNewVehPrice('');
  };

  const totalRevenueNgn =
    orders.reduce((s, o) => s + o.totalNgn, 0) +
    vehicleBookings.filter((b) => b.status === 'Confirmed').reduce((s, b) => s + b.estimatedTotal, 0) +
    spaReservations.filter((r) => r.status === 'Confirmed').reduce((s, r) => s + r.priceNgn, 0);

  return (
    <div className="relative min-h-screen bg-[#090909] text-[#F7F4ED] overflow-hidden">
      {/* Bold, High-Clarity Mechanical Wristwatch Background Slideshow (Very Visible!) */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <LiveBackdropSlideshow
          images={ADMIN_WATCH_SLIDES}
          intervalMs={3500}
          imageClassName="brightness-115 contrast-110"
          overlayClassName="bg-black/28"
          showIndicators
        />
      </div>

      {!adminUnlocked ? (
        /* Admin Login Gate: Clean Clearance Prompt (ZERO Password Hint) */
        <div className="relative z-10 min-h-[85vh] flex items-center justify-center px-4 py-20">
          <div className="w-full max-w-md rounded-2xl bg-black/68 backdrop-blur-md border border-[#C8A45D]/50 p-8 shadow-2xl space-y-6">
            <div className="text-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-[#C8A45D]/20 border border-[#C8A45D] flex items-center justify-center mx-auto">
                <ShieldCheck className="w-7 h-7 text-[#C8A45D]" />
              </div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
                Peachy Holdings Executive Security
              </div>
              <h1 className="font-serif text-3xl font-bold text-white">Operations Console</h1>
              <p className="text-xs text-[#F7F4ED]/80">
                Authorized administrators only. Enter executive clearance code to manage fleet, wristwatches, spa tariffs, and Naira ledger operations.
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="text-[11px] uppercase tracking-wider text-[#C8A45D] font-bold block mb-1.5">
                  Clearance Code
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-[#C8A45D] absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="password"
                    required
                    value={passcode}
                    onChange={(e) => setPasscode(e.target.value)}
                    placeholder="Enter clearance passphrase"
                    autoComplete="off"
                    className="w-full pl-10 pr-4 py-3 rounded-xl bg-black/75 border border-white/20 text-sm text-white focus:border-[#C8A45D] focus:outline-none"
                  />
                </div>
              </div>

              {loginError && (
                <div className="p-3 rounded-xl bg-red-950/75 border border-red-500/40 text-xs text-red-200">
                  {loginError}
                </div>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl bg-[#C8A45D] hover:bg-[#DFBF7A] text-[#090909] font-bold text-xs uppercase tracking-widest flex items-center justify-center gap-2 transition-colors"
              >
                <Lock className="w-4 h-4" />
                <span>Unlock Executive Console</span>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* Unlocked Executive Operations Console */
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
          {/* Header Bar */}
          <div className="rounded-2xl bg-black/68 backdrop-blur-md border border-[#C8A45D]/45 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="text-[11px] uppercase tracking-[0.25em] text-[#C8A45D] font-bold">
                Peachy Holdings · Executive Command
              </div>
              <h1 className="font-serif text-3xl sm:text-4xl font-bold text-white">
                Enterprise <span className="gold-gradient-text">Operations Console</span>
              </h1>
              <p className="text-xs text-[#F7F4ED]/80 mt-1">
                All fleet rates, horology prices, spa therapies, and cargo manifests operate strictly in Nigerian Naira (₦).
              </p>
            </div>
            <button
              type="button"
              onClick={lockAdmin}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-red-500/20 border border-white/20 hover:border-red-400/50 text-xs font-semibold text-white transition-colors self-start md:self-auto"
            >
              <LogOut className="w-4 h-4 text-[#C8A45D]" />
              <span>Lock Console</span>
            </button>
          </div>

          {/* Admin Section Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {(
              [
                { id: 'overview', label: 'Overview', icon: Activity },
                { id: 'fleet', label: `Fleet (${vehicles.length})`, icon: Car },
                { id: 'watches', label: `Watches (${watches.length})`, icon: Watch },
                { id: 'spa', label: `Spa & Equipment (${treatments.length}/${equipment.length})`, icon: Sparkles },
                { id: 'logistics', label: `Logistics (${shipments.length})`, icon: Package },
                { id: 'inquiries', label: `Inquiries (${inquiries.length})`, icon: Mail },
              ] as const
            ).map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap backdrop-blur-md transition-colors ${
                    activeTab === tab.id
                      ? 'bg-[#C8A45D] text-[#090909]'
                      : 'bg-black/68 border border-white/20 text-[#F7F4ED] hover:border-[#C8A45D]/60'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="rounded-2xl bg-black/68 backdrop-blur-md border border-[#C8A45D]/35 p-6">
                  <span className="text-[11px] uppercase tracking-wider text-[#C8A45D] font-bold">Verified Naira Volume</span>
                  <div className="font-mono text-2xl font-bold text-white mt-2 tabular-nums">
                    ₦{totalRevenueNgn.toLocaleString()}
                  </div>
                </div>
                <div className="rounded-2xl bg-black/68 backdrop-blur-md border border-[#C8A45D]/35 p-6">
                  <span className="text-[11px] uppercase tracking-wider text-[#C8A45D] font-bold">Unique Wristwatches</span>
                  <div className="font-mono text-2xl font-bold text-white mt-2 tabular-nums">{watches.length} Pieces</div>
                </div>
                <div className="rounded-2xl bg-black/68 backdrop-blur-md border border-[#C8A45D]/35 p-6">
                  <span className="text-[11px] uppercase tracking-wider text-[#C8A45D] font-bold">Executive Fleet</span>
                  <div className="font-mono text-2xl font-bold text-white mt-2 tabular-nums">{vehicles.length} Motorcars</div>
                </div>
                <div className="rounded-2xl bg-black/68 backdrop-blur-md border border-[#C8A45D]/35 p-6">
                  <span className="text-[11px] uppercase tracking-wider text-[#C8A45D] font-bold">Open Client Inquiries</span>
                  <div className="font-mono text-2xl font-bold text-white mt-2 tabular-nums">
                    {inquiries.filter((i) => i.status === 'Open').length} Open
                  </div>
                </div>
              </div>

              <div className="rounded-2xl bg-black/68 backdrop-blur-md border border-white/20 p-6 space-y-4">
                <h2 className="font-serif text-xl font-bold text-white">Recent Fleet & Spa Reservations</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
                  {vehicleBookings.map((b) => (
                    <div key={b.id} className="p-4 rounded-xl bg-black/55 border border-white/10 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-[#C8A45D]">{b.id} · {b.vehicleName}</div>
                        <div className="text-[#F7F4ED]/75">{b.customerName} · ₦{b.estimatedTotal.toLocaleString()}</div>
                      </div>
                      <select
                        value={b.status}
                        onChange={(e) => updateVehicleBookingStatus(b.id, e.target.value as typeof b.status)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#181818] border border-white/15 text-xs text-white"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending Verification">Pending Verification</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  ))}
                  {spaReservations.map((r) => (
                    <div key={r.id} className="p-4 rounded-xl bg-black/55 border border-white/10 flex items-center justify-between gap-3">
                      <div>
                        <div className="font-bold text-[#C8A45D]">{r.id} · {r.treatmentName}</div>
                        <div className="text-[#F7F4ED]/75">{r.customerName} · ₦{r.priceNgn.toLocaleString()}</div>
                      </div>
                      <select
                        value={r.status}
                        onChange={(e) => updateSpaReservationStatus(r.id, e.target.value as typeof r.status)}
                        className="px-2.5 py-1.5 rounded-lg bg-[#181818] border border-white/15 text-xs text-white"
                      >
                        <option value="Confirmed">Confirmed</option>
                        <option value="Pending">Pending</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Fleet Management Tab */}
          {activeTab === 'fleet' && (
            <div className="space-y-6">
              <form
                onSubmit={handleCreateVehicle}
                className="rounded-2xl bg-black/68 backdrop-blur-md border border-[#C8A45D]/40 p-6 grid grid-cols-1 md:grid-cols-4 gap-3 items-end"
              >
                <div className="md:col-span-2">
                  <label className="text-[11px] uppercase text-[#C8A45D] font-bold block mb-1">Add New Vehicle Model</label>
                  <input
                    type="text"
                    required
                    value={newVehName}
                    onChange={(e) => setNewVehName(e.target.value)}
                    placeholder="e.g. BMW X7 M60i xDrive"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/70 border border-white/15 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase text-[#C8A45D] font-bold block mb-1">Segment</label>
                  <select
                    value={newVehSeg}
                    onChange={(e) => setNewVehSeg(e.target.value as LuxuryVehicle['segment'])}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/70 border border-white/15 text-xs text-white"
                  >
                    <option value="BMW">BMW</option>
                    <option value="Competition">Competition</option>
                    <option value="Toyota Prado">Toyota Prado</option>
                    <option value="Lexus IS 350">Lexus IS 350</option>
                    <option value="Mercedes-Benz">Mercedes-Benz</option>
                    <option value="Rolls-Royce">Rolls-Royce</option>
                    <option value="Lamborghini">Lamborghini</option>
                  </select>
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    required
                    min={50000}
                    value={newVehPrice}
                    onChange={(e) => setNewVehPrice(e.target.value)}
                    placeholder="Daily ₦"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/70 border border-white/15 text-xs text-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#C8A45D] text-[#090909] text-xs font-bold flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </form>

              <div className="rounded-2xl bg-black/68 backdrop-blur-md border border-white/20 p-6 space-y-3">
                {vehicles.map((v) => (
                  <div key={v.id} className="p-4 rounded-xl bg-black/55 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={v.image} alt={v.name} className="w-16 h-12 rounded-lg object-cover shrink-0" />
                      <div>
                        <div className="font-semibold text-sm text-white">{v.name}</div>
                        <div className="text-[11px] text-[#F7F4ED]/60">{v.segment} · {v.engine}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-[11px] text-[#F7F4ED]/60">Daily ₦</label>
                      <input
                        type="number"
                        defaultValue={v.dailyPrice}
                        onBlur={(e) => {
                          const val = Number(e.target.value);
                          if (Number.isFinite(val) && val > 0 && val !== v.dailyPrice) {
                            updateVehiclePrice(v.id, val);
                          }
                        }}
                        className="w-32 px-3 py-1.5 rounded-lg bg-[#181818] border border-white/15 font-mono text-xs text-[#C8A45D]"
                      />
                      <button
                        type="button"
                        onClick={() => deleteVehicle(v.id)}
                        aria-label={`Delete ${v.name}`}
                        className="p-2 rounded-lg border border-white/10 text-red-400 hover:bg-red-500/15"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Watches Inventory Tab */}
          {activeTab === 'watches' && (
            <div className="space-y-6">
              <form
                onSubmit={handleCreateWatch}
                className="rounded-2xl bg-black/68 backdrop-blur-md border border-[#C8A45D]/40 p-6 grid grid-cols-1 md:grid-cols-5 gap-3 items-end"
              >
                <div>
                  <label className="text-[11px] uppercase text-[#C8A45D] font-bold block mb-1">Brand</label>
                  <select
                    value={newWatchBrand}
                    onChange={(e) => setNewWatchBrand(e.target.value as LuxuryWatch['brand'])}
                    className="w-full px-3 py-2.5 rounded-xl bg-black/70 border border-white/15 text-xs text-white"
                  >
                    <option value="Richard Mille">Richard Mille</option>
                    <option value="Rolex">Rolex</option>
                    <option value="Audemars Piguet">Audemars Piguet</option>
                    <option value="Alexander McQueen">Alexander McQueen</option>
                    <option value="Patek Philippe">Patek Philippe</option>
                    <option value="Vacheron Constantin">Vacheron Constantin</option>
                    <option value="Omega">Omega</option>
                    <option value="Casio G-Shock">Casio G-Shock</option>
                    <option value="Casio">Casio</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="text-[11px] uppercase text-[#C8A45D] font-bold block mb-1">Timepiece Model</label>
                  <input
                    type="text"
                    required
                    value={newWatchModel}
                    onChange={(e) => setNewWatchModel(e.target.value)}
                    placeholder="e.g. Royal Oak Flying Tourbillon Openworked"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/70 border border-white/15 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="text-[11px] uppercase text-[#C8A45D] font-bold block mb-1">Reference</label>
                  <input
                    type="text"
                    value={newWatchRef}
                    onChange={(e) => setNewWatchRef(e.target.value)}
                    placeholder="Ref No."
                    className="w-full px-3 py-2.5 rounded-xl bg-black/70 border border-white/15 text-xs text-white"
                  />
                </div>
                <div className="flex gap-2">
                  <input
                    type="number"
                    required
                    min={10000}
                    value={newWatchPrice}
                    onChange={(e) => setNewWatchPrice(e.target.value)}
                    placeholder="Price ₦"
                    className="w-full px-3 py-2.5 rounded-xl bg-black/70 border border-white/15 text-xs text-white"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2.5 rounded-xl bg-[#C8A45D] text-[#090909] text-xs font-bold flex items-center gap-1 shrink-0"
                  >
                    <Plus className="w-4 h-4" /> Add
                  </button>
                </div>
              </form>

              <div className="rounded-2xl bg-black/68 backdrop-blur-md border border-white/20 p-6 space-y-3">
                {watches.map((w) => (
                  <div key={w.id} className="p-4 rounded-xl bg-black/55 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <img src={w.image} alt={w.model} className="w-14 h-14 rounded-lg object-cover shrink-0" />
                      <div>
                        <div className="text-[10px] uppercase text-[#C8A45D] font-bold">{w.brand}</div>
                        <div className="font-semibold text-sm text-white">{w.model}</div>
                        <div className="text-[11px] text-[#F7F4ED]/60">Ref: {w.referenceNumber} · {w.calibre}</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <label className="text-[11px] text-[#F7F4ED]/60">₦ NGN</label>
                      <input
                        type="number"
                        defaultValue={w.priceNgn}
                        onBlur={(e) => {
                          const val = Number(e.target.value);
                          if (Number.isFinite(val) && val > 0 && val !== w.priceNgn) {
                            updateWatchPrice(w.id, val);
                          }
                        }}
                        className="w-36 px-3 py-1.5 rounded-lg bg-[#181818] border border-white/15 font-mono text-xs text-[#C8A45D]"
                      />
                      <button
                        type="button"
                        onClick={() => deleteWatch(w.id)}
                        aria-label={`Delete ${w.model}`}
                        className="p-2 rounded-lg border border-white/10 text-red-400 hover:bg-red-500/15"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Spa & Equipment Tab */}
          {activeTab === 'spa' && (
            <div className="rounded-2xl bg-black/68 backdrop-blur-md border border-white/20 p-6 space-y-4">
              <h2 className="font-serif text-xl font-bold text-white">Medical Spa & Aesthetic Equipment Tariffs (₦)</h2>
              {equipment.map((eq) => (
                <div key={eq.id} className="p-4 rounded-xl bg-black/55 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="text-[10px] uppercase text-[#C8A45D] font-bold">{eq.manufacturer}</div>
                    <div className="font-semibold text-sm text-white">{eq.name}</div>
                    <div className="text-[11px] text-[#F7F4ED]/60">{eq.model}</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <label className="text-[11px] text-[#F7F4ED]/60">₦ NGN</label>
                    <input
                      type="number"
                      defaultValue={eq.priceNgn}
                      onBlur={(e) => {
                        const val = Number(e.target.value);
                        if (Number.isFinite(val) && val > 0 && val !== eq.priceNgn) {
                          updateEquipmentPrice(eq.id, val);
                        }
                      }}
                      className="w-36 px-3 py-1.5 rounded-lg bg-[#181818] border border-white/15 font-mono text-xs text-[#C8A45D]"
                    />
                    <button
                      type="button"
                      onClick={() => deleteEquipment(eq.id)}
                      aria-label={`Delete ${eq.name}`}
                      className="p-2 rounded-lg border border-white/10 text-red-400 hover:bg-red-500/15"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Logistics Shipments Tab */}
          {activeTab === 'logistics' && (
            <div className="rounded-2xl bg-black/68 backdrop-blur-md border border-white/20 p-6 space-y-4">
              <h2 className="font-serif text-xl font-bold text-white">Armored Waybill Stage Progression</h2>
              {shipments.map((s) => (
                <div key={s.trackingNumber} className="p-4 rounded-xl bg-black/55 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-mono text-sm font-bold text-[#C8A45D]">{s.trackingNumber}</div>
                    <div className="text-xs text-white">
                      {s.origin} &rarr; {s.destination} · Declared ₦{s.declaredValueNgn.toLocaleString()}
                    </div>
                    <div className="text-[11px] text-emerald-400 mt-0.5">Current Stage: {s.currentStage}</div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => updateShipmentStage(s.trackingNumber, s.currentStageIndex + 1)}
                      disabled={s.currentStageIndex >= 6}
                      className="px-4 py-2 rounded-lg bg-[#C8A45D] disabled:opacity-40 text-[#090909] text-xs font-bold"
                    >
                      Advance Stage
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Client Inquiries Tab */}
          {activeTab === 'inquiries' && (
            <div className="rounded-2xl bg-black/68 backdrop-blur-md border border-white/20 p-6 space-y-4">
              <h2 className="font-serif text-xl font-bold text-white">Executive Desk Inquiries</h2>
              {inquiries.map((inq) => (
                <div key={inq.id} className="p-4 rounded-xl bg-black/55 border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono text-[#C8A45D] font-bold">{inq.id}</span>
                      <span className="text-white font-semibold">{inq.name}</span>
                      <span className="text-[#F7F4ED]/55">({inq.division})</span>
                    </div>
                    <p className="text-xs text-[#F7F4ED]/80">{inq.message}</p>
                    <div className="text-[11px] text-[#F7F4ED]/55">{inq.email} · {inq.phone}</div>
                  </div>
                  {inq.status === 'Open' ? (
                    <button
                      type="button"
                      onClick={() => resolveInquiry(inq.id)}
                      className="px-4 py-2 rounded-lg bg-[#C8A45D] text-[#090909] text-xs font-bold shrink-0"
                    >
                      Mark Resolved
                    </button>
                  ) : (
                    <span className="inline-flex items-center gap-1 text-xs text-emerald-400 font-semibold shrink-0">
                      <CheckCircle2 className="w-4 h-4" /> Resolved
                    </span>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};
