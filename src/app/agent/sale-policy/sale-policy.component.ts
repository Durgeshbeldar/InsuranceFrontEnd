import { Component } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';
import { FormControl, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-sale-policy',
  templateUrl: './sale-policy.component.html',
  styleUrls: ['./sale-policy.component.css']
})
export class SalePolicyComponent {
  customers: any[] = [];
  plans: any[] = [];
  schemes: any[] = [];
  selectedScheme: any = null;
  agentId = '5c8c74bf-be02-4e53-664c-08dd19410dd0';

  constructor(private insuranceService: InsuranceService, private userService: UserService) {}

  ngOnInit(): void {
    this.loadCustomers();
    this.loadPlans();

    this.policyForm.get('premiumAmount')?.valueChanges.subscribe(() => {
      this.calculateSumAssured();
      this.onPremiumTypeChange();
    });
  
    this.policyForm.get('policyTerm')?.valueChanges.subscribe(() => {
      this.calculateSumAssured();
      this.onPremiumTypeChange();
    });
  }

  policyForm = new FormGroup({
    customerId: new FormControl('', Validators.required),
    planId: new FormControl('', Validators.required),
    schemeId: new FormControl('', Validators.required),
    sumAssured: new FormControl({value : '', disabled:true}),
    premiumType: new FormControl('', Validators.required),
    policyTerm: new FormControl('', [Validators.required, Validators.min(1)]),
    premiumAmount: new FormControl('', [Validators.required, Validators.min(1)]),
    installmentAmount: new FormControl({ value: '', disabled: true }),
  });

  // Load Customers
  loadCustomers() {
    this.userService.getCustomers().subscribe((response: any) => {
      this.customers = response.data;
    });
  }

  // Load Plans
  loadPlans() {
    this.insuranceService.getPlans().subscribe((response: any) => {
      this.plans = response.data;
    });
  }

  // Handle Plan Change
  onPlanChange(event: any) {
    const planId = event.target.value;
    this.policyForm.patchValue({ planId });
    this.insuranceService.getSchemesByPlanId(planId).subscribe((response: any) => {
      this.schemes = response.data;
    });
  }

  // Handle Scheme Change
  onSchemeChange(event: any) {
    const schemeId = event.target.value;
    this.policyForm.patchValue({ schemeId });
    this.selectedScheme = this.schemes.find((scheme) => scheme.schemeId === schemeId);

    // Add Validators Based on Selected Scheme
    this.policyForm.get('policyTerm')?.setValidators([
      Validators.required,
      this.validatePolicyTerm(this.selectedScheme),
    ]);
    this.policyForm.get('premiumAmount')?.setValidators([
      Validators.required,
      this.validatePremiumAmount(this.selectedScheme),
    ]);

    // Update Validation
    this.policyForm.get('policyTerm')?.updateValueAndValidity();
    this.policyForm.get('premiumAmount')?.updateValueAndValidity();

    this.policyForm.get('premiumType')?.valueChanges.subscribe(() => this.onPremiumTypeChange());
    this.policyForm.get('policyTerm')?.valueChanges.subscribe(() => this.onPremiumTypeChange());
    this.policyForm.get('premiumAmount')?.valueChanges.subscribe(() => this.onPremiumTypeChange());
  }

  onPremiumAmountChange(){
    let premiumAmount = this.policyForm.get('premiumAmount')?.value;
    let policyTerm = this.policyForm.get('policyTerm')?.value;
    if(premiumAmount && policyTerm){
      this.calculateSumAssured();
    }    
  }

  
  calculateSumAssured() {
    if (!this.selectedScheme) return;
    let profitRatio:any;
    let premiumAmount: any;
    let policyTermMonths: any;
    profitRatio = this.selectedScheme.profitRatio; 
    premiumAmount = this.policyForm.get('premiumAmount')?.value;
    policyTermMonths = this.policyForm.get('policyTerm')?.value;
  
    if (premiumAmount && policyTermMonths) {
      const policyTermYears = policyTermMonths / 12;
      const sumAssured = premiumAmount * Math.pow(1 + profitRatio / 100, policyTermYears); 
  
      // Update the form control for Sum Assured
      this.policyForm.patchValue({ sumAssured: sumAssured.toFixed() }); 
      console.log("Sum Assured Amount is ", sumAssured)
    }else{
      this.policyForm.patchValue({ sumAssured: '' });
    }
  }
  // Custom Validator for Policy Term
  validatePolicyTerm(selectedScheme: any) {
    return (control: AbstractControl) => {
      if (!selectedScheme) return null;
      const value = control.value;
      if (value < selectedScheme.minPolicyTerm || value > selectedScheme.maxPolicyTerm) {
        return { invalidPolicyTerm: `Value must be between ${selectedScheme.minPolicyTerm} and ${selectedScheme.maxPolicyTerm}.` };
      }
      return null;
    };
  }

  // Custom Validator for Sum Assured
  validatePremiumAmount(selectedScheme: any) {
    return (control: AbstractControl) => {
      if (!selectedScheme) return null;
      const value = control.value;
      if (value < selectedScheme.minAmount || value > selectedScheme.maxAmount) {
        return { invalidPremiumAmount: `Value must be between ₹${selectedScheme.minAmount} and ₹${selectedScheme.maxAmount}.` };
      }
      return null;
    };
  }

  // Calculate Maturity Date
  calculateDate(term: any) {
    const startDate = new Date();
    const maturityDate = new Date(startDate);
    maturityDate.setMonth(maturityDate.getMonth() + term);
    return maturityDate.toISOString();
  }

  onPremiumTypeChange() {
    console.log("premium type changed");
    let policyTerm:any;
    let premiumAmount: any;
    let premiumType: any;
    policyTerm = this.policyForm.get('policyTerm')?.value; // Get Policy Term (in months)
    premiumAmount = this.policyForm.get('premiumAmount')?.value; // Get Premium Amount
    premiumType = this.policyForm.get('premiumType')?.value; // Get Premium Type
    let numberOfInstallments : any;

    switch (premiumType) {
      case 'Monthly':
        numberOfInstallments = policyTerm;
        break;
      case 'Quarterly':
        numberOfInstallments = policyTerm / 3;
        break;
      case 'Yearly':
        numberOfInstallments = policyTerm/ 12;
        break;
    }

    const installmentAmount = premiumAmount / numberOfInstallments;
    this.policyForm.patchValue({ installmentAmount: installmentAmount.toFixed() });
    
  }
  

  // Create Policy Account
  createPolicyAccount() {
    if (this.policyForm.invalid) {
      this.policyForm.markAllAsTouched();
      return;
    }
    const term = this.policyForm.get('policyTerm')?.value;
    const date = this.calculateDate(term);
    const payload = {
      customerId: this.policyForm.get('customerId')?.value,
      schemeId: this.policyForm.get('schemeId')?.value,
      sumAssured: this.policyForm.get('sumAssured')?.value,
      premiumType: this.policyForm.get('premiumType')?.value,
      agentId: this.agentId,
      policyTerm: this.policyForm.get('policyTerm')?.value,
      premiumAmount: this.policyForm.get('premiumAmount')?.value,
      installmentAmount: this.policyForm.get('installmentAmount')?.value,
      appliedDate: new Date().toISOString(),
      maturityDate: date,
      status: 'Pending',
    };
    console.log(payload); // Debugging

    this.insuranceService.createPolicyAccount(payload).subscribe({
      next: (response : any) => {
        alert('Policy Account Created Successfully!');
      },
      error: (err) => console.error('Error:', err),
    });
  }

 


 
  // Cancel Form
  onCancel() {
    this.policyForm.reset();
  }
}
