import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { EnterpriseStateService } from '../../services/enterprise-state.service';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { GeneralInquiry } from '../../models/enterprise.models';

@Component({
  selector: 'app-contact',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './contact.html'
})
export class Contact {
  readonly state = inject(EnterpriseStateService);

  readonly contactForm = new FormGroup({
    name: new FormControl(this.state.currentUser().fullName, Validators.required),
    email: new FormControl(this.state.currentUser().email, [Validators.required, Validators.email]),
    phone: new FormControl(this.state.currentUser().phone, Validators.required),
    serviceOfInterest: new FormControl<'General Corporate' | 'Luxury Cars' | 'Watches' | 'Spa & Wellness' | 'Logistics' | 'Digital Assets' | 'Concierge'>('Spa & Wellness', Validators.required),
    message: new FormControl('', Validators.required)
  });

  readonly messageSubmitted = signal(false);

  submitContact(): void {
    if (this.contactForm.invalid) return;

    const val = this.contactForm.value;
    const divisionMap: Record<string, GeneralInquiry['division']> = {
      'General Corporate': 'General',
      'Luxury Cars': 'Luxury Cars',
      'Watches': 'Watches',
      'Spa & Wellness': 'Spa & Wellness',
      'Logistics': 'Logistics',
      'Digital Assets': 'Digital Assets',
      'Concierge': 'Concierge'
    };
    const mappedDivision: GeneralInquiry['division'] = (val.serviceOfInterest && divisionMap[val.serviceOfInterest]) ? divisionMap[val.serviceOfInterest] : 'General';
    this.state.submitInquiry({
      division: mappedDivision,
      subject: `Direct Contact: ${val.serviceOfInterest}`,
      name: val.name || '',
      email: val.email || '',
      phone: val.phone || '',
      message: val.message || ''
    });

    this.messageSubmitted.set(true);
    this.state.showToast('Your message has been received by PEACHY Executive Client Care.', 'success');
  }
}
