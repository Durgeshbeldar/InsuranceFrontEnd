import { Component } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-sold-policies-agent',
  templateUrl: './sold-policies-agent.component.html',
  styleUrls: ['./sold-policies-agent.component.css']
})
export class SoldPoliciesAgentComponent {
policies: any[] = [];
  filteredPolicies: any[] = [];
  paginatedPolicies: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPagesArray: number[] = [];
  searchText: string = '';
  selectedDate: string | null = null;
  selectedStatus: string = '';
  constructor(private policyService: InsuranceService , private userService : UserService) {}
  AgentId :any;
  ngOnInit(): void {
    this.getAgentId();
    this.loadPolicies();
  }
  getAgentId(){
    this.AgentId  = localStorage.getItem('userId');
  }
  loadPolicies() {
    this.policyService.getPolicyAccounts().subscribe((response: any) => {
      this.policies = response.data.filter((p:any)=>p.agentId === this.AgentId);
      this.filteredPolicies = [...this.policies];
      this.updatePagination();
    });
  }

  applyFilters() {
    this.filteredPolicies = this.policies.filter((policy) => {
      const matchesSearch = this.searchText
        ? policy.policyNo.toLowerCase().includes(this.searchText.toLowerCase()) ||
          `${policy.customer.firstName} ${policy.customer.lastName}`.toLowerCase().includes(this.searchText.toLowerCase())
        : true;

      const matchesDate = this.selectedDate
        ? new Date(policy.appliedDate).toISOString().split('T')[0] === this.selectedDate
        : true;

        const matchesStatus = this.selectedStatus
      ? policy.status === this.selectedStatus
      : true;

      return matchesSearch && matchesDate && matchesStatus;
    });
    this.updatePagination();
  }

  updatePagination() {
    const totalPages = Math.ceil(this.filteredPolicies.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    this.setPaginatedPolicies();
  }

  setPaginatedPolicies() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedPolicies = this.filteredPolicies.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePageSize(event: any) {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.currentPage = 1;
    this.updatePagination();
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

  viewPolicyDocuments(policy: any) {
    this.selectedPolicy = policy; // Assign the selected policy
    this.isModalOpen = true; // Open the modal
    this.currentIndex = 0; // Reset index to the first document
  
    // Fetch documents from the user service by customer ID
    this.userService.getUserById(policy.customerId).subscribe({
      next: (response: any) => {
        this.uploadedDocuments = response.data.documents.map((doc: any) => ({
          ...doc,
          filePath: doc.filePath || 'assets/default-placeholder.png', // Provide a default placeholder if filePath is missing
        }));

      },
      error: (err: any) => {
        console.error('Error fetching documents:', err);
        this.uploadedDocuments = []; // Ensure empty state on error
      },
    });
  }
  // Details Modal 
  selectedPolicy: any = null;

// Open the details card for a selected policy
viewPolicyDetails(policy: any) {
  this.selectedPolicy = policy;
}

// Close the details card
closePolicyDetails() {
  this.selectedPolicy = null;
}

// Document Modal 

// Variables for modal state
isModalOpen: boolean = false;
uploadedDocuments: any[] = [];
currentIndex: number = 0;

// Close the modal
closeModal() {
  this.isModalOpen = false;
  this.selectedPolicy = null;
  this.uploadedDocuments = [];
  this.currentIndex = 0;
}

// Go to the previous document
previousDocument() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
  }
}

// Go to the next document
nextDocument() {
  if (this.currentIndex < this.uploadedDocuments.length - 1) {
    this.currentIndex++;
  }
}
}
