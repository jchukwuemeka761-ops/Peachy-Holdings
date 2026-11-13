import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import {
  CartItem,
  ContactInquiry,
  LuxuryVehicle,
  LuxuryWatch,
  ModalState,
  Order,
  ShipmentRecord,
  SpaEquipment,
  SpaReservation,
  SpaTreatment,
  UserAccount,
  VehicleBooking,
} from '../types/enterprise';
import {
  DEMO_USERS,
  LUXURY_VEHICLES,
  LUXURY_WATCHES,
  SAMPLE_SHIPMENTS,
  SPA_EQUIPMENT,
  SPA_TREATMENTS,
} from '../data/enterpriseData';

const STORAGE_KEY = 'peachy_holdings_state_v3_ngn';

interface PersistedState {
  vehicles: LuxuryVehicle[];
  watches: LuxuryWatch[];
  treatments: SpaTreatment[];
  equipment: SpaEquipment[];
  cart: CartItem[];
  wishlist: string[];
  vehicleBookings: VehicleBooking[];
  spaReservations: SpaReservation[];
  shipments: ShipmentRecord[];
  orders: Order[];
  inquiries: ContactInquiry[];
  discountCode: string;
}

const DEFAULT_PERSISTED: PersistedState = {
  vehicles: LUXURY_VEHICLES,
  watches: LUXURY_WATCHES,
  treatments: SPA_TREATMENTS,
  equipment: SPA_EQUIPMENT,
  cart: [],
  wishlist: ['wt-rm-1103', 'wt-rolex-daytona'],
  vehicleBookings: [
    {
      id: 'BK-9021',
      vehicleId: 'veh-rr-phantom',
      vehicleName: 'Rolls-Royce Phantom Series II Extended',
      vehicleImage: '/images/hero_holding.jpg',
      customerName: 'Chief Emeka Sterling',
      customerPhone: '+234 803 555 0192',
      pickupLocation: 'Abuja Nnamdi Azikiwe VIP Terminal',
      destination: 'Umuahia Sanctuary Residence, Abia State',
      pickupDate: '2026-11-18',
      returnDate: '2026-11-21',
      driveType: 'chauffeur',
      estimatedTotal: 7500000,
      status: 'Confirmed',
      createdAt: '2026-11-10',
    },
  ],
  spaReservations: [
    {
      id: 'SPA-4412',
      treatmentId: 'spa-tr-5',
      treatmentName: 'Private Couples Presidential Suite & Bath',
      treatmentImage: '/images/spa_aromatherapy_suite_1794595223231.jpg',
      customerName: 'Chief Emeka Sterling',
      customerPhone: '+234 803 555 0192',
      date: '2026-11-19',
      timeSlot: '15:00',
      guests: 2,
      priceNgn: 380000,
      status: 'Confirmed',
      notes: 'Bergamot essential oils & chilled herbal elixir upon arrival.',
      createdAt: '2026-11-10',
    },
  ],
  shipments: SAMPLE_SHIPMENTS,
  orders: [
    {
      id: 'ORD-7782',
      invoiceNumber: 'INV-PH-2026-7782',
      customerName: 'Chief Emeka Sterling',
      customerEmail: 'client@peachyholdings.com',
      shippingAddress: {
        fullName: 'Chief Emeka Sterling',
        street: '14 Maitama Diplomatic Crescent',
        city: 'Abuja',
        country: 'Nigeria',
        phone: '+234 803 555 0192',
      },
      items: [
        {
          watchId: 'wt-rolex-submariner',
          brand: 'Rolex',
          model: 'Submariner Date Ceramic Chronometer',
          referenceNumber: '126610LN',
          quantity: 1,
          unitPriceNgn: 26800000,
        },
      ],
      subtotalNgn: 26800000,
      discountNgn: 0,
      totalNgn: 26800000,
      paymentMethod: 'Naira Corporate Escrow Wire',
      paymentStatus: 'Escrow Verified',
      createdAt: '2026-11-05',
    },
  ],
  inquiries: [
    {
      id: 'INQ-301',
      name: 'Dr. Chinedu Okafor',
      email: 'c.okafor@enugumedical.ng',
      phone: '+234 809 321 7741',
      division: 'Spa Sanctuary Equipment',
      message: 'Requesting commercial commissioning quote for 2 Nordic Cedar Infrared Saunas for Enugu villa clinic.',
      status: 'Open',
      createdAt: '2026-11-11',
    },
  ],
  discountCode: '',
};

interface EnterpriseContextValue {
  vehicles: LuxuryVehicle[];
  watches: LuxuryWatch[];
  treatments: SpaTreatment[];
  equipment: SpaEquipment[];
  cart: CartItem[];
  wishlist: string[];
  vehicleBookings: VehicleBooking[];
  spaReservations: SpaReservation[];
  shipments: ShipmentRecord[];
  orders: Order[];
  inquiries: ContactInquiry[];
  currentUser: UserAccount;
  isAdmin: boolean;
  adminUnlocked: boolean;
  cartDrawerOpen: boolean;
  modal: ModalState;
  toast: { message: string; type: 'success' | 'error' } | null;
  discountCode: string;
  discountPercentage: number;
  cartSubtotal: number;
  cartDiscount: number;
  cartTotal: number;
  cartCount: number;
  setCartDrawerOpen: (open: boolean) => void;
  setModal: (modal: ModalState) => void;
  showToast: (message: string, type?: 'success' | 'error') => void;
  switchUser: (role: 'customer' | 'admin') => void;
  unlockAdmin: (passcode: string) => boolean;
  lockAdmin: () => void;
  addToCart: (watch: LuxuryWatch) => void;
  updateCartQuantity: (watchId: string, qty: number) => void;
  removeFromCart: (watchId: string) => void;
  clearCart: () => void;
  applyPromoCode: (code: string) => boolean;
  toggleWishlist: (watchId: string) => void;
  addVehicleBooking: (booking: Omit<VehicleBooking, 'id' | 'status' | 'createdAt'>) => void;
  updateVehicleBookingStatus: (id: string, status: VehicleBooking['status']) => void;
  addSpaReservation: (res: Omit<SpaReservation, 'id' | 'status' | 'createdAt'>) => void;
  updateSpaReservationStatus: (id: string, status: SpaReservation['status']) => void;
  placeWatchOrder: (
    shippingAddress: Order['shippingAddress'],
    paymentMethod: string,
  ) => Order;
  addVehicle: (vehicle: Omit<LuxuryVehicle, 'id'>) => void;
  updateVehiclePrice: (id: string, dailyPrice: number) => void;
  deleteVehicle: (id: string) => void;
  addWatch: (watch: Omit<LuxuryWatch, 'id'>) => void;
  updateWatchPrice: (id: string, priceNgn: number) => void;
  deleteWatch: (id: string) => void;
  addEquipment: (eq: Omit<SpaEquipment, 'id'>) => void;
  updateEquipmentPrice: (id: string, priceNgn: number) => void;
  deleteEquipment: (id: string) => void;
  updateShipmentStage: (trackingNumber: string, stageIndex: number) => void;
  addInquiry: (inq: Omit<ContactInquiry, 'id' | 'status' | 'createdAt'>) => void;
  resolveInquiry: (id: string) => void;
}

const EnterpriseContext = createContext<EnterpriseContextValue | null>(null);

function loadPersisted(): PersistedState {
  if (typeof window === 'undefined') return DEFAULT_PERSISTED;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_PERSISTED;
    const parsed = JSON.parse(raw) as Partial<PersistedState>;
    return {
      vehicles: parsed.vehicles?.length ? parsed.vehicles : DEFAULT_PERSISTED.vehicles,
      watches: parsed.watches?.length ? parsed.watches : DEFAULT_PERSISTED.watches,
      treatments: parsed.treatments?.length ? parsed.treatments : DEFAULT_PERSISTED.treatments,
      equipment: parsed.equipment?.length ? parsed.equipment : DEFAULT_PERSISTED.equipment,
      cart: parsed.cart ?? [],
      wishlist: parsed.wishlist ?? DEFAULT_PERSISTED.wishlist,
      vehicleBookings: parsed.vehicleBookings ?? DEFAULT_PERSISTED.vehicleBookings,
      spaReservations: parsed.spaReservations ?? DEFAULT_PERSISTED.spaReservations,
      shipments: parsed.shipments ?? DEFAULT_PERSISTED.shipments,
      orders: parsed.orders ?? DEFAULT_PERSISTED.orders,
      inquiries: parsed.inquiries ?? DEFAULT_PERSISTED.inquiries,
      discountCode: parsed.discountCode ?? '',
    };
  } catch {
    return DEFAULT_PERSISTED;
  }
}

const SHIPMENT_STAGES = [
  'Shipment received',
  'Pickup scheduled',
  'Collected',
  'In transit',
  'At distribution centre',
  'Out for delivery',
  'Delivered',
];

export const EnterpriseProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setData] = useState<PersistedState>(() => loadPersisted());
  const [currentUser, setCurrentUser] = useState<UserAccount>(DEMO_USERS[0]);
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [cartDrawerOpen, setCartDrawerOpen] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' } | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch {
      // Ignore storage quota exceptions
    }
  }, [data]);

  const showToast = (message: string, type: 'success' | 'error' = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast((prev) => (prev?.message === message ? null : prev));
    }, 3600);
  };

  const discountPercentage = useMemo(() => {
    return data.discountCode.trim().toUpperCase() === 'EXCELLENCE10' ? 10 : 0;
  }, [data.discountCode]);

  const cartSubtotal = useMemo(
    () => data.cart.reduce((sum, item) => sum + item.unitPrice * item.quantity, 0),
    [data.cart],
  );
  const cartDiscount = useMemo(
    () => Math.round((cartSubtotal * discountPercentage) / 100),
    [cartSubtotal, discountPercentage],
  );
  const cartTotal = useMemo(() => cartSubtotal - cartDiscount, [cartSubtotal, cartDiscount]);
  const cartCount = useMemo(
    () => data.cart.reduce((sum, item) => sum + item.quantity, 0),
    [data.cart],
  );

  const value: EnterpriseContextValue = {
    ...data,
    currentUser,
    isAdmin: currentUser.role === 'superadmin',
    adminUnlocked,
    cartDrawerOpen,
    modal,
    toast,
    discountPercentage,
    cartSubtotal,
    cartDiscount,
    cartTotal,
    cartCount,
    setCartDrawerOpen,
    setModal,
    showToast,
    switchUser: (role) => {
      setCurrentUser(role === 'admin' ? DEMO_USERS[1] : DEMO_USERS[0]);
      if (role === 'customer') setAdminUnlocked(false);
      showToast(`Switched active profile to ${role === 'admin' ? 'Executive Administrator' : 'VIP Client'}.`);
    },
    unlockAdmin: (passcode) => {
      if (passcode.trim() === 'peachy2026') {
        setAdminUnlocked(true);
        setCurrentUser(DEMO_USERS[1]);
        showToast('Operations Console unlocked.');
        return true;
      }
      showToast('Invalid executive clearance code.', 'error');
      return false;
    },
    lockAdmin: () => {
      setAdminUnlocked(false);
      setCurrentUser(DEMO_USERS[0]);
      showToast('Operations Console locked.');
    },
    addToCart: (watch) => {
      setData((prev) => {
        const existing = prev.cart.find((item) => item.watch.id === watch.id);
        const nextCart = existing
          ? prev.cart.map((item) =>
              item.watch.id === watch.id ? { ...item, quantity: item.quantity + 1 } : item,
            )
          : [...prev.cart, { watch, quantity: 1, unitPrice: watch.priceNgn }];
        return { ...prev, cart: nextCart };
      });
      setCartDrawerOpen(true);
      showToast(`${watch.brand} ${watch.model} added to bag.`);
    },
    updateCartQuantity: (watchId, qty) => {
      setData((prev) => ({
        ...prev,
        cart:
          qty <= 0
            ? prev.cart.filter((i) => i.watch.id !== watchId)
            : prev.cart.map((i) => (i.watch.id === watchId ? { ...i, quantity: qty } : i)),
      }));
    },
    removeFromCart: (watchId) => {
      setData((prev) => ({
        ...prev,
        cart: prev.cart.filter((i) => i.watch.id !== watchId),
      }));
    },
    clearCart: () => {
      setData((prev) => ({ ...prev, cart: [], discountCode: '' }));
    },
    applyPromoCode: (code) => {
      const normalized = code.trim().toUpperCase();
      if (normalized === 'EXCELLENCE10') {
        setData((prev) => ({ ...prev, discountCode: normalized }));
        showToast('EXCELLENCE10 privilege applied: 10% reduction.');
        return true;
      }
      showToast('Promo code not recognized.', 'error');
      return false;
    },
    toggleWishlist: (watchId) => {
      setData((prev) => {
        const exists = prev.wishlist.includes(watchId);
        return {
          ...prev,
          wishlist: exists ? prev.wishlist.filter((id) => id !== watchId) : [...prev.wishlist, watchId],
        };
      });
    },
    addVehicleBooking: (booking) => {
      const created: VehicleBooking = {
        ...booking,
        id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'Pending Verification',
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setData((prev) => ({ ...prev, vehicleBookings: [created, ...prev.vehicleBookings] }));
      showToast(`Fleet reservation ${created.id} submitted.`);
    },
    updateVehicleBookingStatus: (id, status) => {
      setData((prev) => ({
        ...prev,
        vehicleBookings: prev.vehicleBookings.map((b) => (b.id === id ? { ...b, status } : b)),
      }));
      showToast(`Reservation ${id} marked ${status}.`);
    },
    addSpaReservation: (res) => {
      const created: SpaReservation = {
        ...res,
        id: `SPA-${Math.floor(1000 + Math.random() * 9000)}`,
        status: 'Confirmed',
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setData((prev) => ({ ...prev, spaReservations: [created, ...prev.spaReservations] }));
      showToast(`Umuahia Sanctuary reservation ${created.id} confirmed.`);
    },
    updateSpaReservationStatus: (id, status) => {
      setData((prev) => ({
        ...prev,
        spaReservations: prev.spaReservations.map((r) => (r.id === id ? { ...r, status } : r)),
      }));
      showToast(`Spa booking ${id} marked ${status}.`);
    },
    placeWatchOrder: (shippingAddress, paymentMethod) => {
      const orderNum = Math.floor(1000 + Math.random() * 9000);
      const newOrder: Order = {
        id: `ORD-${orderNum}`,
        invoiceNumber: `INV-PH-2026-${orderNum}`,
        customerName: shippingAddress.fullName,
        customerEmail: currentUser.email,
        shippingAddress,
        items: data.cart.map((c) => ({
          watchId: c.watch.id,
          brand: c.watch.brand,
          model: c.watch.model,
          referenceNumber: c.watch.referenceNumber,
          quantity: c.quantity,
          unitPriceNgn: c.unitPrice,
        })),
        subtotalNgn: cartSubtotal,
        discountNgn: cartDiscount,
        totalNgn: cartTotal,
        paymentMethod,
        paymentStatus: 'Escrow Verified',
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setData((prev) => ({
        ...prev,
        orders: [newOrder, ...prev.orders],
        cart: [],
        discountCode: '',
      }));
      showToast(`Order ${newOrder.invoiceNumber} settled in Naira.`);
      return newOrder;
    },
    addVehicle: (vehicle) => {
      const item: LuxuryVehicle = { ...vehicle, id: `veh-${Date.now()}` };
      setData((prev) => ({ ...prev, vehicles: [item, ...prev.vehicles] }));
      showToast(`${vehicle.name} added to mobility fleet.`);
    },
    updateVehiclePrice: (id, dailyPrice) => {
      setData((prev) => ({
        ...prev,
        vehicles: prev.vehicles.map((v) =>
          v.id === id
            ? { ...v, dailyPrice, weeklyPrice: dailyPrice * 6, monthlyPrice: dailyPrice * 22 }
            : v,
        ),
      }));
      showToast('Vehicle Naira tariff updated.');
    },
    deleteVehicle: (id) => {
      setData((prev) => ({ ...prev, vehicles: prev.vehicles.filter((v) => v.id !== id) }));
      showToast('Vehicle removed from active fleet.');
    },
    addWatch: (watch) => {
      const item: LuxuryWatch = { ...watch, id: `wt-${Date.now()}` };
      setData((prev) => ({ ...prev, watches: [item, ...prev.watches] }));
      showToast(`${watch.brand} ${watch.model} added to horology vault.`);
    },
    updateWatchPrice: (id, priceNgn) => {
      setData((prev) => ({
        ...prev,
        watches: prev.watches.map((w) => (w.id === id ? { ...w, priceNgn } : w)),
      }));
      showToast('Timepiece Naira valuation updated.');
    },
    deleteWatch: (id) => {
      setData((prev) => ({ ...prev, watches: prev.watches.filter((w) => w.id !== id) }));
      showToast('Watch removed from vault.');
    },
    addEquipment: (eq) => {
      const item: SpaEquipment = { ...eq, id: `eq-${Date.now()}` };
      setData((prev) => ({ ...prev, equipment: [item, ...prev.equipment] }));
      showToast(`${eq.name} added to equipment inventory.`);
    },
    updateEquipmentPrice: (id, priceNgn) => {
      setData((prev) => ({
        ...prev,
        equipment: prev.equipment.map((e) => (e.id === id ? { ...e, priceNgn } : e)),
      }));
      showToast('Spa equipment Naira valuation updated.');
    },
    deleteEquipment: (id) => {
      setData((prev) => ({ ...prev, equipment: prev.equipment.filter((e) => e.id !== id) }));
      showToast('Equipment removed.');
    },
    updateShipmentStage: (trackingNumber, stageIndex) => {
      const clamped = Math.max(0, Math.min(SHIPMENT_STAGES.length - 1, stageIndex));
      const stageName = SHIPMENT_STAGES[clamped];
      setData((prev) => ({
        ...prev,
        shipments: prev.shipments.map((s) =>
          s.trackingNumber === trackingNumber
            ? {
                ...s,
                currentStageIndex: clamped,
                currentStage: stageName,
                status: clamped === SHIPMENT_STAGES.length - 1 ? 'Delivered' : 'Active',
              }
            : s,
        ),
      }));
      showToast(`Waybill ${trackingNumber} updated to "${stageName}".`);
    },
    addInquiry: (inq) => {
      const item: ContactInquiry = {
        ...inq,
        id: `INQ-${Math.floor(100 + Math.random() * 900)}`,
        status: 'Open',
        createdAt: new Date().toISOString().slice(0, 10),
      };
      setData((prev) => ({ ...prev, inquiries: [item, ...prev.inquiries] }));
      showToast('Executive inquiry transmitted to Peachy Holdings desk.');
    },
    resolveInquiry: (id) => {
      setData((prev) => ({
        ...prev,
        inquiries: prev.inquiries.map((i) => (i.id === id ? { ...i, status: 'Resolved' } : i)),
      }));
      showToast('Inquiry marked resolved.');
    },
  };

  return <EnterpriseContext.Provider value={value}>{children}</EnterpriseContext.Provider>;
};

export function useEnterprise(): EnterpriseContextValue {
  const ctx = useContext(EnterpriseContext);
  if (!ctx) throw new Error('useEnterprise must be used inside EnterpriseProvider');
  return ctx;
}
