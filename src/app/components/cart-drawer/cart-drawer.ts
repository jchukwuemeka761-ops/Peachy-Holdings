import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EnterpriseStateService } from '../../services/enterprise-state.service';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-cart-drawer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, ReactiveFormsModule],
  templateUrl: './cart-drawer.html'
})
export class CartDrawer {
  readonly state = inject(EnterpriseStateService);
  readonly promoForm = new FormGroup({
    code: new FormControl('')
  });

  applyPromo(): void {
    const val = this.promoForm.value.code;
    if (val) {
      this.state.applyDiscount(val);
      this.promoForm.reset();
    }
  }

  close(): void {
    this.state.cartDrawerOpen.set(false);
  }
}
