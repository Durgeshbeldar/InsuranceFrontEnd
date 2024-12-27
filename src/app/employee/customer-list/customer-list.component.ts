import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-manage-customers',
  templateUrl: './customer-list.component.html',
  styleUrls: ['./customer-list.component.css']
})
export class CustomerListComponent {
  customers: any[] = [];
  filteredCustomers: any[] = [];
  paginatedCustomers: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPagesArray: number[] = [];
  searchText: string = '';
  selectedDate: string | null = null;
  selectedCustomer: any = null;
  showEditModal: boolean = false;

  // Reactive Form for Editing Customer
  editCustomerForm: FormGroup = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    lastName: new FormControl('', [Validators.required, Validators.minLength(2)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d{10}$/)
    ]),
  });

  constructor(private customerService: UserService) {}

  ngOnInit() {
    this.loadCustomers();
  }

  // Load Customers Data
  loadCustomers() {
    this.customerService.getCustomers().subscribe((response: any) => {
      this.customers = response.data;
      this.filteredCustomers = [...this.customers];
      this.updatePagination();
    });
  }

  // Filter Customers
  applyFilters() {
    this.filteredCustomers = this.customers.filter((customer) => {
      const matchesSearch = this.searchText
        ? `${customer.firstName} ${customer.lastName}`.toLowerCase().includes(this.searchText.toLowerCase())
        : true;

      const matchesDate = this.selectedDate
        ? new Date(customer.createdAt).toISOString().split('T')[0] === this.selectedDate
        : true;

      return matchesSearch && matchesDate;
    });
    this.updatePagination();
  }

  // Pagination Methods
  updatePagination() {
    const totalPages = Math.ceil(this.filteredCustomers.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    this.setPaginatedCustomers();
  }

  setPaginatedCustomers() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedCustomers = this.filteredCustomers.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePageSize(event: any) {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.currentPage = 1;
    this.updatePagination();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginatedCustomers();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPagesArray.length) {
      this.currentPage++;
      this.setPaginatedCustomers();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.setPaginatedCustomers();
  }

  // View Details Modal
  toggleCustomerDetails(customer: any) {
    this.selectedCustomer = this.selectedCustomer === customer ? null : customer;
  }

 

  closeCustomerDetails() {
    this.selectedCustomer = null;
  }
  calculateAge(dateOfBirth: string): number {
    const dob = new Date(dateOfBirth);
    const diff = Date.now() - dob.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }
  toggleCustomerStatus(customer: any, isActive: boolean) {
    customer.user.isActive = isActive;
    const user = customer.user;
    this.customerService.updateUser(user).subscribe({
      next: () => {
        alert("User Status Changed");
        console.log(`Customer ${isActive ? 'activated' : 'deactivated'} successfully!`);
      },
      error: (err) => {
        console.error('Error updating customer status:', err);
      }
    });
  }

  // Verify Customer KYC
  verifyCustomer(customer: any) {
    const payload = { customerId: customer.customerId, kycVerified: true };
    this.customerService.changeKycStatus(payload).subscribe(() => {
      customer.kycVerified = true;
      alert('Customer KYC verified successfully!');
    });
  }

  // Edit Customer Modal Handling
  openEditModal(customer: any) {
    this.selectedCustomer = customer;
    this.editCustomerForm.patchValue({
      firstName: customer.firstName,
      lastName: customer.lastName,
      email: customer.user.email,
      phoneNumber: customer.phoneNumber,
    });
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedCustomer = null;
    this.editCustomerForm.reset();
  }

  // Submit Edit Form
  submitEditForm() {
    if (this.editCustomerForm.invalid) {
      return;
    }

    // Update selectedCustomer with form values
    this.selectedCustomer.firstName = this.editCustomerForm.get('firstName')?.value;
    this.selectedCustomer.lastName = this.editCustomerForm.get('lastName')?.value;
    this.selectedCustomer.user.email = this.editCustomerForm.get('email')?.value;
    this.selectedCustomer.user.phoneNumber = this.editCustomerForm.get('phoneNumber')?.value;

    const user =this.selectedCustomer.user;
    this.customerService.updateUser(user).subscribe({
      next:()=>{
        console.log('User updated successfully');
        this.updateCustomer();
      },
      error:(error)=>{
        console.log('error while updating user', error);
      }
    })
  }
 updateCustomer(){
  this.customerService.updateCustomer(this.selectedCustomer).subscribe({
    next: () => {
      alert('Customer updated successfully!');
      this.loadCustomers(); // Reload data
      this.closeEditModal();
    },
    error: (err) => {
      console.error('Error updating customer:', err);
    }
  });
 }
}
