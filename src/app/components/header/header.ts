import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { EnterpriseStateService } from '../../services/enterprise-state.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-header',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, RouterLinkActive, MatIconModule],
  templateUrl: './header.html'
})
export class Header {
  readonly state = inject(EnterpriseStateService);
  readonly divisionsOpen = signal(false);
  readonly mobileMenuOpen = signal(false);

  toggleDivisions(): void {
    this.divisionsOpen.update(v => !v);
  }

  closeDivisions(): void {
    this.divisionsOpen.set(false);
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update(v => !v);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }
}
