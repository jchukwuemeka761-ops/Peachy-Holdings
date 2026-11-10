import { ChangeDetectionStrategy, Component, inject, signal, OnInit, OnDestroy } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EnterpriseStateService } from '../../services/enterprise-state.service';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { DIGITAL_ASSETS, SPA_SPACES } from '../../data/enterprise.data';
import { LuxuryVehicle, LuxuryWatch } from '../../models/enterprise.models';

export interface HeroSlide {
  id: number;
  category: 'LUXURY MOBILITY FLEET' | '5-STAR SPA & WELLNESS SANCTUARY' | 'HAUTE HORLOGERIE TIMEPIECES' | 'EXECUTIVE FLAGSHIP';
  title: string;
  highlight: string;
  subtitle: string;
  image: string;
  ctaText: string;
  ctaLink: string;
  itemBadge: string;
}

@Component({
  selector: 'app-home',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule, ReactiveFormsModule],
  templateUrl: './home.html'
})
export class Home implements OnInit, OnDestroy {
  readonly state = inject(EnterpriseStateService);
  readonly digitalAssets = DIGITAL_ASSETS;
  readonly spaSpaces = SPA_SPACES.slice(0, 6);

  // Live Animated Slides spanning cars, watches, and spa sessions
  readonly slides: HeroSlide[] = [
    {
      id: 0,
      category: 'LUXURY MOBILITY FLEET',
      title: 'SUPREME EXECUTIVE',
      highlight: 'MOTORCADE FLEET',
      subtitle: 'Rolls-Royce Phantom, Cullinan, Bugatti Chiron, and Lamborghini Revuelto. Sovereign chauffeured mobility and airport security escorts.',
      image: '/images/fleet_luxury_cars.jpg',
      ctaText: 'EXPLORE FLEET (20 VEHICLES)',
      ctaLink: '/luxury-cars',
      itemBadge: 'Fleet of 20 Luxury Motorcars'
    },
    {
      id: 1,
      category: '5-STAR SPA & WELLNESS SANCTUARY',
      title: 'RESTORATIVE FIVE-STAR',
      highlight: 'SPA SANCTUARY',
      subtitle: 'Experience world-class hydrothermal thermal suites, cryotherapy chambers, and holistic restorative therapy at Store 5, 53 Awolowo Street, Umuahia.',
      image: '/images/spa_sanctuary.jpg',
      ctaText: 'BOOK SPA SANCTUARY',
      ctaLink: '/spa-wellness',
      itemBadge: '15 Spaces · 17 Clinical Treatments'
    },
    {
      id: 2,
      category: 'HAUTE HORLOGERIE TIMEPIECES',
      title: 'MASTERPIECE RICHARD MILLE &',
      highlight: 'SWISS HOROLOGY',
      subtitle: 'Tourbillons, perpetual calendars, and authentic mechanical chronographs from Richard Mille, Patek Philippe, and Audemars Piguet.',
      image: '/images/richard_mille_vault.jpg',
      ctaText: 'EXPLORE 110+ WATCHES',
      ctaLink: '/luxury-watches',
      itemBadge: 'Richard Mille Tourbillon & Haute Horlogerie'
    },
    {
      id: 3,
      category: 'EXECUTIVE FLAGSHIP',
      title: 'EXPERIENCE THE',
      highlight: 'EXTRAORDINARY.',
      subtitle: 'From sovereign mobility and prestigious timepieces to wellness sanctuaries and global freight, PEACHY HOLDING ENTERPRISE brings multiple possibilities together.',
      image: '/images/hero_holding.jpg',
      ctaText: 'DISCOVER OUR ENTERPRISE',
      ctaLink: '/about-us',
      itemBadge: 'One Enterprise · Multiple Possibilities'
    }
  ];

  readonly currentSlideIndex = signal<number>(0);
  private timerId: ReturnType<typeof setInterval> | null = null;

  // Quick Tracking Box on Homepage
  readonly quickTrackingCode = new FormControl('');
  readonly trackingResult = signal<string | null>(null);

  // Newsletter Form
  readonly newsletterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });
  readonly newsletterSubscribed = signal(false);

  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      this.timerId = setInterval(() => {
        this.nextSlide();
      }, 5500);
    }
  }

  ngOnDestroy(): void {
    if (this.timerId) {
      clearInterval(this.timerId);
    }
  }

  setSlide(index: number): void {
    this.currentSlideIndex.set(index);
    this.resetTimer();
  }

  nextSlide(): void {
    this.currentSlideIndex.update(i => (i + 1) % this.slides.length);
  }

  prevSlide(): void {
    this.currentSlideIndex.update(i => (i - 1 + this.slides.length) % this.slides.length);
    this.resetTimer();
  }

  private resetTimer(): void {
    if (typeof window !== 'undefined' && this.timerId) {
      clearInterval(this.timerId);
      this.timerId = setInterval(() => {
        this.nextSlide();
      }, 5500);
    }
  }

  trackShipment(): void {
    const code = this.quickTrackingCode.value?.trim();
    if (!code) return;
    const found = this.state.getShipmentByTrackingNumber(code);
    if (found) {
      this.trackingResult.set(`Shipment #${found.trackingNumber}: Status is "${found.currentStage}" en route to ${found.destination}.`);
    } else {
      this.trackingResult.set(`No active record found for "${code}". Try sample tracking codes: PHE-8827-010 or PHE-4391-772.`);
    }
  }

  subscribeNewsletter(): void {
    if (this.newsletterForm.valid) {
      this.newsletterSubscribed.set(true);
      this.state.showToast('Subscribed to PEACHY Holding Private Client Dispatch.', 'success');
      this.newsletterForm.reset();
    }
  }

  openCarModal(car: LuxuryVehicle): void {
    this.state.openCarBookingModal(car);
  }

  openWatchModal(watch: LuxuryWatch): void {
    this.state.openWatchQuickView(watch);
  }

  addToCart(watch: LuxuryWatch): void {
    this.state.addToCart(watch);
  }
}
