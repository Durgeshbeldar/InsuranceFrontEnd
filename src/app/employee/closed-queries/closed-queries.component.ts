import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { InsuranceService } from 'src/app/services/insurance.service';
@Component({
  selector: 'app-closed-queries',
  templateUrl: './closed-queries.component.html',
  styleUrls: ['./closed-queries.component.css']
})
export class ClosedQueriesComponent {
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
    }
  
    loadCustomerQueries() {
      this.userService.getCustomerQueries().subscribe({
        next: (response: any) => {
          this.customerQueries = response.data.filter((query:any)=> !query.isActive);
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
