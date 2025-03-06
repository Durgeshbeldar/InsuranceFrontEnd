import { Component } from '@angular/core';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent {
  finalValues = {
    sales:160000 ,
    users: 52,
    happyCustomers: 45,
    claims: 173000
  };

   // Animated values bound to the HTML
   animatedValues = {
    sales: 0,
    users: 0,
    happyCustomers: 0,
    claims: 0
  };

  ngOnInit() {
    this.animateNumbers();
  }

  animateNumbers() {
    const duration = 2000; // Total animation time in ms
    const frameRate = 20; // Update every 20ms
    const steps = duration / frameRate;

    Object.keys(this.finalValues).forEach((key) => {
      const increment = this.finalValues[key as keyof typeof this.finalValues] / steps;
      let currentValue = 0;

      const interval = setInterval(() => {
        currentValue += increment;
        if (currentValue >= this.finalValues[key as keyof typeof this.finalValues]) {
          this.animatedValues[key as keyof typeof this.animatedValues] = this.finalValues[key as keyof typeof this.finalValues];
          clearInterval(interval); // Stop when the final value is reached
        } else {
          this.animatedValues[key as keyof typeof this.animatedValues] = Math.round(currentValue);
        }
      }, frameRate);
    });
  }
}
