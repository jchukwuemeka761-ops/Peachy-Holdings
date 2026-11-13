export interface LuxuryVehicle {
  id: string;
  name: string;
  manufacturer: string;
  segment: 'BMW' | 'Competition' | 'Toyota Prado' | 'Lexus IS 350' | 'Mercedes-Benz' | 'Rolls-Royce' | 'Lamborghini';
  modelYear: number;
  image: string;
  dailyPrice: number;
  weeklyPrice: number;
  monthlyPrice: number;
  seats: number;
  engine: string;
  horsepower: string;
  zeroToHundred: string;
  transmission: string;
  fuelType: string;
  chauffeurAvailable: boolean;
  description: string;
  status: 'Available' | 'Reserved' | 'Maintenance';
  features: string[];
}

export interface LuxuryWatch {
  id: string;
  brand: 'Richard Mille' | 'Rolex' | 'Audemars Piguet' | 'Alexander McQueen' | 'Patek Philippe' | 'Vacheron Constantin' | 'Omega' | 'Casio G-Shock' | 'Casio' | 'Peachy Geneva Atelier';
  model: string;
  referenceNumber: string;
  category: 'Haute Horlogerie' | 'Mechanical' | 'Sport & Diver' | 'Chronograph' | 'Tactical & Shock' | 'Complications';
  movementType: 'Automatic' | 'Manual Wind' | 'Tourbillon' | 'Solar Quartz';
  calibre: string;
  caseMaterial: string;
  caseDiameterMm: number;
  dialColor: string;
  braceletStrap: string;
  waterResistance: string;
  powerReserve: string;
  year: number;
  condition: 'Brand New' | 'Unworn / Box & Papers' | 'Collectible Mint';
  warranty: string;
  priceNgn: number;
  stockCount: number;
  rating: number;
  image: string;
  description: string;
  specifications: string[];
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
  category: 'Massage' | 'Facial & Skincare' | 'Hydro & Thermal' | 'Holistic & Packages';
  durationMinutes: number;
  priceNgn: number;
  description: string;
  image: string;
  includes: string[];
}

export interface SpaEquipment {
  id: string;
  name: string;
  category: string;
  manufacturer: string;
  model: string;
  priceNgn: number;
  description: string;
  image: string;
  isAvailable: boolean;
  warrantyYears: number;
  stockCount: number;
}

export interface LogisticsService {
  id: string;
  title: string;
  description: string;
  features: string[];
  image: string;
}

export interface ShipmentHistoryEvent {
  stage: string;
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
  declaredValueNgn: number;
  currentStage: string;
  currentStageIndex: number;
  estimatedDelivery: string;
  history: ShipmentHistoryEvent[];
  status: 'Active' | 'Delivered';
}

export interface DigitalAssetInfo {
  symbol: string;
  name: string;
  priceNgn: number;
  change24h: number;
  marketCapNgn: string;
  volume24hNgn: string;
  high24hNgn: number;
  low24hNgn: number;
  description: string;
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
  role: 'customer' | 'superadmin';
  tier: string;
  joinedDate: string;
  preferredCurrency: 'NGN';
}

export interface CartItem {
  watch: LuxuryWatch;
  quantity: number;
  unitPrice: number;
}

export interface VehicleBooking {
  id: string;
  vehicleId: string;
  vehicleName: string;
  vehicleImage: string;
  customerName: string;
  customerPhone: string;
  pickupLocation: string;
  destination: string;
  pickupDate: string;
  returnDate: string;
  driveType: 'chauffeur' | 'self-drive';
  estimatedTotal: number;
  status: 'Confirmed' | 'Pending Verification' | 'Cancelled';
  createdAt: string;
}

export interface SpaReservation {
  id: string;
  treatmentId: string;
  treatmentName: string;
  treatmentImage: string;
  customerName: string;
  customerPhone: string;
  date: string;
  timeSlot: string;
  guests: number;
  priceNgn: number;
  status: 'Confirmed' | 'Pending' | 'Cancelled';
  notes: string;
  createdAt: string;
}

export interface OrderItem {
  watchId: string;
  brand: string;
  model: string;
  referenceNumber: string;
  quantity: number;
  unitPriceNgn: number;
}

export interface Order {
  id: string;
  invoiceNumber: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    country: string;
    phone: string;
  };
  items: OrderItem[];
  subtotalNgn: number;
  discountNgn: number;
  totalNgn: number;
  paymentMethod: string;
  paymentStatus: 'Escrow Verified' | 'Paid';
  createdAt: string;
}

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  phone: string;
  division: string;
  message: string;
  status: 'Open' | 'Resolved';
  createdAt: string;
}

export type ModalState =
  | { type: 'car'; vehicle: LuxuryVehicle }
  | { type: 'spa'; treatment: SpaTreatment }
  | { type: 'watch'; watch: LuxuryWatch }
  | null;
