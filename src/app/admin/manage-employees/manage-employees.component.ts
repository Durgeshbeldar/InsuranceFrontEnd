import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.css']
})
export class ManageEmployeesComponent {

  employees: any[] = [];
  filteredEmployees: any[] = [];
  paginatedEmployees: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPagesArray: number[] = [];
  searchText: string = '';
  selectedDate: string | null = null;
  showEmployeeDetails: boolean = false;
  selectedEmployee: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadEmployees();
  }

  loadEmployees() {
    this.userService.getEmployees().subscribe((response: any) => {
      this.employees = response.data;
      this.filteredEmployees = [...this.employees];
      this.updatePagination();
    });
  }

  calculateAge(dateOfBirth: string): number {
    const dob = new Date(dateOfBirth);
    const diff = Date.now() - dob.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  applyFilters() {
    this.filteredEmployees = this.employees.filter((employee) => {
      const matchesSearch = this.searchText
        ? `${employee.firstName} ${employee.lastName}`.toLowerCase().includes(this.searchText.toLowerCase())
        : true;

      const matchesDate = this.selectedDate
        ? new Date(employee.joiningDate).toISOString().split('T')[0] === this.selectedDate
        : true;

      return matchesSearch && matchesDate;
    });
    this.updatePagination();
  }

  updatePagination() {
    const totalPages = Math.ceil(this.filteredEmployees.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    this.setPaginatedEmployees();
  }

  setPaginatedEmployees() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedEmployees = this.filteredEmployees.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePageSize(event: any) {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.currentPage = 1;
    this.updatePagination();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginatedEmployees();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPagesArray.length) {
      this.currentPage++;
      this.setPaginatedEmployees();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.setPaginatedEmployees();
  }

  toggleEmployeeStatus(employee: any, isActive: boolean) {
    employee.user.isActive = isActive;
    const user = employee.user;
    user.isActive = isActive;
    this.userService.updateUser(user).subscribe({
      next: () => alert('Employee status updated successfully!'),
      error: (error) => console.error('Error updating status:', error)
    });
  }

  viewDetails(employee: any) {
    this.selectedEmployee = employee;
    this.showEmployeeDetails = true;
  }

  closeEmployeeDetails() {
    this.showEmployeeDetails = false;
    this.selectedEmployee = null;
  }

  showEditModal: boolean = false;

editEmployeeForm: FormGroup = new FormGroup({
  firstName: new FormControl('', Validators.required),
  lastName: new FormControl('', Validators.required),
  email: new FormControl('', [Validators.required, Validators.email]),
  phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)])
});



// Open Modal
openEditModal(employee: any) {
  this.selectedEmployee = employee;
  this.editEmployeeForm.patchValue({
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.user.email,
    phoneNumber: employee.user.phoneNumber
  });
  this.showEditModal = true;
}

// Close Modal
closeEditModal() {
  this.showEditModal = false;
  this.selectedEmployee = null;
  this.editEmployeeForm.reset();
}

// Submit Form
submitEditForm() {
  if (this.editEmployeeForm.invalid) return;

  // Update employee details from the form
  this.selectedEmployee.user.email = this.editEmployeeForm.get('email')?.value;
  this.selectedEmployee.user.phoneNumber = this.editEmployeeForm.get('phoneNumber')?.value;
  this.selectedEmployee.firstName = this.editEmployeeForm.get('firstName')?.value;
  this.selectedEmployee.lastName = this.editEmployeeForm.get('lastName')?.value;

  console.log(this.selectedEmployee);
  const user = this.selectedEmployee.user;

  // Update User
  this.userService.updateUser(user).subscribe({
    next: () => {
      console.log("User updated successfully");
      this.updateEmployee();
    },
    error: (err) => {
      console.log("Failed to update user", err);
    }
  });
}

// Update Employee
updateEmployee() {
  this.userService.updateEmployee(this.selectedEmployee).subscribe({
    next: () => {
      alert('Employee updated successfully!');
      this.loadEmployees();
      this.closeEditModal();
    },
    error: (err) => {
      console.error('Error updating employee:', err);
    }
  });
}
}
