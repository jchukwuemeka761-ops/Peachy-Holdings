import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { EnterpriseStateService } from '../../services/enterprise-state.service';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { Order } from '../../models/enterprise.models';

@Component({
  selector: 'app-checkout',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, ReactiveFormsModule],
  templateUrl: './checkout.html'
})
export class Checkout {
  readonly state = inject(EnterpriseStateService);
  private readonly router = inject(Router);

  readonly selectedPaymentMethod = signal<'stripe-card' | 'bank-wire' | 'flutterwave-nigeria' | 'concierge-invoice'>('stripe-card');
  readonly isProcessing = signal<boolean>(false);
  readonly completedOrder = signal<Order | null>(null);

  readonly checkoutForm = new FormGroup({
    fullName: new FormControl(this.state.currentUser().fullName, Validators.required),
    email: new FormControl(this.state.currentUser().email, [Validators.required, Validators.email]),
    phone: new FormControl(this.state.currentUser().phone, Validators.required),
    street: new FormControl('14 Queen Elizabeth Boulevard', Validators.required),
    city: new FormControl('Umuahia', Validators.required),
    state: new FormControl('Abia State', Validators.required),
    country: new FormControl('Nigeria', Validators.required),
    postalCode: new FormControl('900103', Validators.required),
    cardNumber: new FormControl('•••• •••• •••• 4242'),
    cardExpiry: new FormControl('12/28'),
    cardCvc: new FormControl('•••')
  });

  submitCheckout(): void {
    if (this.state.cart().length === 0) {
      this.state.showToast('Your shopping cart is empty.', 'error');
      return;
    }

    if (this.checkoutForm.invalid) {
      this.state.showToast('Please complete all shipping address fields.', 'error');
      return;
    }

    this.isProcessing.set(true);

    setTimeout(() => {
      const val = this.checkoutForm.value;
      const orderItems = this.state.cart().map(item => ({
        watchId: item.watch.id,
        brand: item.watch.brand,
        model: item.watch.model,
        referenceNumber: item.watch.referenceNumber,
        image: item.watch.image,
        quantity: item.quantity,
        unitPrice: item.unitPrice
      }));

      const newOrder = this.state.createOrder({
        items: orderItems,
        subtotal: this.state.cartSubtotal(),
        discountAmount: this.state.cartDiscount(),
        discountCode: this.state.discountCode() || undefined,
        tax: 0,
        shipping: 0,
        total: this.state.cartTotal(),
        paymentMethod: this.selectedPaymentMethod(),
        paymentStatus: this.selectedPaymentMethod() === 'stripe-card' ? 'Authorized' : 'Payment Pending',
        shippingAddress: {
          fullName: val.fullName || '',
          street: val.street || '',
          city: val.city || '',
          state: val.state || '',
          country: val.country || '',
          postalCode: val.postalCode || '',
          phone: val.phone || ''
        },
        customerEmail: val.email || this.state.currentUser().email,
        customerName: val.fullName || this.state.currentUser().fullName
      });

      this.isProcessing.set(false);
      this.completedOrder.set(newOrder);
    }, 1200);
  }

  goToAccount(): void {
    this.router.navigate(['/account']);
  }
}
