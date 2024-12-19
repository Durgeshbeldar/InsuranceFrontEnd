import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
import { LocationService } from 'src/app/services/location.service';
import { EmailService } from 'src/app/services/email.service';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.css']
})
export class AddCustomerComponent {

  isUserAdded = false;
  roleId = "43bdb71b-24b3-49d0-47d5-08dd191da96b";
  states: any;
  cities: any;

  constructor(private userService: UserService, private locationService: LocationService, private emailService: EmailService) {

  }
  agentId: any;
  getAgent() {
    this.agentId = localStorage.getItem('userId');
  }
  ngOnInit(): void {
    this.loadStates();
    this.getAgent();
  }

  loadStates() {
    this.locationService.getStates().subscribe({
      next: (response: any) => {
        this.states = response.data;
      },
      error: (err) => console.error('Error loading states:', err)
    });
  }

  addressForm = new FormGroup({
    houseNo: new FormControl('', Validators.required),
    street: new FormControl('', Validators.required),
    town: new FormControl('', Validators.required),
    stateId: new FormControl('', Validators.required),
    cityId: new FormControl('', Validators.required),
    pincode: new FormControl('', [Validators.required, Validators.pattern(/^\d{6}$/)]) // 6-digit pincode validation
  });
  // User Details Form
  userForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ]),
    roleId: new FormControl()
  })

  // Customer Details Form
  customerForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl(false),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/)
    ])
  });

  onStateChange(event: Event) {
    this.addressForm.get('cityId')?.reset(); // Clear previous city selection
    const stateId = (event.target as HTMLSelectElement).value; // Get selected state ID
    this.locationService.getCitiesByStateId(stateId).subscribe({
      next: (response: any) => {
        this.cities = response;
      },
      error: (err) => console.error('Error loading cities:', err)
    });
  }

  userName: any;
  userId: any;

  // On Submit Handlers
  addUser() {
    if (this.userForm.valid) {

      const formData = {
        ...this.userForm.value,
        roleId: this.roleId,

      }
      this.userService.addUser(formData).subscribe({
        next: (response: any) => {
          this.isUserAdded = true;
          this.userId = response.id;
          alert("User Id Created Successfully");
        },
        error: (error: any) => console.error('Error adding user', error)  // Error handling
      });
    } else {
      console.warn('Form is invalid, please fill out all fields correctly.');
    }
  }

  // Add Customer Details
  addCustomerDetails() {
    const firstName = this.customerForm.get('firstName')?.value;
    const lastName = this.customerForm.get('lastName')?.value;
    const name = `${firstName} ${lastName}`;
    const userName = this.userForm.get('userName')?.value;
    const password = this.userForm.get('password')?.value;
    const email = this.userForm.get('email')?.value;

    if (this.customerForm.valid && this.userId != null) {
      const formData = {
        customerId: this.userId,
        firstName: this.customerForm.get('firstName')?.value,
        lastName: this.customerForm.get('lastName')?.value,
        dateOfBirth: this.customerForm.get('dateOfBirth')?.value,
        phoneNumber: this.customerForm.get('phoneNumber')?.value,
        gender: this.customerForm.get('gender')?.value ? 'Male' : 'Female',
        agentId: this.agentId
      };
      console.log('Payload being sent:', formData);

      this.userService.addCustomer(formData).subscribe({
        next: () => {
          alert('Customer Details Added Successfully');
          this.sendCredentialsToCustomer(name, userName, password, email);
          this.isUserAdded = false;
          this.userForm.reset();
          this.customerForm.reset();
        },
        error: (error: any) => console.error('Error adding customer', error)
      });
    } else {
      console.warn('Form is invalid, please fill out all fields correctly.');
    }
  }

  sendCredentialsToCustomer(name: any, username: any, password: any, email: any) {

    this.emailService.sendCredentials(name, email, username, password).then(() => {
      alert('Email sent successfully!');
    })
      .catch((error) => {
        console.error('Error sending email:', error);
      });
  }

  addAddress() {
    console.log("Address Payload", this.addressForm.value);
    if (this.addressForm.invalid) {
      this.addressForm.markAllAsTouched();
      return;
    }

    const addressData = this.addressForm.value;

    // Call API to add the address
    this.locationService.addAddress(addressData).subscribe({
      next: (response: any) => {
        alert('Address added successfully!');
        this.addressForm.reset();
        this.cities = [];
      },
      error: (err) => {
        console.error('Error adding address:', err);
        alert('Failed to add address. Please try again.');
      }
    });
  }
  // On Cancel Handler
  onCancel() {
    if (this.userId != null) {
      this.userService.hardDeleteUser(this.userId).subscribe({
        next: (response: any) => {
          console.log('User deleted successfully:', response);
          this.isUserAdded = false;
          this.userForm.reset();
          this.customerForm.reset();
          this.userId = null;
        },
        error: (error: any) => console.error('Error deleting user:', error)  // Error handling
      })
    }
    else if (this.isUserAdded) {
      this.isUserAdded = false;
      this.userForm.reset();
      this.customerForm.reset();
    }
  }
  onCancel3() {
    this.addressForm.reset();
    this.cities = []; // Reset cities list
  }
}
