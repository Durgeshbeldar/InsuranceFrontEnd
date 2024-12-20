import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-customer-list',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
 customers: any[] = [];
  paginatedCustomers: any[] = [];
  currentPage: number = 1;
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
      this.totalPages = Math.ceil(this.customers.length / this.itemsPerPage);
      this.updatePagination();
    });
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedCustomers = this.customers.slice(startIndex, startIndex + this.itemsPerPage);
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
  verifyCustomer(customer: any) {
    const payload = {
      customerId : customer.customerId,
      kycVerified: true
    }
    this.customerService.changeKycStatus(payload).subscribe({
      next: () => {
        customer.kycVerified = true;
        alert('Customer KYC verified successfully!');
      },
      error: (err) => console.error('Error verifying KYC:', err)
    })
  }
  onSalePolicy(customer: any) {
    alert(`Selling policy to ${customer.firstName} ${customer.lastName}`);
  }
}
