import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { EnterpriseStateService } from '../../services/enterprise-state.service';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-booking-modals',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './booking-modals.html'
})
export class BookingModals {
  readonly state = inject(EnterpriseStateService);

  readonly carBookingForm = new FormGroup({
    pickupLocation: new FormControl('', Validators.required),
    destination: new FormControl('', Validators.required),
    pickupDate: new FormControl('', Validators.required),
    returnDate: new FormControl('', Validators.required),
    driveType: new FormControl<'self-drive' | 'chauffeur'>('chauffeur', Validators.required),
    customerName: new FormControl(this.state.currentUser().fullName, Validators.required),
    email: new FormControl(this.state.currentUser().email, [Validators.required, Validators.email]),
    phone: new FormControl(this.state.currentUser().phone, Validators.required),
    additionalRequirements: new FormControl('')
  });

  readonly spaBookingForm = new FormGroup({
    date: new FormControl('', Validators.required),
    time: new FormControl('11:00', Validators.required),
    therapistPreference: new FormControl<'Any Senior Therapist' | 'Female Specialist' | 'Male Specialist' | 'Master Wellness Director'>('Any Senior Therapist', Validators.required),
    guestType: new FormControl<'Individual' | 'Couples'>('Individual', Validators.required),
    customerName: new FormControl(this.state.currentUser().fullName, Validators.required),
    email: new FormControl(this.state.currentUser().email, [Validators.required, Validators.email]),
    phone: new FormControl(this.state.currentUser().phone, Validators.required),
    specialRequirements: new FormControl('')
  });

  readonly quoteForm = new FormGroup({
    name: new FormControl(this.state.currentUser().fullName, Validators.required),
    email: new FormControl(this.state.currentUser().email, [Validators.required, Validators.email]),
    phone: new FormControl(this.state.currentUser().phone, Validators.required),
    message: new FormControl('', Validators.required)
  });

  submitCarBooking(): void {
    const car = this.state.selectedCarForBooking();
    if (!car || this.carBookingForm.invalid) return;

    const val = this.carBookingForm.value;
    const days = 3; // Estimated default duration
    const total = car.dailyPrice ? car.dailyPrice * days : null;

    this.state.bookVehicle({
      vehicleId: car.id,
      vehicleName: car.name,
      vehicleImage: car.image,
      pickupLocation: val.pickupLocation || 'VIP Terminal',
      destination: val.destination || 'Presidential Wing',
      pickupDate: val.pickupDate || new Date().toISOString().split('T')[0],
      returnDate: val.returnDate || new Date(Date.now() + 86400000 * 3).toISOString().split('T')[0],
      driveType: val.driveType || 'chauffeur',
      customerName: val.customerName || this.state.currentUser().fullName,
      email: val.email || this.state.currentUser().email,
      phone: val.phone || this.state.currentUser().phone,
      additionalRequirements: val.additionalRequirements || undefined,
      dailyRate: car.dailyPrice,
      estimatedTotal: total
    });

    this.carBookingForm.reset();
  }

  submitSpaBooking(): void {
    const spa = this.state.selectedSpaForBooking();
    if (!spa || this.spaBookingForm.invalid) return;

    const val = this.spaBookingForm.value;
    this.state.bookSpa({
      treatmentId: spa.id,
      treatmentName: spa.name,
      date: val.date || new Date().toISOString().split('T')[0],
      time: val.time || '14:00',
      durationMinutes: spa.durationMinutes,
      therapistPreference: val.therapistPreference || 'Any Senior Therapist',
      guestType: val.guestType || 'Individual',
      customerName: val.customerName || this.state.currentUser().fullName,
      email: val.email || this.state.currentUser().email,
      phone: val.phone || this.state.currentUser().phone,
      specialRequirements: val.specialRequirements || undefined,
      price: spa.priceUsd,
      paymentStatus: 'Pending Verification'
    });

    this.spaBookingForm.reset();
  }

  submitQuoteRequest(): void {
    const watch = this.state.selectedWatchForQuote();
    if (!watch || this.quoteForm.invalid) return;

    const val = this.quoteForm.value;
    this.state.submitInquiry({
      division: 'Watches',
      subject: `Private Valuation & Allocation: ${watch.brand} ${watch.model} (${watch.referenceNumber})`,
      name: val.name || this.state.currentUser().fullName,
      email: val.email || this.state.currentUser().email,
      phone: val.phone || this.state.currentUser().phone,
      message: val.message || 'I am requesting formal allocation terms, verification certificates, and delivery coordination.'
    });

    this.state.closeWatchQuoteModal();
    this.quoteForm.reset();
  }
}
