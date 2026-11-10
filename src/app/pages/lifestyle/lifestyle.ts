import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { EnterpriseStateService } from '../../services/enterprise-state.service';
import { CONCIERGE_SERVICES } from '../../data/enterprise.data';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-lifestyle',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './lifestyle.html'
})
export class Lifestyle {
  readonly state = inject(EnterpriseStateService);
  readonly services = CONCIERGE_SERVICES;

  readonly bespokeForm = new FormGroup({
    serviceType: new FormControl('Private Aviation & Helicopter Charter', Validators.required),
    fullName: new FormControl(this.state.currentUser().fullName, Validators.required),
    email: new FormControl(this.state.currentUser().email, [Validators.required, Validators.email]),
    phone: new FormControl(this.state.currentUser().phone, Validators.required),
    targetDate: new FormControl(''),
    cityOrRegion: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)
  });

  readonly bespokeSubmitted = signal(false);

  submitBespoke(): void {
    if (this.bespokeForm.invalid) return;

    const val = this.bespokeForm.value;
    this.state.submitInquiry({
      division: 'Concierge',
      subject: `Concierge Mandate: ${val.serviceType} (${val.cityOrRegion})`,
      name: val.fullName || '',
      email: val.email || '',
      phone: val.phone || '',
      message: `Service: ${val.serviceType}. City/Region: ${val.cityOrRegion}. Target Date: ${val.targetDate || 'Flexible'}. Details: ${val.description}.`
    });

    this.bespokeSubmitted.set(true);
    this.state.showToast('Your private concierge mandate has been dispatched to the Executive Director.', 'success');
  }
}
