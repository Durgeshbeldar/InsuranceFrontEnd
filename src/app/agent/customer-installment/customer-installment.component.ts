import { Component } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {PaymentService} from 'src/app/services/payment.service';
@Component({
  selector: 'app-customer-installment',
  templateUrl: './customer-installment.component.html',
  styleUrls: ['./customer-installment.component.css']
})
export class CustomerInstallmentComponent {

  customers: any[] = [];
  policies: any[] = [];
  installments: any[] = [];
  selectedCustomer: any = null;
  selectedPolicy: any = null;
  isLoading: boolean = false; // Loading indicator
  showInstallmentsTable: boolean = false; // Show or hide the installment table

  constructor(private paymentService: PaymentService,
    private userService: UserService, private insuranceService: InsuranceService) {}

  ngOnInit() {
    this.policyForm = new FormGroup({
      customerId: new FormControl('', Validators.required),
      policyNo: new FormControl('', Validators.required)
    });

    this.loadCustomers();
  }


  // Form for the two dropdowns
  policyForm = new FormGroup({
    customerId: new FormControl('', Validators.required),
    policyNo: new FormControl('', Validators.required),
  });

  // Load customers from the API
  loadCustomers() {
    this.userService.getCustomers().subscribe({
      next: (response: any) => {
        this.customers = response.data;
      },
      error: (err) => console.error('Error loading customers:', err)
    });
  }

  // When customer is selected, fetch their policies

  onCustomerChange(event: any) {
    const customerId = event.target.value;
    this.policies = [];
    this.policyForm.patchValue({ customerId }); // Update form value
    this.showInstallmentsTable = false; // Reset table view

    this.insuranceService.getPolicyAccountsByCustomerId(customerId).subscribe({
      next: (response: any) => {
        this.policies = response.data;
      },
      error: (err) => console.error('Error loading policies:', err)
    });
  }

  // When a policy is selected, fetch its installments
  onPolicyChange(event: any) {
    const policyNo = event.target.value;
    this.policyForm.patchValue({ policyNo });
    this.selectedPolicy = this.policies.find((policy) => policy.policyNo === policyNo);

    // Fetch the installment schedule for the selected policy
    this.fetchInstallmentSchedule(policyNo);
  }

  canPayInstallment(index: number): boolean {
    // The first installment can be paid if unpaid
    if (index === 0) {
      return this.installments[index]?.status !== 'Paid';
    }

    // Enable the pay button only if the previous installment is "Paid"
    const previousInstallment = this.installments[index - 1];
    return previousInstallment?.status === 'Paid' && this.installments[index]?.status !== 'Paid';
  }

  // payInstallment(installment: any) {
  //   console.log(installment)
  //   const amount = installment.amountDue;
  //   const customerName = this.selectedPolicy.customer.customerName;
  //   this.paymentService.makePayment(amount, customerName).subscribe({
  //     next: (response:any) => {
  //       installment.status = 'Paid';
  //       console.log(response);
  //       alert('Installment paid successfully!');
  //     },
  //     error: (err :any)  => console.error('Error making payment:', err)
  //   })
  // }

  payInstallment(installment: any) {
    console.log(installment);
    const amount = installment.amountDue;
    const customerName = this.selectedPolicy.customer.customerName;
    this.paymentService.makePayment(amount, customerName).subscribe({
      next: (response: any) => {
        console.log('Payment Response:', response);
        if (response.status) {
          this.updateInstallment(installment);
          this.updatePolicyAccount(amount);
          alert("Installment paid successfully!");
        } else {
          alert('Payment failed! Please try again.');
          this.updateTransactionTable(installment, false);
        }
      },
      error: (err: any) =>{ 
        console.error('Error while making payment:', err)
        this.updateTransactionTable(installment, false);
      }
    });
  }

  updateInstallment(installment:any){
      installment.status = "Paid";
      installment.paymentDate = new Date().toISOString();
      installment.paymentMethod = "Debit Card";
      this.insuranceService.updateInstallment(installment).subscribe({
        next: () => {
          console.log('Installment updated successfully!');
          this.updateTransactionTable(installment, true);
        },
        error: (err) => console.error('Error updating installment:', err)
      })
  }

  updatePolicyAccount(amount : any){
    this.selectedPolicy.totalPaidAmount = this.selectedPolicy.totalPaidAmount + amount;
    this.insuranceService.updatePolicyAccount(this.selectedPolicy).subscribe({
      next: () => {
        console.log('Policy Account updated successfully!');
        this.fetchInstallmentSchedule(this.selectedPolicy.policyNo);
      },
      error: (err) => console.error('Error updating policy account:', err)
    })
  }
  updateTransactionTable(installment:any, isTrue:boolean){
    const payload = {
      policyNo: this.selectedPolicy.policyNo,
      installmentId : installment.installmentId,
      transactionType : "Premium Amount/EMI",
      transactionDate : new Date().toISOString(),
      transactionAmount : installment.amountDue,
      status : isTrue ? "Successful" : "Failed"
    }
    this.paymentService.addTransaction(payload).subscribe({
      next: () =>{
        alert("Transaction History Saved!")
        console.log('Transaction added successfully!')
      } ,
      error: (err) =>{ console.error('Error adding transaction:', err)}
    });
  }
  
  // Fetch installment schedule by policyNo
  fetchInstallmentSchedule(policyNo: string) {
    this.isLoading = true;
    this.insuranceService.getInstallmentsByPolicyId(policyNo).subscribe({
      next: (response: any) => {
        this.installments = response;
        console.log(this.installments);
        this.showInstallmentsTable = true;
      },
      error: (err) => console.error('Error loading installments:', err),
      complete: () => (this.isLoading = false)
    });
  }
}