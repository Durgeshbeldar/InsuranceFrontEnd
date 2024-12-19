import { Component, ViewChild, ElementRef  } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';

@Component({
  selector: 'app-my-policies',
  templateUrl: './my-policies.component.html',
  styleUrls: ['./my-policies.component.css']
})
export class MyPoliciesComponent {
  policies: any[] = [];
  filteredPolicies: any[] = [];
  paginatedPolicies: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPagesArray: number[] = [];
  selectedPolicy: any = null;
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(private insuranceService: InsuranceService) {}

  ngOnInit(): void {
    this.loadPoliciesByCustomerId();
  }

  loadPoliciesByCustomerId() {
    const customerId = localStorage.getItem('userId'); 
    this.insuranceService.getPolicyAccountsByCustomerId(customerId).subscribe((response: any) => {
      this.policies = response.data;
      this.filteredPolicies = [...this.policies];
      this.updatePagination();
    });
  }

  applyFilters() {
    const searchQuery = this.searchInput.nativeElement.value.toLowerCase();

    this.filteredPolicies = this.policies.filter(policy => 
      policy.policyNo.toLowerCase().includes(searchQuery) || 
      policy.insuranceScheme?.schemeName.toLowerCase().includes(searchQuery) || 
      policy.agent?.firstName.toLowerCase().includes(searchQuery) 
    );

    this.updatePagination();
  }

  updatePagination() {
    this.totalPagesArray = Array.from(
      { length: Math.ceil(this.filteredPolicies.length / this.itemsPerPage) },
      (_, i) => i + 1
    );
    this.setPaginatedPolicies();
  }

  changePageSize(event: any) {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.currentPage = 1; 
    this.updatePagination();
  }

  setPaginatedPolicies() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedPolicies = this.filteredPolicies.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginatedPolicies();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPagesArray.length) {
      this.currentPage++;
      this.setPaginatedPolicies();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.setPaginatedPolicies();
  }

 

  viewPolicyDetails(policy: any) {
    this.selectedPolicy = policy;
  }
  togglePolicyDetails(policy: any) {
    this.selectedPolicy = 
      this.selectedPolicy?.policyNo === policy.policyNo ? null : policy;
  }
}
