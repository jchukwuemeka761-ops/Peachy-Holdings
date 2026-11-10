import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { EnterpriseStateService } from '../../services/enterprise-state.service';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { TrackingStage, VehicleBooking, SpaReservation, GeneralInquiry, LuxuryVehicle, LuxuryWatch, SpaEquipment } from '../../models/enterprise.models';

@Component({
  selector: 'app-admin',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, ReactiveFormsModule, SlicePipe],
  templateUrl: './admin.html'
})
export class Admin {
  readonly state = inject(EnterpriseStateService);

  readonly currentTab = signal<'overview' | 'vehicles' | 'watches' | 'spa' | 'equipment' | 'logistics' | 'inquiries' | 'security'>('overview');

  // Admin Login Security Form
  readonly loginForm = new FormGroup({
    password: new FormControl('', Validators.required)
  });
  readonly showPassword = signal(false);

  // Admin Change Password Form
  readonly changePasswordForm = new FormGroup({
    oldPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', [Validators.required, Validators.minLength(6)])
  });

  // Modal State for Photo Editing / Uploading
  readonly photoModalOpen = signal(false);
  readonly photoTargetType = signal<'vehicle' | 'watch' | 'spa-treatment' | 'spa-equipment' | null>(null);
  readonly photoTargetId = signal<string | null>(null);
  readonly photoTargetTitle = signal<string>('');
  readonly currentPhotoUrl = signal<string>('');
  readonly newPhotoUrlInput = new FormControl('');

  // Add Vehicle Form
  readonly showAddVehicleModal = signal(false);
  readonly newVehicleForm = new FormGroup({
    name: new FormControl('', Validators.required),
    manufacturer: new FormControl('', Validators.required),
    modelYear: new FormControl(2025, Validators.required),
    image: new FormControl('/images/fleet_luxury_cars.jpg', Validators.required),
    dailyPrice: new FormControl(1200, Validators.required),
    seats: new FormControl(4, Validators.required),
    transmission: new FormControl<'Automatic' | 'Dual-Clutch' | 'Sequential'>('Automatic', Validators.required),
    fuelType: new FormControl<'V12 Petrol' | 'V8 Twin-Turbo' | 'W16 Quad-Turbo' | 'Hybrid V8' | 'V16 Hybrid' | 'V6 Twin-Turbo Hybrid'>('V8 Twin-Turbo', Validators.required),
    chauffeurAvailable: new FormControl(true),
    description: new FormControl('', Validators.required)
  });

  // Add Watch Form
  readonly showAddWatchModal = signal(false);
  readonly newWatchForm = new FormGroup({
    brand: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    referenceNumber: new FormControl('', Validators.required),
    movementType: new FormControl<'Automatic' | 'Manual Wind' | 'Quartz' | 'Spring Drive' | 'Automatic Tourbillon' | 'Manual Tourbillon' | 'Automatic Chronograph'>('Automatic Tourbillon', Validators.required),
    caseMaterial: new FormControl('Grade 5 Titanium & Sapphire', Validators.required),
    caseSize: new FormControl('44mm', Validators.required),
    priceUsd: new FormControl(85000, Validators.required),
    stockCount: new FormControl(2, Validators.required),
    image: new FormControl('/images/richard_mille_vault.jpg', Validators.required),
    condition: new FormControl<'Brand New' | 'Pre-Owned (Mint)' | 'Pre-Owned (Excellent)' | 'Unworn Collector Piece'>('Brand New', Validators.required),
    category: new FormControl<'Complications' | 'Sports & Diver' | 'Dress & Heritage' | 'Chronograph' | 'Haute Horlogerie'>('Haute Horlogerie', Validators.required),
    description: new FormControl('', Validators.required)
  });

  // Add Spa Equipment Form
  readonly showAddEquipmentModal = signal(false);
  readonly newEquipmentForm = new FormGroup({
    name: new FormControl('', Validators.required),
    category: new FormControl<'Hydrotherapy & Pools' | 'Cryo & Thermal Saunas' | 'Facial & Laser Devices' | 'Aromatherapy & Sensory' | 'Massage Loungers'>('Hydrotherapy & Pools', Validators.required),
    manufacturer: new FormControl('', Validators.required),
    model: new FormControl('', Validators.required),
    priceUsd: new FormControl(35000, Validators.required),
    stockCount: new FormControl(3, Validators.required),
    warrantyYears: new FormControl(3, Validators.required),
    image: new FormControl('/images/spa_sanctuary.jpg', Validators.required),
    description: new FormControl('', Validators.required)
  });

  // Shipment Update Form
  readonly updateShipmentForm = new FormGroup({
    trackingNumber: new FormControl('', Validators.required),
    stage: new FormControl<TrackingStage>('In transit', Validators.required),
    location: new FormControl('', Validators.required),
    notes: new FormControl('', Validators.required)
  });

  // Create Shipment Form
  readonly createShipmentForm = new FormGroup({
    trackingNumber: new FormControl(`PHE-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(100 + Math.random() * 900)}`, Validators.required),
    sender: new FormControl('Peachy Vault, Zurich', Validators.required),
    recipient: new FormControl('', Validators.required),
    origin: new FormControl('Zurich (ZRH)', Validators.required),
    destination: new FormControl('Umuahia, Abia State', Validators.required),
    serviceType: new FormControl('Armored High-Value Priority Air', Validators.required),
    weightKg: new FormControl(3.5, Validators.required),
    declaredValueUsd: new FormControl(55000, Validators.required)
  });

  readonly ALL_STAGES: TrackingStage[] = [
    'Shipment received',
    'Pickup scheduled',
    'Collected',
    'In transit',
    'At distribution centre',
    'Out for delivery',
    'Delivered'
  ];

  // --- Login Handling ---
  submitLogin(): void {
    const password = this.loginForm.value.password || '';
    if (this.state.verifyAdminPassword(password)) {
      this.loginForm.reset();
    }
  }

  logout(): void {
    this.state.logoutAdmin();
  }

  submitPasswordChange(): void {
    if (this.changePasswordForm.invalid) return;
    const oldP = this.changePasswordForm.value.oldPassword || '';
    const newP = this.changePasswordForm.value.newPassword || '';
    if (this.state.updateAdminPassword(oldP, newP)) {
      this.changePasswordForm.reset();
    }
  }

  // --- Photo Upload & Change Modal ---
  openPhotoEditor(type: 'vehicle' | 'watch' | 'spa-treatment' | 'spa-equipment', id: string, title: string, currentImage: string): void {
    this.photoTargetType.set(type);
    this.photoTargetId.set(id);
    this.photoTargetTitle.set(title);
    this.currentPhotoUrl.set(currentImage);
    this.newPhotoUrlInput.setValue(currentImage);
    this.photoModalOpen.set(true);
  }

  closePhotoEditor(): void {
    this.photoModalOpen.set(false);
    this.photoTargetId.set(null);
  }

  savePhotoChange(): void {
    const id = this.photoTargetId();
    const type = this.photoTargetType();
    const newUrl = this.newPhotoUrlInput.value?.trim();
    if (!id || !type || !newUrl) return;

    if (type === 'vehicle') {
      this.state.updateVehiclePhoto(id, newUrl);
    } else if (type === 'watch') {
      this.state.updateWatchPhoto(id, newUrl);
    } else if (type === 'spa-equipment') {
      this.state.updateSpaEquipmentPhoto(id, newUrl);
    } else if (type === 'spa-treatment') {
      this.state.updateSpaTreatmentPhoto(id, newUrl);
    }

    this.closePhotoEditor();
  }

  deleteCurrentPhoto(): void {
    const fallbackImage = '/images/hero_holding.jpg';
    this.newPhotoUrlInput.setValue(fallbackImage);
    this.savePhotoChange();
  }

  // Handle local file upload preview (converts file to data URL for immediate client-side rendering)
  handleFileUpload(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        if (result) {
          this.newPhotoUrlInput.setValue(result);
        }
      };
      reader.readAsDataURL(file);
    }
  }

  // --- Vehicle Management ---
  updateCarPrice(vehicleId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const price = Number(input.value);
    if (!isNaN(price) && price > 0) {
      this.state.updateVehiclePrice(vehicleId, price);
    }
  }

  toggleCarAvailability(vehicleId: string): void {
    this.state.toggleVehicleStatus(vehicleId);
  }

  deleteCar(carId: string): void {
    if (confirm('Are you certain you wish to delete this vehicle from the executive fleet?')) {
      this.state.deleteVehicle(carId);
    }
  }

  submitNewVehicle(): void {
    if (this.newVehicleForm.invalid) return;
    const val = this.newVehicleForm.value;
    const daily = Number(val.dailyPrice) || 1000;
    const vehicle: LuxuryVehicle = {
      id: `car-custom-${Date.now()}`,
      name: val.name || '',
      manufacturer: val.manufacturer || '',
      modelYear: Number(val.modelYear) || 2025,
      image: val.image || '/images/fleet_luxury_cars.jpg',
      dailyPrice: daily,
      weeklyPrice: daily * 6,
      monthlyPrice: daily * 22,
      seats: Number(val.seats) || 4,
      transmission: val.transmission || 'Automatic',
      fuelType: val.fuelType || 'V8 Twin-Turbo',
      chauffeurAvailable: val.chauffeurAvailable ?? true,
      description: val.description || 'Exclusive executive transport curated by Peachy Holding Enterprise.',
      status: 'Available',
      features: ['Executive Diplomatic Escort Ready', 'Comprehensive Insurance', 'Chauffeured White-Glove Handover'],
      isSamplePrice: true
    };

    this.state.addVehicle(vehicle);
    this.showAddVehicleModal.set(false);
    this.newVehicleForm.reset({
      modelYear: 2025,
      image: '/images/fleet_luxury_cars.jpg',
      dailyPrice: 1200,
      seats: 4,
      transmission: 'Automatic',
      fuelType: 'V8 Twin-Turbo',
      chauffeurAvailable: true
    });
  }

  setCarBookingStatus(id: string, status: VehicleBooking['status']): void {
    this.state.updateVehicleBookingStatus(id, status);
  }

  // --- Watches Management ---
  updateWatchPrice(watchId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const price = Number(input.value);
    if (!isNaN(price) && price > 0) {
      this.state.updateWatchPrice(watchId, price);
    }
  }

  adjustWatchStock(watchId: string, delta: number): void {
    this.state.updateWatchStock(watchId, delta);
  }

  deleteWatch(watchId: string): void {
    if (confirm('Are you certain you wish to delete this timepiece from the inventory catalogue?')) {
      this.state.deleteWatch(watchId);
    }
  }

  submitNewWatch(): void {
    if (this.newWatchForm.invalid) return;
    const val = this.newWatchForm.value;
    const watch: LuxuryWatch = {
      id: `watch-custom-${Date.now()}`,
      brand: val.brand || '',
      model: val.model || '',
      referenceNumber: val.referenceNumber || '',
      movementType: val.movementType || 'Automatic Tourbillon',
      caseMaterial: val.caseMaterial || 'Titanium & Sapphire',
      caseSize: val.caseSize || '44mm',
      waterResistance: '50m / 5 ATM',
      powerReserve: '70 Hours',
      condition: val.condition || 'Brand New',
      priceUsd: Number(val.priceUsd) || 50000,
      description: val.description || 'Rare haute horlogerie acquisition verified by master horologists.',
      image: val.image || '/images/richard_mille_vault.jpg',
      isAvailable: true,
      category: val.category || 'Haute Horlogerie',
      gender: 'Unisex',
      stockCount: Number(val.stockCount) || 1,
      rating: 5.0,
      reviewsCount: 1
    };

    this.state.addWatch(watch);
    this.showAddWatchModal.set(false);
    this.newWatchForm.reset({
      movementType: 'Automatic Tourbillon',
      caseMaterial: 'Grade 5 Titanium & Sapphire',
      caseSize: '44mm',
      priceUsd: 85000,
      stockCount: 2,
      image: '/images/richard_mille_vault.jpg',
      condition: 'Brand New',
      category: 'Haute Horlogerie'
    });
  }

  // --- Spa Sanctuary & Equipment Management ---
  setSpaReservationStatus(id: string, status: SpaReservation['status']): void {
    this.state.updateSpaReservationStatus(id, status);
  }

  updateSpaEquipmentPrice(eqId: string, event: Event): void {
    const input = event.target as HTMLInputElement;
    const price = Number(input.value);
    if (!isNaN(price) && price > 0) {
      const item = this.state.spaEquipment().find(e => e.id === eqId);
      if (item) {
        this.state.updateSpaEquipmentPriceAndStock(eqId, price, item.stockCount, item.isAvailable);
      }
    }
  }

  adjustSpaEquipmentStock(eqId: string, delta: number): void {
    const item = this.state.spaEquipment().find(e => e.id === eqId);
    if (item) {
      const newStock = Math.max(0, item.stockCount + delta);
      this.state.updateSpaEquipmentPriceAndStock(eqId, item.priceUsd, newStock, newStock > 0);
    }
  }

  deleteEquipment(eqId: string): void {
    if (confirm('Delete this spa equipment from catalogue?')) {
      this.state.deleteSpaEquipment(eqId);
    }
  }

  submitNewEquipment(): void {
    if (this.newEquipmentForm.invalid) return;
    const val = this.newEquipmentForm.value;
    const equipment: SpaEquipment = {
      id: `eq-custom-${Date.now()}`,
      name: val.name || '',
      category: val.category || 'Hydrotherapy & Pools',
      manufacturer: val.manufacturer || '',
      model: val.model || '',
      priceUsd: Number(val.priceUsd) || 25000,
      description: val.description || 'Clinical-grade luxury wellness technology.',
      image: val.image || '/images/spa_sanctuary.jpg',
      isAvailable: true,
      warrantyYears: Number(val.warrantyYears) || 3,
      stockCount: Number(val.stockCount) || 1
    };

    this.state.addSpaEquipment(equipment);
    this.showAddEquipmentModal.set(false);
    this.newEquipmentForm.reset({
      category: 'Hydrotherapy & Pools',
      priceUsd: 35000,
      stockCount: 3,
      warrantyYears: 3,
      image: '/images/spa_sanctuary.jpg'
    });
  }

  // --- Shipments & Inquiries ---
  submitShipmentStageUpdate(): void {
    if (this.updateShipmentForm.invalid) return;
    const val = this.updateShipmentForm.value;
    if (val.trackingNumber && val.stage && val.location && val.notes) {
      this.state.updateShipmentStage(val.trackingNumber, val.stage, val.location, val.notes);
      this.updateShipmentForm.reset();
    }
  }

  submitCreateShipment(): void {
    if (this.createShipmentForm.invalid) return;
    const val = this.createShipmentForm.value;
    const newShipment = {
      trackingNumber: val.trackingNumber || '',
      sender: val.sender || '',
      recipient: val.recipient || '',
      origin: val.origin || '',
      destination: val.destination || '',
      serviceType: val.serviceType || 'Armored High-Value Priority Air',
      weightKg: Number(val.weightKg) || 1,
      declaredValueUsd: Number(val.declaredValueUsd) || 0,
      currentStage: 'Shipment received' as TrackingStage,
      currentStageIndex: 0,
      estimatedDelivery: '3 Business Days',
      status: 'Active' as const,
      history: [
        {
          stage: 'Shipment received' as TrackingStage,
          location: val.origin || 'Dispatch Vault',
          timestamp: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }) + ' - ' + new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
          notes: 'Shipment created and security verified in administrative system.'
        }
      ]
    };

    const updated = [newShipment, ...this.state.shipments()];
    this.state.shipments.set(updated);
    this.state.showToast(`Shipment ${newShipment.trackingNumber} generated successfully.`, 'success');
    this.createShipmentForm.reset({
      trackingNumber: `PHE-${Math.floor(1000 + Math.random() * 9000)}-${Math.floor(100 + Math.random() * 900)}`,
      sender: 'Peachy Vault, Zurich',
      origin: 'Zurich (ZRH)',
      destination: 'Umuahia, Abia State',
      serviceType: 'Armored High-Value Priority Air',
      weightKg: 3.5,
      declaredValueUsd: 55000
    });
  }

  updateInquiryStatus(id: string, status: GeneralInquiry['status']): void {
    this.state.updateInquiryStatus(id, status);
  }
}
