export interface LuxuryVehicle {
  id: string;
  name: string;
  manufacturer: string;
  modelYear: number;
  image: string;
  dailyPrice: number | null; // null means Request a Quote
  weeklyPrice: number | null;
  monthlyPrice: number | null;
  seats: number;
  transmission: 'Automatic' | 'Dual-Clutch' | 'Sequential';
  fuelType: 'V12 Petrol' | 'V8 Twin-Turbo' | 'W16 Quad-Turbo' | 'Hybrid V8' | 'V16 Hybrid' | 'V6 Twin-Turbo Hybrid';
  chauffeurAvailable: boolean;
  description: string;
  status: 'Available' | 'Reserved' | 'In Maintenance';
  features: string[];
  isSamplePrice: boolean;
}

export interface VehicleBooking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  vehicleImage: string;
  pickupLocation: string;
  destination: string;
  pickupDate: string;
  returnDate: string;
  driveType: 'self-drive' | 'chauffeur';
  customerName: string;
  email: string;
  phone: string;
  additionalRequirements?: string;
  dailyRate: number | null;
  estimatedTotal: number | null;
  status: 'Pending Verification' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface LuxuryWatch {
  id: string;
  brand: string;
  model: string;
  referenceNumber: string;
  movementType: 'Automatic' | 'Manual Wind' | 'Quartz' | 'Spring Drive' | 'Automatic Tourbillon' | 'Manual Tourbillon' | 'Automatic Chronograph';
  caseMaterial: string;
  caseSize: string;
  waterResistance: string;
  powerReserve: string;
  condition: 'Brand New' | 'Pre-Owned (Mint)' | 'Pre-Owned (Excellent)' | 'Unworn Collector Piece';
  priceUsd: number | null; // null = Request a Quote
  priceNote?: string;
  description: string;
  image: string;
  isAvailable: boolean;
  category: 'Complications' | 'Sports & Diver' | 'Dress & Heritage' | 'Chronograph' | 'Haute Horlogerie';
  gender: 'Men' | 'Unisex' | 'Women';
  isFeatured?: boolean;
  stockCount: number;
  rating: number;
  reviewsCount: number;
}

export interface WatchReview {
  id: string;
  watchId: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verifiedBuyer: boolean;
}

export interface SpaSpace {
  id: number;
  name: string;
  subtitle: string;
  description: string;
  image: string;
}

export interface SpaTreatment {
  id: string;
  name: string;
  category: 'Massage' | 'Facial & Skincare' | 'Hydro & Thermal' | 'Holistic & Packages' | 'Grooming & Finishing';
  durationMinutes: number;
  priceUsd: number;
  description: string;
  image: string;
  includes: string[];
}

export interface SpaEquipment {
  id: string;
  name: string;
  category: 'Hydrotherapy & Pools' | 'Cryo & Thermal Saunas' | 'Facial & Laser Devices' | 'Aromatherapy & Sensory' | 'Massage Loungers';
  manufacturer: string;
  model: string;
  priceUsd: number;
  description: string;
  image: string;
  isAvailable: boolean;
  warrantyYears: number;
  stockCount: number;
}

export interface SpaReservation {
  id: string;
  treatmentId: string;
  treatmentName: string;
  date: string;
  time: string;
  durationMinutes: number;
  therapistPreference: 'Any Senior Therapist' | 'Female Specialist' | 'Male Specialist' | 'Master Wellness Director';
  guestType: 'Individual' | 'Couples';
  customerName: string;
  email: string;
  phone: string;
  specialRequirements?: string;
  price: number;
  paymentStatus: 'Pending Verification' | 'Deposit Paid' | 'Paid in Full' | 'Pay at Spa Reception';
  status: 'Pending' | 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
}

export interface LogisticsService {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  image: string;
}

export type TrackingStage = 
  | 'Shipment received'
  | 'Pickup scheduled'
  | 'Collected'
  | 'In transit'
  | 'At distribution centre'
  | 'Out for delivery'
  | 'Delivered';

export interface TrackingEvent {
  stage: TrackingStage;
  location: string;
  timestamp: string;
  notes: string;
}

export interface ShipmentRecord {
  trackingNumber: string;
  sender: string;
  recipient: string;
  origin: string;
  destination: string;
  serviceType: string;
  weightKg: number;
  declaredValueUsd: number;
  currentStage: TrackingStage;
  currentStageIndex: number;
  estimatedDelivery: string;
  history: TrackingEvent[];
  status: 'Active' | 'Delivered' | 'On Hold' | 'Exception';
}

export interface DigitalAssetInfo {
  symbol: string;
  name: string;
  priceUsd: number;
  change24h: number;
  marketCapUsd: string;
  volume24hUsd: string;
  high24h: number;
  low24h: number;
  description: string;
  lastUpdated: string;
  circulatingSupply: string;
}

export interface ConciergeService {
  id: string;
  title: string;
  category: string;
  description: string;
  image: string;
  offerings: string[];
}

export interface UserAccount {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  role: 'customer' | 'staff' | 'admin' | 'superadmin';
  tier: 'Silver Executive' | 'Gold Prestige' | 'Platinum Ambassador' | 'Chairman Private Circle';
  joinedDate: string;
  preferredCurrency: 'USD' | 'EUR' | 'GBP' | 'NGN';
}

export interface CartItem {
  watch: LuxuryWatch;
  quantity: number;
  unitPrice: number;
}

export interface OrderItem {
  watchId: string;
  brand: string;
  model: string;
  referenceNumber: string;
  image: string;
  quantity: number;
  unitPrice: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  items: OrderItem[];
  subtotal: number;
  discountAmount: number;
  discountCode?: string;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: 'stripe-card' | 'bank-wire' | 'flutterwave-nigeria' | 'concierge-invoice';
  paymentStatus: 'Payment Pending' | 'Authorized' | 'Settled' | 'Verification Required';
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    country: string;
    postalCode: string;
    phone: string;
  };
  customerEmail: string;
  customerName: string;
  createdAt: string;
  invoiceNumber: string;
}

export interface GeneralInquiry {
  id: string;
  division: 'General' | 'Luxury Cars' | 'Watches' | 'Spa & Wellness' | 'Logistics' | 'Digital Assets' | 'Concierge';
  subject: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'New' | 'In Review' | 'Contacted' | 'Closed';
  createdAt: string;
}
