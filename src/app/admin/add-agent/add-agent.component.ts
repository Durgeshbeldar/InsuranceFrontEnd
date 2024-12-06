import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-add-agent',
  templateUrl: './add-agent.component.html',
  styleUrls: ['./add-agent.component.css']
})
export class AddAgentComponent {
  isAgentDetailsVisible = false;

  constructor(private userService: UserService) {
    this.loadRoles();
  }

  // User Form
  userForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]),
    roleId: new FormControl('', Validators.required),
  });

  // Agent Form
  agentForm = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    dateOfBirth: new FormControl('', Validators.required),
    gender: new FormControl(false),
    activeSince: new FormControl('', Validators.required),
  });

  roles: { roleId: string; roleName: string }[] = [];
  userId: any;

  loadRoles() {
    this.userService.getRoles().subscribe({
      next: (response: any) => {
        this.roles = response?.data || [];
      },
      error: (error: any) => console.error('Error fetching roles:', error),
    });
  }

  // Add User
  addUser() {
    if (this.userForm.valid) {
      this.userService.addUser(this.userForm.value).subscribe({
        next: (response: any) => {
          this.userId = response.id;
          this.isAgentDetailsVisible = true;
        },
        error: (error: any) => console.error('Error adding user:', error),
      });
    }
  }

  // Add Agent Details
  addAgentDetails() {
    if (this.agentForm.valid && this.userId) {
      const agentData = {
        agentId: this.userId,
        firstName: this.agentForm.get('firstName')?.value,
        lastName: this.agentForm.get('lastName')?.value,
        dateOfBirth: this.agentForm.get('dateOfBirth')?.value,
        gender: this.agentForm.get('gender')?.value ? 'Male' : 'Female',
        activeSince: this.agentForm.get('activeSince')?.value,
      };

      this.userService.addAgent(agentData).subscribe({
        next: () => {
          alert('Agent Added Successfully');
          this.isAgentDetailsVisible = false;
          this.userForm.reset();
          this.agentForm.reset();
        },
        error: (error: any) => console.error('Error adding agent:', error),
      });
    }
  }

  onCancel() {
    this.isAgentDetailsVisible = false;
    this.userForm.reset();
    this.agentForm.reset();
  }
}
