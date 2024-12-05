import { Component } from '@angular/core';
import { EventEmitter , Output } from '@angular/core';
@Component({
  selector: 'app-custom-captcha',
  templateUrl: './custom-captcha.component.html',
  styleUrls: ['./custom-captcha.component.css']
})
export class CustomCaptchaComponent {
  @Output() captchaVerifiedEvent = new EventEmitter<boolean>();
  captchaVerified = false; // Tracks if the captcha is verified
  isVerifying = false; // Tracks spinner animation state
  captchaClicked = false; // Tracks if the user interacted with the captcha

  onCaptchaClick() {
    if (!this.captchaVerified && !this.isVerifying) {
      this.captchaClicked = true; // Mark captcha as clicked
      this.isVerifying = true; // Start spinner animation

      setTimeout(() => {
        this.isVerifying = false; // Stop spinner animation
        this.captchaVerified = true; // Mark captcha as verified
        this.captchaVerifiedEvent.emit(true); 
      }, 2000); // Spinner duration (2 seconds)
    }
  }
}
