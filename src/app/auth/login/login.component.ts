import { Component } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm = new FormGroup({
    userName: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });
  myToken: any;
  role: any;
  isCaptchaVerified = false; // Tracks captcha status
  captchaError = false; // Tracks if captcha error should be displayed
  loginError = false; // Tracks if login failed

  constructor(private authService: AuthService, private router: Router) { }
  // Handle Captcha Verification Status
  onCaptchaVerified(verified: boolean) {
    this.isCaptchaVerified = verified;
    if (verified) {
      this.captchaError = false; 
    }
  }
  // Check if a field is invalid
  isFieldInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!control && control.invalid && (control.dirty || control.touched);
  }


  userId: any;

  // Handle Login
  onLogin() {
    if (!this.isCaptchaVerified) {
      this.captchaError = true; // Show error if captcha is not verified
      return;
    }

    this.authService.signIn(this.loginForm.value).subscribe({
      next: (response :any ) => {
        // Get token and role from response
        const data = response;
        this.myToken = data.headers.get('Jwt');
        localStorage.setItem('token', this.myToken);
        this.userId = response.body.userId;
        console.log(this.userId)
        localStorage.setItem('userId', this.userId);
        this.role = response.body;
        // Navigate based on role
        if (this.role.roleName === 'Admin') {
          alert("Login successful");
          this.router.navigateByUrl('/admin-dashboard');
        } else if(this.role.roleName === 'Customer') {
          alert("Login successful");
          this.router.navigateByUrl('/customer-dashboard');
        }else if(this.role.roleName === 'Agent'){
          alert("Login successful");
          this.router.navigateByUrl('/agent-dashboard');
        }
        else if(this.role.roleName === "Employee"){
          alert("Login successful");
          this.router.navigateByUrl('/employee-dashboard');
        }
        else  {
          alert("Login failed");
          this.router.navigateByUrl("");
        }
      },
      error: (error: HttpErrorResponse) => {
        this.showErrorPopup();
        console.error('Login Failed:', error);
      },
    })
  }
    // Show error popup
    showErrorPopup() {
      this.loginError = true;
  
      // Hide the popup automatically after 3 seconds
      setTimeout(() => {
        this.loginError = false;
      }, 3000);
    }
}
