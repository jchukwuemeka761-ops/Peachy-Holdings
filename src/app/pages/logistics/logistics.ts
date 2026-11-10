import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { EnterpriseStateService } from '../../services/enterprise-state.service';
import { LOGISTICS_SERVICES } from '../../data/enterprise.data';
import { ShipmentRecord, TrackingStage } from '../../models/enterprise.models';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-logistics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './logistics.html'
})
export class Logistics {
  readonly state = inject(EnterpriseStateService);
  readonly services = LOGISTICS_SERVICES;

  readonly trackingInput = new FormControl('PHE-8827-010');
  readonly searchedShipment = signal<ShipmentRecord | null>(null);
  readonly trackingError = signal<string | null>(null);

  readonly quoteForm = new FormGroup({
    collectionAddress: new FormControl('', Validators.required),
    deliveryAddress: new FormControl('', Validators.required),
    packageDescription: new FormControl('', Validators.required),
    weightKg: new FormControl(5, [Validators.required, Validators.min(0.1)]),
    lengthCm: new FormControl(30),
    widthCm: new FormControl(25),
    heightCm: new FormControl(20),
    speed: new FormControl<'Diplomatic Same-Day' | 'Armored Priority Air (24-48h)' | 'Standard International Air' | 'Ocean Container Freight'>('Armored Priority Air (24-48h)', Validators.required),
    fullName: new FormControl(this.state.currentUser().fullName, Validators.required),
    email: new FormControl(this.state.currentUser().email, [Validators.required, Validators.email]),
    phone: new FormControl(this.state.currentUser().phone, Validators.required),
    instructions: new FormControl('')
  });

  readonly quoteEstimateUsd = signal<number | null>(null);
  readonly quoteSubmitted = signal(false);

  readonly ALL_STAGES: TrackingStage[] = [
    'Shipment received',
    'Pickup scheduled',
    'Collected',
    'In transit',
    'At distribution centre',
    'Out for delivery',
    'Delivered'
  ];

  constructor() {
    // Pre-populate with first sample shipment so user immediately sees live tracking
    this.searchedShipment.set(this.state.shipments()[0]);
  }

  searchTracking(): void {
    const code = this.trackingInput.value?.trim();
    if (!code) return;

    const result = this.state.getShipmentByTrackingNumber(code);
    if (result) {
      this.searchedShipment.set(result);
      this.trackingError.set(null);
    } else {
      this.searchedShipment.set(null);
      this.trackingError.set(`No verified shipment record found for tracking code "${code}". Please verify the number with your dispatch officer or test with sample codes PHE-8827-010 or PHE-4391-772.`);
    }
  }

  calculateEstimate(): void {
    const weight = Number(this.quoteForm.value.weightKg) || 1;
    const speed = this.quoteForm.value.speed;
    let baseRate = 80;
    if (speed === 'Diplomatic Same-Day') baseRate = 350;
    else if (speed === 'Armored Priority Air (24-48h)') baseRate = 220;
    else if (speed === 'Standard International Air') baseRate = 120;
    else if (speed === 'Ocean Container Freight') baseRate = 60;

    const total = Math.round(baseRate + (weight * 14.5));
    this.quoteEstimateUsd.set(total);
  }

  submitQuote(): void {
    if (this.quoteForm.invalid) return;

    this.calculateEstimate();
    const val = this.quoteForm.value;

    this.state.submitInquiry({
      division: 'Logistics',
      subject: `Freight Quotation Request: ${val.collectionAddress} -> ${val.deliveryAddress} (${val.weightKg} kg)`,
      name: val.fullName || '',
      email: val.email || '',
      phone: val.phone || '',
      message: `Package Description: ${val.packageDescription}. Delivery Speed: ${val.speed}. Estimated Rate: $${this.quoteEstimateUsd()}. Instructions: ${val.instructions || 'Standard luxury handling'}.`
    });

    this.quoteSubmitted.set(true);
    this.state.showToast('Freight quotation submitted. An enterprise logistics officer will respond with formal customs rate.', 'success');
  }
}
