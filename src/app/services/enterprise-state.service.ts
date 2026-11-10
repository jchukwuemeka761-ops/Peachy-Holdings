import { Injectable, computed, signal } from '@angular/core';
import {
  LuxuryVehicle,
  VehicleBooking,
  LuxuryWatch,
  SpaTreatment,
  SpaEquipment,
  SpaReservation,
  ShipmentRecord,
  TrackingStage,
  UserAccount,
  CartItem,
  Order,
  GeneralInquiry
} from '../models/enterprise.models';
import {
  LUXURY_VEHICLES,
  LUXURY_WATCHES,
  SPA_TREATMENTS,
  SPA_EQUIPMENT,
  SAMPLE_SHIPMENTS,
  DEMO_USERS,
  ENTERPRISE_INFO
} from '../data/enterprise.data';

@Injectable({
  providedIn: 'root'
})
export class EnterpriseStateService {
  // Brand & Enterprise Info
  readonly enterpriseInfo = ENTERPRISE_INFO;

  // Current User Account (Defaults to VIP Customer, switchable to Admin in UI)
  readonly currentUser = signal<UserAccount>(DEMO_USERS[0]);

  // Luxury Cars & Bookings
  readonly vehicles = signal<LuxuryVehicle[]>(this.loadFromStorage('phe_vehicles', LUXURY_VEHICLES));
  readonly vehicleBookings = signal<VehicleBooking[]>(this.loadFromStorage('phe_car_bookings', [
    {
      id: 'BK-CAR-101',
      vehicleId: 'car-1',
      vehicleName: 'Rolls-Royce Phantom',
      vehicleImage: '/images/hero_holding.jpg',
      pickupLocation: 'Executive Terminal, Abuja Airport',
      destination: 'Transcorp Hilton Presidential Wing',
      pickupDate: '2026-11-12',
      returnDate: '2026-11-15',
      driveType: 'chauffeur',
      customerName: 'Chief Emeka Sterling',
      email: 'client@peachyholding.com',
      phone: '+234 803 555 0192',
      additionalRequirements: 'Armored protection escort and diplomatic flags requested.',
      dailyRate: 1500,
      estimatedTotal: 4500,
      status: 'Confirmed',
      createdAt: '2026-11-08'
    }
  ]));

  // Luxury Watches & Orders
  readonly watches = signal<LuxuryWatch[]>(this.loadFromStorage('phe_watches', LUXURY_WATCHES));
  readonly orders = signal<Order[]>(this.loadFromStorage('phe_orders', [
    {
      id: 'ord-8921',
      orderNumber: 'PHE-ORD-2026-8921',
      items: [
        {
          watchId: 'watch-rx-3',
          brand: 'Rolex',
          model: 'Cosmograph Daytona',
          referenceNumber: '126500LN',
          image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=800&q=80',
          quantity: 1,
          unitPrice: 34500
        }
      ],
      subtotal: 34500,
      discountAmount: 0,
      tax: 0,
      shipping: 0,
      total: 34500,
      paymentMethod: 'stripe-card',
      paymentStatus: 'Authorized',
      shippingAddress: {
        fullName: 'Chief Emeka Sterling',
        street: '14 Queen Elizabeth Boulevard',
        city: 'Umuahia',
        state: 'Abia State',
        country: 'Nigeria',
        postalCode: '900103',
        phone: '+234 803 555 0192'
      },
      customerEmail: 'client@peachyholding.com',
      customerName: 'Chief Emeka Sterling',
      createdAt: '2026-11-06T14:20:00Z',
      invoiceNumber: 'INV-PHE-8921'
    }
  ]));

  // Spa Sanctuary Treatments, Equipment & Bookings
  readonly spaTreatments = signal<SpaTreatment[]>(this.loadFromStorage('phe_spa_treatments', SPA_TREATMENTS));
  readonly spaEquipment = signal<SpaEquipment[]>(this.loadFromStorage('phe_spa_equipment', SPA_EQUIPMENT));
  
  // Admin Secure Authentication State (default password 'peachy2026' or 'admin123')
  readonly isAdminAuthenticated = signal<boolean>(this.loadFromStorage('phe_admin_authed', false));
  readonly adminMasterPassword = signal<string>(this.loadFromStorage('phe_admin_pwd', 'peachy2026'));

  readonly spaReservations = signal<SpaReservation[]>(this.loadFromStorage('phe_spa_reservations', [
    {
      id: 'RES-SPA-401',
      treatmentId: 'spa-tr-10',
      treatmentName: 'Private Couples Indulgence Massage',
      date: '2026-11-14',
      time: '15:00',
      durationMinutes: 90,
      therapistPreference: 'Master Wellness Director',
      guestType: 'Couples',
      customerName: 'Chief Emeka Sterling',
      email: 'client@peachyholding.com',
      phone: '+234 803 555 0192',
      specialRequirements: 'Organic lavender aroma blend and pre-chilled Dom Pérignon.',
      price: 250,
      paymentStatus: 'Deposit Paid',
      status: 'Confirmed',
      createdAt: '2026-11-08'
    }
  ]));

  // Global Logistics & Tracking
  readonly shipments = signal<ShipmentRecord[]>(this.loadFromStorage('phe_shipments', SAMPLE_SHIPMENTS));

  // General & Division Inquiries
  readonly inquiries = signal<GeneralInquiry[]>(this.loadFromStorage('phe_inquiries', [
    {
      id: 'inq-101',
      division: 'Watches',
      subject: 'Patek Philippe 5270P Platinum Allocation Request',
      name: 'Sen. B. Aliyu',
      email: 'b.aliyu@executivecorp.ng',
      phone: '+234 802 334 1199',
      message: 'Please advise on delivery timeframe to Abuja private residence with armored courier.',
      status: 'In Review',
      createdAt: '2026-11-09T08:15:00Z'
    },
    {
      id: 'inq-102',
      division: 'Spa & Wellness',
      subject: 'Sanctuary Exclusive Buyout for VIP Delegation',
      name: 'Lady Ngozi Chike',
      email: 'ngozi@chikeholdings.com',
      phone: '+234 809 444 8822',
      message: 'Enquiry for full afternoon sanctuary reservation at the Umuahia facility for 6 executive guests.',
      status: 'New',
      createdAt: '2026-11-09T11:45:00Z'
    }
  ]));

  // Cart & Wishlist
  readonly cart = signal<CartItem[]>(this.loadFromStorage('phe_cart', []));
  readonly wishlist = signal<string[]>(this.loadFromStorage('phe_wishlist', ['watch-pp-1', 'watch-rx-3']));
  readonly discountCode = signal<string | null>(null);
  readonly discountPercentage = signal<number>(0);

  // Active Modals & Slide-Overs
  readonly cartDrawerOpen = signal<boolean>(false);
  readonly selectedCarForBooking = signal<LuxuryVehicle | null>(null);
  readonly selectedSpaForBooking = signal<SpaTreatment | null>(null);
  readonly selectedWatchQuickView = signal<LuxuryWatch | null>(null);
  readonly selectedWatchForQuote = signal<LuxuryWatch | null>(null);

  // Notifications banner
  readonly toastMessage = signal<{ text: string; type: 'success' | 'info' | 'error' } | null>(null);

  // Computed Cart Totals
  readonly cartCount = computed(() => {
    return this.cart().reduce((sum, item) => sum + item.quantity, 0);
  });

  readonly cartSubtotal = computed(() => {
    return this.cart().reduce((sum, item) => sum + (item.unitPrice * item.quantity), 0);
  });

  readonly cartDiscount = computed(() => {
    if (this.discountPercentage() <= 0) return 0;
    return Math.round((this.cartSubtotal() * this.discountPercentage()) / 100);
  });

  readonly cartTotal = computed(() => {
    return Math.max(0, this.cartSubtotal() - this.cartDiscount());
  });

  readonly isAdmin = computed(() => {
    const role = this.currentUser().role;
    return role === 'admin' || role === 'superadmin';
  });

  // --- Cart Operations ---
  addToCart(watch: LuxuryWatch, quantity = 1): void {
    if (watch.priceUsd === null) {
      this.openWatchQuoteModal(watch);
      return;
    }

    const currentCart = [...this.cart()];
    const index = currentCart.findIndex(item => item.watch.id === watch.id);

    if (index > -1) {
      currentCart[index].quantity += quantity;
    } else {
      currentCart.push({
        watch,
        quantity,
        unitPrice: watch.priceUsd
      });
    }

    this.cart.set(currentCart);
    this.saveToStorage('phe_cart', currentCart);
    this.showToast(`Added ${watch.brand} ${watch.model} to cart.`, 'success');
    this.cartDrawerOpen.set(true);
  }

  updateCartQuantity(watchId: string, quantity: number): void {
    if (quantity <= 0) {
      this.removeFromCart(watchId);
      return;
    }

    const updated = this.cart().map(item => {
      if (item.watch.id === watchId) {
        return { ...item, quantity };
      }
      return item;
    });

    this.cart.set(updated);
    this.saveToStorage('phe_cart', updated);
  }

  removeFromCart(watchId: string): void {
    const updated = this.cart().filter(item => item.watch.id !== watchId);
    this.cart.set(updated);
    this.saveToStorage('phe_cart', updated);
    this.showToast('Item removed from cart.', 'info');
  }

  clearCart(): void {
    this.cart.set([]);
    this.discountCode.set(null);
    this.discountPercentage.set(0);
    this.saveToStorage('phe_cart', []);
  }

  applyDiscount(code: string): { success: boolean; message: string } {
    const clean = code.trim().toUpperCase();
    if (clean === 'EXCELLENCE10') {
      this.discountCode.set(clean);
      this.discountPercentage.set(10);
      this.showToast('10% Excellence VIP Privilege code applied!', 'success');
      return { success: true, message: '10% privilege applied successfully.' };
    } else if (clean === 'PEACHYVIP') {
      this.discountCode.set(clean);
      this.discountPercentage.set(15);
      this.showToast('15% Chairman Private Circle code applied!', 'success');
      return { success: true, message: '15% privilege applied successfully.' };
    }
    this.showToast('Invalid promotional code.', 'error');
    return { success: false, message: 'Invalid code. Use EXCELLENCE10 for 10% privilege.' };
  }

  // --- Wishlist Operations ---
  toggleWishlist(watchId: string): void {
    const list = [...this.wishlist()];
    const index = list.indexOf(watchId);
    if (index > -1) {
      list.splice(index, 1);
      this.showToast('Removed from your private wishlist.', 'info');
    } else {
      list.push(watchId);
      this.showToast('Saved to your private wishlist.', 'success');
    }
    this.wishlist.set(list);
    this.saveToStorage('phe_wishlist', list);
  }

  isInWishlist(watchId: string): boolean {
    return this.wishlist().includes(watchId);
  }

  // --- Vehicle Booking Operations ---
  bookVehicle(bookingData: Omit<VehicleBooking, 'id' | 'status' | 'createdAt'>): VehicleBooking {
    const newBooking: VehicleBooking = {
      ...bookingData,
      id: `BK-CAR-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending Verification',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newBooking, ...this.vehicleBookings()];
    this.vehicleBookings.set(updated);
    this.saveToStorage('phe_car_bookings', updated);
    this.selectedCarForBooking.set(null);
    this.showToast(`Vehicle reservation request submitted for ${newBooking.vehicleName}. Verification in progress.`, 'success');
    return newBooking;
  }

  // --- Spa Reservation Operations ---
  bookSpa(reservationData: Omit<SpaReservation, 'id' | 'status' | 'createdAt'>): SpaReservation {
    const newReservation: SpaReservation = {
      ...reservationData,
      id: `RES-SPA-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'Pending',
      createdAt: new Date().toISOString().split('T')[0]
    };

    const updated = [newReservation, ...this.spaReservations()];
    this.spaReservations.set(updated);
    this.saveToStorage('phe_spa_reservations', updated);
    this.selectedSpaForBooking.set(null);
    this.showToast(`Spa appointment scheduled for ${newReservation.treatmentName}. Confirmation sent to concierge.`, 'success');
    return newReservation;
  }

  // --- Create E-Commerce Order ---
  createOrder(orderData: Omit<Order, 'id' | 'orderNumber' | 'createdAt' | 'invoiceNumber'>): Order {
    const randomId = Math.floor(1000 + Math.random() * 9000);
    const newOrder: Order = {
      ...orderData,
      id: `ord-${randomId}`,
      orderNumber: `PHE-ORD-${new Date().getFullYear()}-${randomId}`,
      invoiceNumber: `INV-PHE-${randomId}`,
      createdAt: new Date().toISOString()
    };

    const updated = [newOrder, ...this.orders()];
    this.orders.set(updated);
    this.saveToStorage('phe_orders', updated);
    this.clearCart();
    this.showToast(`Order #${newOrder.orderNumber} placed successfully. Authorized receipt generated.`, 'success');
    return newOrder;
  }

  // --- Submit Inquiry ---
  submitInquiry(inquiry: Omit<GeneralInquiry, 'id' | 'status' | 'createdAt'>): GeneralInquiry {
    const newInquiry: GeneralInquiry = {
      ...inquiry,
      id: `inq-${Math.floor(1000 + Math.random() * 9000)}`,
      status: 'New',
      createdAt: new Date().toISOString()
    };

    const updated = [newInquiry, ...this.inquiries()];
    this.inquiries.set(updated);
    this.saveToStorage('phe_inquiries', updated);
    this.showToast('Your executive enquiry has been logged with PEACHY Concierge.', 'success');
    return newInquiry;
  }

  // --- Logistics Tracking Lookup ---
  getShipmentByTrackingNumber(trackingNum: string): ShipmentRecord | undefined {
    const clean = trackingNum.trim().toUpperCase();
    return this.shipments().find(s => s.trackingNumber.toUpperCase() === clean);
  }

  // --- Admin Authentication ---
  verifyAdminPassword(password: string): boolean {
    if (password === this.adminMasterPassword()) {
      this.isAdminAuthenticated.set(true);
      this.saveToStorage('phe_admin_authed', true);
      this.currentUser.set(DEMO_USERS[1]);
      this.showToast('Superadmin credentials verified. Control panel unlocked.', 'success');
      return true;
    }
    this.showToast('Invalid security passcode. Access denied.', 'error');
    return false;
  }

  logoutAdmin(): void {
    this.isAdminAuthenticated.set(false);
    this.saveToStorage('phe_admin_authed', false);
    this.currentUser.set(DEMO_USERS[0]);
    this.showToast('Logged out of Admin Console.', 'info');
  }

  updateAdminPassword(oldPass: string, newPass: string): boolean {
    if (oldPass !== this.adminMasterPassword()) {
      this.showToast('Current security password does not match.', 'error');
      return false;
    }
    if (!newPass || newPass.length < 6) {
      this.showToast('New password must be at least 6 characters.', 'error');
      return false;
    }
    this.adminMasterPassword.set(newPass);
    this.saveToStorage('phe_admin_pwd', newPass);
    this.showToast('Admin master password successfully updated.', 'success');
    return true;
  }

  // --- Vehicles CRUD & Photos ---
  addVehicle(vehicle: LuxuryVehicle): void {
    const updated = [vehicle, ...this.vehicles()];
    this.vehicles.set(updated);
    this.saveToStorage('phe_vehicles', updated);
    this.showToast(`Vehicle "${vehicle.name}" added to executive fleet.`, 'success');
  }

  deleteVehicle(vehicleId: string): void {
    const updated = this.vehicles().filter(v => v.id !== vehicleId);
    this.vehicles.set(updated);
    this.saveToStorage('phe_vehicles', updated);
    this.showToast('Vehicle removed from fleet database.', 'info');
  }

  updateVehiclePhoto(vehicleId: string, imageUrl: string): void {
    const updated = this.vehicles().map(v => {
      if (v.id === vehicleId) {
        return { ...v, image: imageUrl };
      }
      return v;
    });
    this.vehicles.set(updated);
    this.saveToStorage('phe_vehicles', updated);
    this.showToast('Vehicle photograph updated.', 'success');
  }

  updateVehicleDetails(vehicleId: string, patch: Partial<LuxuryVehicle>): void {
    const updated = this.vehicles().map(v => {
      if (v.id === vehicleId) {
        return { ...v, ...patch };
      }
      return v;
    });
    this.vehicles.set(updated);
    this.saveToStorage('phe_vehicles', updated);
    this.showToast('Vehicle specifications saved.', 'success');
  }

  // --- Watches CRUD & Photos ---
  addWatch(watch: LuxuryWatch): void {
    const updated = [watch, ...this.watches()];
    this.watches.set(updated);
    this.saveToStorage('phe_watches', updated);
    this.showToast(`Timepiece "${watch.brand} ${watch.model}" added to catalogue.`, 'success');
  }

  deleteWatch(watchId: string): void {
    const updated = this.watches().filter(w => w.id !== watchId);
    this.watches.set(updated);
    this.saveToStorage('phe_watches', updated);
    this.showToast('Timepiece removed from catalogue.', 'info');
  }

  updateWatchPhoto(watchId: string, imageUrl: string): void {
    const updated = this.watches().map(w => {
      if (w.id === watchId) {
        return { ...w, image: imageUrl };
      }
      return w;
    });
    this.watches.set(updated);
    this.saveToStorage('phe_watches', updated);
    this.showToast('Watch image updated.', 'success');
  }

  updateWatchDetails(watchId: string, patch: Partial<LuxuryWatch>): void {
    const updated = this.watches().map(w => {
      if (w.id === watchId) {
        return { ...w, ...patch };
      }
      return w;
    });
    this.watches.set(updated);
    this.saveToStorage('phe_watches', updated);
    this.showToast('Horological details updated.', 'success');
  }

  // --- Spa Equipment & Treatments CRUD & Photos ---
  addSpaEquipment(item: SpaEquipment): void {
    const updated = [item, ...this.spaEquipment()];
    this.spaEquipment.set(updated);
    this.saveToStorage('phe_spa_equipment', updated);
    this.showToast(`Spa equipment "${item.name}" registered.`, 'success');
  }

  deleteSpaEquipment(itemId: string): void {
    const updated = this.spaEquipment().filter(e => e.id !== itemId);
    this.spaEquipment.set(updated);
    this.saveToStorage('phe_spa_equipment', updated);
    this.showToast('Spa equipment removed.', 'info');
  }

  updateSpaEquipmentPriceAndStock(itemId: string, priceUsd: number, stockCount: number, isAvailable: boolean): void {
    const updated = this.spaEquipment().map(e => {
      if (e.id === itemId) {
        return { ...e, priceUsd, stockCount, isAvailable };
      }
      return e;
    });
    this.spaEquipment.set(updated);
    this.saveToStorage('phe_spa_equipment', updated);
    this.showToast('Spa equipment pricing and stock updated.', 'success');
  }

  updateSpaEquipmentPhoto(itemId: string, imageUrl: string): void {
    const updated = this.spaEquipment().map(e => {
      if (e.id === itemId) {
        return { ...e, image: imageUrl };
      }
      return e;
    });
    this.spaEquipment.set(updated);
    this.saveToStorage('phe_spa_equipment', updated);
    this.showToast('Spa equipment photograph updated.', 'success');
  }

  updateSpaTreatmentPrice(treatmentId: string, priceUsd: number): void {
    const updated = this.spaTreatments().map(t => {
      if (t.id === treatmentId) {
        return { ...t, priceUsd };
      }
      return t;
    });
    this.spaTreatments.set(updated);
    this.saveToStorage('phe_spa_treatments', updated);
    this.showToast('Spa treatment rate updated.', 'success');
  }

  updateSpaTreatmentPhoto(treatmentId: string, imageUrl: string): void {
    const updated = this.spaTreatments().map(t => {
      if (t.id === treatmentId) {
        return { ...t, image: imageUrl };
      }
      return t;
    });
    this.spaTreatments.set(updated);
    this.saveToStorage('phe_spa_treatments', updated);
    this.showToast('Spa treatment photo updated.', 'success');
  }
  updateVehiclePrice(vehicleId: string, dailyPrice: number): void {
    const updated = this.vehicles().map(v => {
      if (v.id === vehicleId) {
        return {
          ...v,
          dailyPrice,
          weeklyPrice: dailyPrice * 6,
          monthlyPrice: dailyPrice * 22
        };
      }
      return v;
    });
    this.vehicles.set(updated);
    this.saveToStorage('phe_vehicles', updated);
    this.showToast('Vehicle rental rate updated successfully.', 'success');
  }

  toggleVehicleStatus(vehicleId: string): void {
    const updated = this.vehicles().map(v => {
      if (v.id === vehicleId) {
        const nextStatus = v.status === 'Available' ? 'Reserved' : 'Available';
        return { ...v, status: nextStatus as 'Available' | 'Reserved' };
      }
      return v;
    });
    this.vehicles.set(updated);
    this.saveToStorage('phe_vehicles', updated);
  }

  updateVehicleBookingStatus(bookingId: string, status: VehicleBooking['status']): void {
    const updated = this.vehicleBookings().map(b => {
      if (b.id === bookingId) {
        return { ...b, status };
      }
      return b;
    });
    this.vehicleBookings.set(updated);
    this.saveToStorage('phe_car_bookings', updated);
    this.showToast(`Booking ${bookingId} status updated to ${status}.`, 'info');
  }

  updateWatchPrice(watchId: string, priceUsd: number): void {
    const updated = this.watches().map(w => {
      if (w.id === watchId) {
        return { ...w, priceUsd };
      }
      return w;
    });
    this.watches.set(updated);
    this.saveToStorage('phe_watches', updated);
    this.showToast('Horological valuation updated.', 'success');
  }

  updateWatchStock(watchId: string, delta: number): void {
    const updated = this.watches().map(w => {
      if (w.id === watchId) {
        const newStock = Math.max(0, w.stockCount + delta);
        return { ...w, stockCount: newStock, isAvailable: newStock > 0 };
      }
      return w;
    });
    this.watches.set(updated);
    this.saveToStorage('phe_watches', updated);
  }

  updateSpaReservationStatus(reservationId: string, status: SpaReservation['status']): void {
    const updated = this.spaReservations().map(r => {
      if (r.id === reservationId) {
        return { ...r, status };
      }
      return r;
    });
    this.spaReservations.set(updated);
    this.saveToStorage('phe_spa_reservations', updated);
    this.showToast(`Spa reservation ${reservationId} updated to ${status}.`, 'info');
  }

  updateShipmentStage(trackingNumber: string, nextStage: TrackingStage, location: string, notes: string): void {
    const STAGES: TrackingStage[] = [
      'Shipment received',
      'Pickup scheduled',
      'Collected',
      'In transit',
      'At distribution centre',
      'Out for delivery',
      'Delivered'
    ];

    const updated = this.shipments().map(s => {
      if (s.trackingNumber === trackingNumber) {
        const nextIndex = STAGES.indexOf(nextStage);
        const newHistory = [
          ...s.history,
          {
            stage: nextStage,
            location,
            timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) + ' - ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
            notes
          }
        ];
        return {
          ...s,
          currentStage: nextStage,
          currentStageIndex: nextIndex,
          status: (nextStage === 'Delivered' ? 'Delivered' : 'Active') as ShipmentRecord['status'],
          history: newHistory
        };
      }
      return s;
    });

    this.shipments.set(updated);
    this.saveToStorage('phe_shipments', updated);
    this.showToast(`Tracking status updated for ${trackingNumber}: ${nextStage}`, 'success');
  }

  updateInquiryStatus(inquiryId: string, status: GeneralInquiry['status']): void {
    const updated = this.inquiries().map(i => {
      if (i.id === inquiryId) {
        return { ...i, status };
      }
      return i;
    });
    this.inquiries.set(updated);
    this.saveToStorage('phe_inquiries', updated);
  }

  // --- Switch User Role (Demo Switcher) ---
  switchUser(role: 'customer' | 'admin'): void {
    if (role === 'admin') {
      this.currentUser.set(DEMO_USERS[1]);
      this.showToast('Switched to Director of Operations (Administrator Account)', 'info');
    } else {
      this.currentUser.set(DEMO_USERS[0]);
      this.showToast('Switched to Chief Emeka Sterling (VIP Customer Account)', 'info');
    }
  }

  // --- Modal Helpers ---
  openCarBookingModal(car: LuxuryVehicle): void {
    this.selectedCarForBooking.set(car);
  }

  closeCarBookingModal(): void {
    this.selectedCarForBooking.set(null);
  }

  openSpaBookingModal(spa: SpaTreatment): void {
    this.selectedSpaForBooking.set(spa);
  }

  closeSpaBookingModal(): void {
    this.selectedSpaForBooking.set(null);
  }

  openWatchQuickView(watch: LuxuryWatch): void {
    this.selectedWatchQuickView.set(watch);
  }

  closeWatchQuickView(): void {
    this.selectedWatchQuickView.set(null);
  }

  openWatchQuoteModal(watch: LuxuryWatch): void {
    this.selectedWatchForQuote.set(watch);
  }

  closeWatchQuoteModal(): void {
    this.selectedWatchForQuote.set(null);
  }

  // Toast Notifications
  showToast(text: string, type: 'success' | 'info' | 'error' = 'info'): void {
    this.toastMessage.set({ text, type });
    setTimeout(() => {
      if (this.toastMessage()?.text === text) {
        this.toastMessage.set(null);
      }
    }, 4500);
  }

  dismissToast(): void {
    this.toastMessage.set(null);
  }

  // LocalStorage Helper
  private loadFromStorage<T>(key: string, fallback: T): T {
    if (typeof window === 'undefined') return fallback;
    try {
      const data = localStorage.getItem(key);
      return data ? JSON.parse(data) : fallback;
    } catch {
      return fallback;
    }
  }

  private saveToStorage(key: string, value: unknown): void {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      // Ignore quota errors
    }
  }
}
