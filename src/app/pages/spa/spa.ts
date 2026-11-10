import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { EnterpriseStateService } from '../../services/enterprise-state.service';
import { SPA_SPACES } from '../../data/enterprise.data';
import { SpaTreatment } from '../../models/enterprise.models';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-spa',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule],
  templateUrl: './spa.html'
})
export class Spa {
  readonly state = inject(EnterpriseStateService);
  readonly spaces = SPA_SPACES;
  readonly treatments = this.state.spaTreatments;
  readonly equipment = this.state.spaEquipment;
  readonly selectedCategory = signal<string>('All');
  readonly categories = ['All', 'Massage', 'Facial & Skincare', 'Hydro & Thermal', 'Holistic & Packages', 'Grooming & Finishing'];

  openBooking(treatment: SpaTreatment): void {
    this.state.openSpaBookingModal(treatment);
  }
}
