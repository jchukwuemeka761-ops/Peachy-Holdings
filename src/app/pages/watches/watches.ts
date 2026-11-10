import { ChangeDetectionStrategy, Component, inject, signal, computed } from '@angular/core';
import { EnterpriseStateService } from '../../services/enterprise-state.service';
import { LuxuryWatch } from '../../models/enterprise.models';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormControl } from '@angular/forms';

@Component({
  selector: 'app-watches',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './watches.html'
})
export class Watches {
  readonly state = inject(EnterpriseStateService);

  // Filters State
  readonly searchControl = new FormControl('');
  readonly selectedBrand = signal<string>('All');
  readonly selectedMovement = signal<string>('All');
  readonly selectedCategory = signal<string>('All');
  readonly selectedGender = signal<string>('All');
  readonly selectedCondition = signal<string>('All');
  readonly sortBy = signal<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Watch Comparison State
  readonly comparedWatches = signal<LuxuryWatch[]>([]);
  readonly comparisonDrawerOpen = signal<boolean>(false);

  readonly brands = computed(() => {
    const set = new Set(this.state.watches().map(w => w.brand));
    return ['All', ...Array.from(set)];
  });

  readonly categories = ['All', 'Haute Horlogerie', 'Complications', 'Chronograph', 'Sports & Diver', 'Dress & Heritage'];
  readonly movements = ['All', 'Automatic', 'Automatic Chronograph', 'Manual Wind', 'Manual Tourbillon', 'Automatic Tourbillon', 'Spring Drive', 'Quartz'];

  readonly filteredWatches = computed(() => {
    let list = this.state.watches();
    const query = this.searchControl.value?.toLowerCase().trim() || '';
    const brand = this.selectedBrand();
    const category = this.selectedCategory();
    const movement = this.selectedMovement();
    const gender = this.selectedGender();
    const condition = this.selectedCondition();

    if (query) {
      list = list.filter(w =>
        w.brand.toLowerCase().includes(query) ||
        w.model.toLowerCase().includes(query) ||
        w.referenceNumber.toLowerCase().includes(query) ||
        w.description.toLowerCase().includes(query)
      );
    }

    if (brand !== 'All') {
      list = list.filter(w => w.brand === brand);
    }

    if (category !== 'All') {
      list = list.filter(w => w.category === category);
    }

    if (movement !== 'All') {
      list = list.filter(w => w.movementType === movement);
    }

    if (gender !== 'All') {
      list = list.filter(w => w.gender === gender);
    }

    if (condition !== 'All') {
      list = list.filter(w => w.condition === condition);
    }

    // Sorting
    const sort = this.sortBy();
    const copy = [...list];
    if (sort === 'price-asc') {
      copy.sort((a, b) => (a.priceUsd || 9999999) - (b.priceUsd || 9999999));
    } else if (sort === 'price-desc') {
      copy.sort((a, b) => (b.priceUsd || 0) - (a.priceUsd || 0));
    } else if (sort === 'rating') {
      copy.sort((a, b) => b.rating - a.rating);
    }

    return copy;
  });

  // Watch Action Helpers
  openQuickView(watch: LuxuryWatch): void {
    this.state.openWatchQuickView(watch);
  }

  addToCart(watch: LuxuryWatch): void {
    this.state.addToCart(watch);
  }

  buyNow(watch: LuxuryWatch): void {
    this.state.addToCart(watch);
    this.state.cartDrawerOpen.set(true);
  }

  requestQuote(watch: LuxuryWatch): void {
    this.state.openWatchQuoteModal(watch);
  }

  toggleComparison(watch: LuxuryWatch): void {
    const list = [...this.comparedWatches()];
    const index = list.findIndex(w => w.id === watch.id);
    if (index > -1) {
      list.splice(index, 1);
    } else {
      if (list.length >= 3) {
        this.state.showToast('You can compare a maximum of 3 timepieces simultaneously.', 'info');
        return;
      }
      list.push(watch);
      this.comparisonDrawerOpen.set(true);
    }
    this.comparedWatches.set(list);
  }

  isInComparison(watchId: string): boolean {
    return this.comparedWatches().some(w => w.id === watchId);
  }

  clearComparison(): void {
    this.comparedWatches.set([]);
    this.comparisonDrawerOpen.set(false);
  }
}
