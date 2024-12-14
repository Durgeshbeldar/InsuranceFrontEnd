import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-agent-registration',
  templateUrl: './agent-registration.component.html',
  styleUrls: ['./agent-registration.component.css']
})
export class AgentRegistrationComponent {
  isCaptchaVerified = false; // Tracks captcha status
  captchaError = false; // 
  roleId = "0034233c-1575-4bb5-47d6-08dd191da96b";
  registrationForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[0-9]{10}$/) 
    ]),
    roleId: new FormControl(),
  });
    // Handle Captcha Verification
    onCaptchaVerified(verified: boolean) {
      this.isCaptchaVerified = verified;
      if (verified) {
        this.captchaError = false; // Clear error if verified
      }
    }

 

  constructor(private userService: UserService, private router: Router) {
  }

  // Fetch roles from API

  // Field validation
  isFieldInvalid(field: string): boolean {
    const control = this.registrationForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }

  // Handle Registration
  onRegister() {
    if (this.registrationForm.valid) {
      const formData = {
        ...this.registrationForm.value,
        roleId : this.roleId,
      }
      this.userService.addUser(formData).subscribe({
        next: (response) => {
          alert('Registration successful!');
          this.router.navigateByUrl('/login');
        },
        error: (err) => console.error('Registration failed:', err),
      });
    } else {
      console.warn('Form is invalid. Please fill out all fields correctly.');
    }
  }
}
