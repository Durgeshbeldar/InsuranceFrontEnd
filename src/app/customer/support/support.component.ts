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
    this.loadCustomerQueries();
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
        this.showQueriesSection = true;
        this.showCreateQuerySection = false;
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

  // Manage Components 

  showQueriesSection: boolean = false;
  showCreateQuerySection: boolean = true;

  // Function to show "My Queries" section
  viewMyQueries() {
    this.showQueriesSection = true;
    this.showCreateQuerySection = false;
  }

  // Function to show "Create New Query" section
  createNewQuery() {
    this.showQueriesSection = false;
    this.showCreateQuerySection = true;
  }





  // View My Quries Code 

  customerQueries: any[] = [];
    scheme :any;
    filteredQueries: any[] = [];
    paginatedQueries: any[] = [];
    searchQuery: string = '';
    currentPage: number = 1;
    pageSize: number = 10;
    totalPagesArray: number[] = [];
    selectedQuery: any = null;
    responseMessage: string = '';
    employee:any;
  
    loadCustomerQueries() {
      this.userService.getCustomerQueries().subscribe({
        next: (response: any) => {
          this.customerQueries = response.data;
          this.customerQueries.filter((query : any)=> !query.isActive);
          this.filteredQueries = [...this.customerQueries];
          this.updatePagination();
        },
        error: (err) => console.error('Error fetching customer queries:', err)
      });
    }
    applyFilters() {
      this.filteredQueries = this.customerQueries.filter(query =>
        query.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        `${query.policyAccount?.customer?.firstName} ${query.policyAccount?.customer?.lastName}`
          .toLowerCase()
          .includes(this.searchQuery.toLowerCase())
      );
      this.currentPage = 1;
      this.updatePagination();
    }
  
    updatePagination() {
      const totalPages = Math.ceil(this.filteredQueries.length / this.pageSize);
      this.totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
      this.setPaginatedQueries();
    }
  
    setPaginatedQueries() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      this.paginatedQueries = this.filteredQueries.slice(startIndex, startIndex + this.pageSize);
    }
  
    changePageSize(event: any) {
      this.pageSize = +event.target.value;
      this.currentPage = 1;
      this.updatePagination();
    }
  
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.setPaginatedQueries();
      }
    }
  
    goToNextPage() {
      if (this.currentPage < this.totalPagesArray.length) {
        this.currentPage++;
        this.setPaginatedQueries();
      }
    }
  
    goToPage(page: number) {
      this.currentPage = page;
      this.setPaginatedQueries();
    }
  
   
  
    getEmployeeDetails(employeeId :any){
      
      this.userService.getEmployeeById(employeeId).subscribe({
        next: (response: any) => {
          console.log(response.data);
          this.employee = response.data;
        },
        error: (err) => console.error('Error fetching employee details:', err)
      })
    }

    viewDetails(query: any) {
      this.userService.getEmployeeById(query.resolvedBy).subscribe({
        next: (response: any) => {
          console.log(response.data);
          this.employee = response.data;
        },
        error: (err) => console.error('Error fetching employee details:', err)
      })
      this.selectedQuery = query; // Open details section
    }
    closeDetails() {
      this.selectedQuery = null; // Close details section
    }
  
}
