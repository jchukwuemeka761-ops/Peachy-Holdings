import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { EnterpriseStateService } from '../../services/enterprise-state.service';
import { DIGITAL_ASSETS } from '../../data/enterprise.data';
import { DigitalAssetInfo } from '../../models/enterprise.models';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-digital-assets',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [MatIconModule, ReactiveFormsModule],
  templateUrl: './digital-assets.html'
})
export class DigitalAssets {
  readonly state = inject(EnterpriseStateService);
  readonly assets = DIGITAL_ASSETS;
  readonly selectedAsset = signal<DigitalAssetInfo | null>(DIGITAL_ASSETS[0]);

  readonly consultationForm = new FormGroup({
    fullName: new FormControl(this.state.currentUser().fullName, Validators.required),
    email: new FormControl(this.state.currentUser().email, [Validators.required, Validators.email]),
    phone: new FormControl(this.state.currentUser().phone, Validators.required),
    institutionType: new FormControl<'High-Net-Worth Private Client' | 'Family Office' | 'Corporate Treasury' | 'Institutional Fund'>('High-Net-Worth Private Client', Validators.required),
    topics: new FormControl('Portfolio Allocation Strategy & Regulatory Safeguards', Validators.required),
    message: new FormControl('')
  });

  readonly consultationSubmitted = signal(false);

  selectAsset(asset: DigitalAssetInfo): void {
    this.selectedAsset.set(asset);
  }

  submitConsultation(): void {
    if (this.consultationForm.invalid) return;

    const val = this.consultationForm.value;
    this.state.submitInquiry({
      division: 'Digital Assets',
      subject: `Digital Asset Consultation: ${val.institutionType} (${val.topics})`,
      name: val.fullName || '',
      email: val.email || '',
      phone: val.phone || '',
      message: `Institution: ${val.institutionType}. Topics: ${val.topics}. Notes: ${val.message || 'Requesting introductory briefing.'}`
    });

    this.consultationSubmitted.set(true);
    this.state.showToast('Consultation request received. A digital asset advisor will contact you.', 'success');
  }
}
