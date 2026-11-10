import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EnterpriseStateService } from '../../services/enterprise-state.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-footer',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  templateUrl: './footer.html'
})
export class Footer {
  readonly state = inject(EnterpriseStateService);
  readonly currentYear = new Date().getFullYear();
}
