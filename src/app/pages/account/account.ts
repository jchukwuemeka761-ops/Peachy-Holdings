import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SlicePipe } from '@angular/common';
import { EnterpriseStateService } from '../../services/enterprise-state.service';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from '../../models/enterprise.models';

@Component({
  selector: 'app-account',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, ReactiveFormsModule, SlicePipe],
  templateUrl: './account.html'
})
export class Account {
  readonly state = inject(EnterpriseStateService);

  readonly activeTab = signal<'profile' | 'bookings' | 'spa' | 'orders' | 'shipments' | 'wishlist'>('bookings');

  // Edit Profile Form
  readonly profileForm = new FormGroup({
    fullName: new FormControl(this.state.currentUser().fullName, Validators.required),
    email: new FormControl(this.state.currentUser().email, [Validators.required, Validators.email]),
    phone: new FormControl(this.state.currentUser().phone, Validators.required),
    preferredCurrency: new FormControl(this.state.currentUser().preferredCurrency, Validators.required)
  });

  // Invoice Modal
  readonly viewingInvoice = signal<Order | null>(null);

  updateProfile(): void {
    if (this.profileForm.invalid) return;
    const val = this.profileForm.value;
    const currency: 'USD' | 'EUR' | 'GBP' | 'NGN' = (val.preferredCurrency === 'EUR' || val.preferredCurrency === 'GBP' || val.preferredCurrency === 'NGN') ? val.preferredCurrency : 'USD';
    const updated = {
      ...this.state.currentUser(),
      fullName: val.fullName || '',
      email: val.email || '',
      phone: val.phone || '',
      preferredCurrency: currency
    };
    this.state.currentUser.set(updated);
    this.state.showToast('Profile credentials saved.', 'success');
  }

  cancelCarBooking(id: string): void {
    this.state.updateVehicleBookingStatus(id, 'Cancelled');
  }

  cancelSpaReservation(id: string): void {
    this.state.updateSpaReservationStatus(id, 'Cancelled');
  }

  removeFromWishlist(watchId: string): void {
    this.state.toggleWishlist(watchId);
  }

  getWatchById(id: string) {
    return this.state.watches().find(w => w.id === id);
  }

  viewInvoice(order: Order): void {
    this.viewingInvoice.set(order);
  }

  closeInvoice(): void {
    this.viewingInvoice.set(null);
  }
}
