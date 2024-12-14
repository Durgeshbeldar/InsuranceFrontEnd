import { Component } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';
@Component({
  selector: 'app-verified-accounts',
  templateUrl: './verified-accounts.component.html',
  styleUrls: ['./verified-accounts.component.css']
})
export class VerifiedAccountsComponent {
 
constructor(private insuranceService:InsuranceService){}
appliedPolicies: any;
policies: any[] = []; // All policies from the API
paginatedPolicies: any[] = []; // Policies displayed on the current page
currentPage: number = 1; // Current page number
itemsPerPage: number = 5; // Number of policies per page
totalPages: number = 0; // Total number of pages
selectedPolicy: any = null; 
ngOnInit(): void {
  this.loadAppliedPolicies();
}
loadAppliedPolicies() {
  this.insuranceService.getPolicyAccounts().subscribe({
    next: (response: any) => {
      this.policies = response.data.filter((policy: any) => policy.isApproved); // Filter policies where isApproved is false
      this.totalPages = Math.ceil(this.policies.length / this.itemsPerPage); // Calculate total pages
      this.setPaginatedPolicies(); // Load initial page
    },
    error: (err) => console.error('Error loading applied policies:', err)
  });
}

setPaginatedPolicies() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.paginatedPolicies = this.policies.slice(startIndex, endIndex);
}

goToNextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.setPaginatedPolicies();
  }
}

goToPreviousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.setPaginatedPolicies();
  }
}
policy:any;
togglePolicyDetails(policy: any) {
  this.selectedPolicy = this.selectedPolicy?.policyNo === policy.policyNo ? null : policy;
  this.policy = this.selectedPolicy;
}

// Approve the selected policy
approvePolicy(policy: any) {
  const date = new Date().toISOString();
  const payload = {
    policyNo: policy.policyNo,
    isApproved: true,
    issueDate : date,
    maturityDate : this.calculateDate(policy.policyTerm),
    status : "Approved"
  }
  console.log(payload);
  this.insuranceService.changePolicyAccountStatus(payload).subscribe({
    next: () => {
      alert('Policy Approved Successfully!');
      this.loadAppliedPolicies();
    },
    error: (err) => {
      alert("error while changing the status");
      console.error('Error approving policy:', err)
    }
  })
}

calculateDate(term: any) {
  const startDate = new Date();
  const maturityDate = new Date(startDate);
  maturityDate.setMonth(maturityDate.getMonth() + term);
  return maturityDate.toISOString();
}

}
