import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { InsuranceService } from 'src/app/services/insurance.service';
@Component({
  selector: 'app-customer-queries',
  templateUrl: './customer-queries.component.html',
  styleUrls: ['./customer-queries.component.css']
})
export class CustomerQueriesComponent {

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

  constructor(private userService: UserService , private insuranceService : InsuranceService) {}

  ngOnInit(): void {
    this.loadCustomerQueries();
    this.getEmployeeDetails(localStorage.getItem('userId'));
  }

  loadCustomerQueries() {
    this.userService.getCustomerQueries().subscribe({
      next: (response: any) => {
        this.customerQueries = response.data.filter((query :any)=> query.isActive);
        
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

  showResponseSection(query: any) {
    this.insuranceService.getInsuranceSchemeById(query.policyAccount.schemeId).subscribe({
      next: (response: any) => {
        this.scheme = response.data;
      },
      error: (err) => console.error('Error fetching insurance scheme:', err)
    })
    this.selectedQuery = query;
    this.responseMessage = '';
  }

  cancelResponse() {
    this.selectedQuery = null;
    this.responseMessage = '';
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
  // submitResponse(query: any) {
  //   if (!this.responseMessage.trim()) {
  //     alert('Please enter a response.');
  //     return;
  //   }
  //   query.response = this.responseMessage;
  //   query.resolvedBy = this.employee.employeeId;
  //   query.resolvedAt = new Date().toISOString();
  //   console.log(query);
  //   this.userService.updateQueryResponse(query).subscribe({
  //     next: () => {
  //       alert('Response submitted successfully!');
  //       this.selectedQuery = null;
  //       this.responseMessage = '';
  //       this.loadCustomerQueries();
  //     },
  //     error: (err) => console.error('Error submitting response:', err)
  //   });
  // }

  submitResponse(query: any) {
    if (!this.responseMessage.trim()) {
      alert('Please enter a response.');
      return;
    }
  
    if (this.responseMessage.length > 100) {
      alert('Response message should be less than 100 characters.');
      return;
    }
  
    const payload = {
      queryId: query.queryId,
      customerId: query.customerId,
      policyNo: query.policyNo,
      title: query.title,
      description: query.description ?? null,
      response: this.responseMessage,
      resolvedBy: this.employee.employeeId,
      createdAt: query.createdAt,
      resolvedAt: new Date().toISOString(),
      isActive: true
    };
  
    console.log('Payload being sent:', payload);
  
    this.userService.updateQueryResponse(payload).subscribe({
      next: () => {
        alert('Response submitted successfully!');
        this.selectedQuery = null;
        this.responseMessage = '';
        this.loadCustomerQueries();
      },
      error: (err) => {
        console.error('Error submitting response:', err);
        if (err.status === 500) {
          alert('Server error occurred. Please try again later.');
        }
      }
    });
  }
  

  closeQuery(query: any) {
    const payload = {
      queryId: query.queryId,
      customerId: query.customerId,
      policyNo: query.policyNo,
      title: query.title,
      description: query.description ?? null,
      response: query.response,
      resolvedBy: query.resolvedBy,
      createdAt: query.createdAt,
      resolvedAt: query.resolvedAt,
      isActive: false
    };
  
    this.userService.updateQueryResponse(payload).subscribe({
      next: () => {
        alert('Query Closed successfully!');
        this.selectedQuery = null;
        this.responseMessage = '';
        this.loadCustomerQueries();
      },
      error: (err) => {
        console.error('Error While Closing Ticket response:', err);
        if (err.status === 500) {
          alert('Server error occurred. Please try again later.');
        }
      }
    });
  }
}
