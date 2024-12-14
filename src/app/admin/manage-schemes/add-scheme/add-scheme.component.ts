import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { InsuranceService } from 'src/app/services/insurance.service';
@Component({
  selector: 'app-add-scheme',
  templateUrl: './add-scheme.component.html',
  styleUrls: ['./add-scheme.component.css']
})
export class AddSchemeComponent {
  constructor(private insuranceService: InsuranceService) {
    this.setupCustomValidators();
    this.loadPlans();
    
  }
  plans : any;
  loadPlans(){
    this.insuranceService.getPlans().subscribe({
      next: (response: any) => {
        this.plans = response.data;
      },
      error: (err: any) => {
        console.error('Error fetching plans:', err);
      }
    });
  }
  schemeForm = new FormGroup({
    schemeName: new FormControl('', Validators.required),
    planId : new FormControl('', Validators.required),
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
  }
);

  

  //This function sets up custom validators for min/max relationships 
  
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
  // Submit form data
  addScheme() {
    if (this.schemeForm.invalid) {
      this.schemeForm.markAllAsTouched(); 
      return; 
    }
    else if (this.schemeForm.valid) {
      const schemeData = this.schemeForm.value;
      this.insuranceService.addScheme(schemeData).subscribe({
        next: () => {
          alert('Insurance Scheme Added Successfully');
          this.schemeForm.reset();
        },
        error: (err) => console.error('Error adding scheme:', err)
      });
    } else {
      console.warn('Form is invalid. Please fill out all fields correctly.');
    }
  }

  // Cancel form
  onCancel() {
    this.schemeForm.reset();
  }
}
