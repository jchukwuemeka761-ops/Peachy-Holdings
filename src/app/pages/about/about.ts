import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { EnterpriseStateService } from '../../services/enterprise-state.service';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-about',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, MatIconModule],
  templateUrl: './about.html'
})
export class About {
  readonly state = inject(EnterpriseStateService);
  readonly info = this.state.enterpriseInfo;
}
