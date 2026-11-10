import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { EnterpriseStateService } from '../../services/enterprise-state.service';
import { LuxuryVehicle } from '../../models/enterprise.models';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-cars',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './cars.html'
})
export class Cars {
  readonly state = inject(EnterpriseStateService);

  readonly selectedManufacturer = signal<string>('All');
  readonly selectedChauffeurOnly = signal<boolean>(false);
  readonly searchQuery = new FormControl('');

  readonly manufacturers = computed(() => {
    const list = new Set(this.state.vehicles().map(v => v.manufacturer));
    return ['All', ...Array.from(list)];
  });

  readonly filteredVehicles = computed(() => {
    let list = this.state.vehicles();
    const maker = this.selectedManufacturer();
    const chauffeur = this.selectedChauffeurOnly();
    const query = this.searchQuery.value?.toLowerCase().trim() || '';

    if (maker !== 'All') {
      list = list.filter(v => v.manufacturer === maker);
    }

    if (chauffeur) {
      list = list.filter(v => v.chauffeurAvailable);
    }

    if (query) {
      list = list.filter(v => 
        v.name.toLowerCase().includes(query) || 
        v.manufacturer.toLowerCase().includes(query) ||
        v.description.toLowerCase().includes(query)
      );
    }

    return list;
  });

  openBooking(car: LuxuryVehicle): void {
    this.state.openCarBookingModal(car);
  }
}
