import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent {
  isEmployeeDetailsVisible = false;
  userId: string | null = null;
  roles: { roleId: string; roleName: string }[] = [];
  constructor(private userService: UserService) {
    this.loadRoles();
  }
  loadRoles() {
    this.userService.getRoles().subscribe({
      next: (response: any) => {
        // Extract roles from API response
        this.roles = response?.data || [];
        console.log('Roles loaded successfully:', this.roles);
      },
      error: (error: any) => {
        console.error('Error fetching roles:', error);
      }
    });
  }
  userForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    roleId: new FormControl('', Validators.required)
  });

  employeeForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl(false), // Default to Female
    salary: new FormControl(0, [Validators.required, Validators.min(0)]),
    department: new FormControl('', Validators.required),
    joiningDate: new FormControl('', Validators.required),
  });

  departments: string[] = ['Claims', 'Underwriting', 'Support', 'Marketing'];

  addUser() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe({
        next: (response: any) => {
          this.userId = response.id;
          this.isEmployeeDetailsVisible = true;
          alert('User Id created successfully!');
        },
        error: (err) => console.error('Error creating user:', err)
      });
    }
  }

  addEmployeeDetails() {
    if (this.employeeForm.valid && this.userId) {
      const employeeData = {
        employeeId: this.userId,
        ...this.employeeForm.value,
        gender: this.employeeForm.get('gender')?.value ? 'Male' : 'Female',
      };

      this.userService.addEmployee(employeeData).subscribe({
        next: () => {
          alert('Employee details added successfully!');
          this.isEmployeeDetailsVisible = false;
          this.userForm.reset();
          this.employeeForm.reset();
        },
        error: (err) => console.error('Error adding employee details:', err)
      });
    }
  }

  onCancel() {
    if (this.userId != null) {
      this.userService.hardDeleteUser(this.userId).subscribe({
        next: (response: any) => {
          console.log('User deleted successfully:', response);
          this.isEmployeeDetailsVisible = false;
          this.userForm.reset();
          this.employeeForm.reset();
          this.userId = null;
        },
        error: (error: any) => console.error('Error deleting user:', error)  // Error handling
      })
    } else if (this.isEmployeeDetailsVisible) {
      this.isEmployeeDetailsVisible = false;
      this.userForm.reset();
      this.employeeForm.reset();
    }
  }
}
