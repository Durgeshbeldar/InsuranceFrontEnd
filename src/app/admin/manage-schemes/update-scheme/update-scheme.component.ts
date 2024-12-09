import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-update-scheme',
  templateUrl: './update-scheme.component.html',
  styleUrls: ['./update-scheme.component.css']
})
export class UpdateSchemeComponent {
  schemes: any;
  cancelEnabled = false;
  isSchemeFetched = false;
  id: any;
  constructor(private insuranceService: InsuranceService) {
    this.loadSchemes();
  }

  schemeDropdownForm = new FormGroup({
    schemeId: new FormControl('', Validators.required),
  });

  loadSchemes() {
    this.insuranceService.getSchemes().subscribe({
      next: (response: any) => {
        this.schemes = response.data;
      },
      error: (error: any) => console.error('Error While Fetching Plans:', error)
    });
  }

  onCancel2() {
    this.cancelEnabled = false;
    this.schemeDropdownForm.reset();
    this.isSchemeFetched = false;
    this.schemeForm.reset();
  }

  onPlanSelect() {
    this.cancelEnabled = true;
    this.id = this.schemeDropdownForm.get('schemeId')?.value;
    this.insuranceService.getSchemeById(this.id).subscribe({
      next: (scheme: any) => {
        this.isSchemeFetched = true;

        this.populateForm(scheme.data);
      },
      error: (err) => console.error('Error fetching plan by ID:', err)
    });
  }

  populateForm(scheme: any) {
    this.schemeForm.patchValue({
      schemeId: scheme.schemeId,
      schemeName: scheme.schemeName,
      description: scheme.description,
      minAmount: scheme.minAmount,
      maxAmount: scheme.maxAmount,
      minPolicyTerm: scheme.minPolicyTerm,
      maxPolicyTerm: scheme.maxPolicyTerm,
      minAge: scheme.minAge,
      maxAge: scheme.maxAge,
      profitRatio: scheme.profitRatio,
      settlementRatio: scheme.settlementRatio,
      registrationCommission: scheme.registrationCommission,
      installmentCommission: scheme.installmentCommission
    });
  }

  schemeForm = new FormGroup({
    schemeId: new FormControl(),
    schemeName: new FormControl('', Validators.required),
    description: new FormControl(''), // Optional field
    minAmount: new FormControl('', Validators.required),
    maxAmount: new FormControl('', Validators.required),
    minPolicyTerm: new FormControl('', Validators.required),
    maxPolicyTerm: new FormControl('', Validators.required),
    minAge: new FormControl('', [Validators.required, Validators.min(0)]),
    maxAge: new FormControl('', [Validators.required, Validators.min(0)]),
    profitRatio: new FormControl('', [Validators.required, Validators.min(0)]),
    settlementRatio: new FormControl('', [Validators.required, Validators.min(0)]),
    registrationCommission: new FormControl('', [Validators.required, Validators.min(0)]),
    installmentCommission: new FormControl('', [Validators.required, Validators.min(0)]),
  });

  setupCustomValidators() {
    this.schemeForm.get('maxAmount')?.valueChanges.subscribe(() => {
      this.checkMinMaxValidation('minAmount', 'maxAmount', 'Maximum Amount');
    });

    this.schemeForm.get('maxPolicyTerm')?.valueChanges.subscribe(() => {
      this.checkMinMaxValidation('minPolicyTerm', 'maxPolicyTerm', 'Max Policy Term');
    });

    this.schemeForm.get('maxAge')?.valueChanges.subscribe(() => {
      this.checkMinMaxValidation('minAge', 'maxAge', 'Maximum Age');
    });
  }

  checkMinMaxValidation(minControlName: string, maxControlName: string, label: string) {
    const minControl = this.schemeForm.get(minControlName);
    const maxControl = this.schemeForm.get(maxControlName);

    if (minControl && maxControl && minControl.value !== null && maxControl.value !== null) {
      const minValue = +minControl.value; // Convert to number
      const maxValue = +maxControl.value; // Convert to number
      if (maxValue <= minValue) {
        maxControl.setErrors({ minMaxError: `${label} should be greater than the Minimum Value.` });
      } else {
        // If no errors, we clear the error
        if (maxControl.hasError('minMaxError')) {
          delete maxControl.errors?.['minMaxError'];
          maxControl.updateValueAndValidity({ onlySelf: true });
        }
      }
    }
  }

  updateScheme() {
    if (this.schemeForm.invalid) {
      this.schemeForm.markAllAsTouched();
      return;
    } else if (this.schemeForm.valid) {
      const schemeData = this.schemeForm.value;
      this.insuranceService.updateScheme(schemeData).subscribe({
        next: () => {
          alert('Insurance Scheme Updated Successfully');
          this.schemeForm.reset();
        },
        error: (err) => console.error('Error While Updating Scheme:', err)
      });
    } else {
      console.warn('Form is invalid. Please fill out all fields correctly.');
    }
  }

  onCancel(){
    this.cancelEnabled = false;
    this.schemeForm.reset();
    this.schemeDropdownForm.reset();
    this.isSchemeFetched = false;
  }
}
