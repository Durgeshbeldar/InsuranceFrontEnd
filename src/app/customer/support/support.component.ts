import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from'src/app/services/user.service';
import { InsuranceService } from'src/app/services/insurance.service';
@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  queryForm!: FormGroup; // FormGroup (NO FormBuilder)
  policies: any[] = []; // List of policies for the customer
  selectedPolicy: any = null; // Details of the selected policy

  constructor(
    private userService: UserService, 
    private insuranceService: InsuranceService
  ) {}

  ngOnInit(): void {
    this.loadPolicies();
    this.initializeForm();
  }

  // Load Customer Policies
  loadPolicies() {
    const customerId = localStorage.getItem('userId');
    this.insuranceService.getPolicyAccountsByCustomerId(customerId).subscribe({
      next: (response: any) => this.policies = response.data,
      error: (err) => console.error('Error loading policies:', err)
    });
  }

  // Initialize Form
  initializeForm() {
    this.queryForm = new FormGroup({
      policyNo: new FormControl('other', [Validators.required]),
      title: new FormControl('', [Validators.required, Validators.minLength(5)]),
      description: new FormControl('', [Validators.required, Validators.minLength(10)])
    });
  }

  // On Policy Change
  onPolicyChange(event: any) {
    const policyNo = event.target.value;
    this.selectedPolicy = policyNo === 'other' 
      ? null 
      : this.policies.find(policy => policy.policyNo === policyNo);
  }

  // Submit Query
  submitQuery() {
    if (this.queryForm.invalid) return;

    const payload = {
      customerId: localStorage.getItem('userId'),
      policyNo: this.queryForm.get('policyNo')?.value === 'other' ? null : this.queryForm.get('policyNo')?.value,
      title: this.queryForm.get('title')?.value,
      description: this.queryForm.get('description')?.value,
      response: null,
      createdAt: new Date().toISOString(),
      isActive: true
    };

    this.userService.raiseCustomerQuery(payload).subscribe({
      next: () => {
        alert('Query submitted successfully!');
        this.queryForm.reset();
        this.queryForm.controls['policyNo'].setValue('other');
      },
      error: (err :any) => console.error('Error submitting query:', err)
    });
  }

  // Cancel Form
  onCancel() {
    this.queryForm.reset();
    this.queryForm.controls['policyNo'].setValue('other');
    this.selectedPolicy = null;
  }

}
