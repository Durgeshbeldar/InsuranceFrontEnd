import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { PaymentService } from 'src/app/services/payment.service';
@Component({
  selector: 'app-total-commission',
  templateUrl: './total-commission.component.html',
  styleUrls: ['./total-commission.component.css']
})
export class TotalCommissionComponent {

  constructor(private userService: UserService, private paymentService: PaymentService) {
    this.loadAgentDetails();
  }
  agent: any = {};
  loadAgentDetails() {
    this.userService.getAgentById(localStorage.getItem('userId')).subscribe({
      next: (response: any) => {
        this.agent = response.data;
        console.log("agent data is ", this.agent);
        this.walletBalance = this.agent.walletBalance;
        this.totalCommission = this.agent.totalCommission;
      },
      error: (err: any) => {
        console.error('Error fetching agent:', err);
      }
    })
  }
  walletBalance: number = 0// Static for now, replace with API response later
  totalCommission: number = 0 // Static for now
  isCardVisible: boolean = false;
  selectedCardTitle: string = '';
  animatedValue: number = 0;
  withdrawAmount: number | null = null;
  errorMessage: string | null = null;
  isAmountValid: boolean = false;


  withdrawForm = new FormGroup({
    withdrawAmount: new FormControl('', [
      Validators.required,
      Validators.min(500), // Amount should be at least 500
      Validators.max(this.walletBalance) // Amount should not be greater than the wallet balance
    ])
  });

  withdrawRequest() {
   
    const payload = {
      agentId: this.agent.agentId,
      amount: this.withdrawForm.get('withdrawAmount')?.value,
      status: "Pending",
      requestDate: new Date().toISOString()
    }
    console.log(payload)
    this.paymentService.addWithdrawalRequest(payload).subscribe({
      next: () => {
        alert('Withdrawal Request Sent Successfully!');
        this.withdrawForm.reset();
      },
      error: (err: any) => {
        this.errorMessage = 'Error requesting withdrawal!';
      }
    })
  }


  // To Show Wallet Balance Details
  showWalletBalance() {
    this.selectedCardTitle = 'Wallet Balance';
    this.animateCountUp(0, this.walletBalance);
  }

  // To Show Total Commission Details
  showTotalCommission() {
    this.selectedCardTitle = 'Total Money Earned';
    this.animateCountUp(0, this.totalCommission);
  }

  // Count-Up Animation Logic
  animateCountUp(start: number, end: number) {
    this.isCardVisible = true;
    let current = start;
    const increment = Math.ceil(end / 100); // Speed control for count animation
    const duration = 20; // Delay in milliseconds

    const timer = setInterval(() => {
      current += increment;
      this.animatedValue = current;

      if (current >= end) {
        this.animatedValue = end; // Ensures exact final value
        clearInterval(timer);
      }
    }, duration);
  }


}
