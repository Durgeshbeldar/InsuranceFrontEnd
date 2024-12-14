import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-verified-customers',
  templateUrl: './verified-customers.component.html',
  styleUrls: ['./verified-customers.component.css']
})
export class VerifiedCustomersComponent {
customers: any[] = [];
  paginatedCustomers: any[] = [];
  currentPage: number = 1;
  verifiedCustomers : any [] = []; //
  itemsPerPage: number = 5;
  totalPages: number = 1;
  selectedCustomer: any = null;

  constructor(private customerService: UserService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  loadCustomers() {
    this.customerService.getCustomers().subscribe((response: any) => {
      this.customers = response.data;
      this.verifiedCustomers = this.customers.filter(c => c.kycVerified);
      this.totalPages = Math.ceil(this.verifiedCustomers.length / this.itemsPerPage);
      this.updatePagination();
    });
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedCustomers = this.verifiedCustomers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  toggleCustomerDetails(customer: any) {
    if (this.selectedCustomer === customer) {
      this.selectedCustomer = null;
    } else {
      this.selectedCustomer = customer;
    }
  }

  onSalePolicy(customer: any) {
    alert(`Selling policy to ${customer.firstName} ${customer.lastName}`);
  }
}
