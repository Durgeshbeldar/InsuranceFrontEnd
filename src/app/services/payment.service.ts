import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
declare var Razorpay :any;
@Injectable({
  providedIn: 'root'
})

export class PaymentService {

  private razorpayLoaded: Promise<void>;
  transactionUrl = 'https://localhost:7191/api/PolicyTransaction';
  withDrawUrl = 'https://localhost:7191/api/WithdrawalRequest';

  constructor(private http : HttpClient) {
    this.razorpayLoaded = new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/checkout.js';
      script.onload = () => resolve();
      document.body.appendChild(script);
    });
  }

  addTransaction(data:any){
    return this.http.post(this.transactionUrl, data);
  }
  getTransactionsByCustomerId(customerId:any){
    return this.http.get(`${this.transactionUrl}/Customer/${customerId}`);
  }
  getTransactionsByUserId(userId:any){
    return this.http.get(`${this.transactionUrl}/User/${userId}`);
  }
  addWithdrawalRequest(data:any){
    return this.http.post(this.withDrawUrl, data);
  }

  getAllWithdrawRequests(){
    return this.http.get(this.withDrawUrl);
  }

  updateWithdrawalRequest(data:any){
    return this.http.put(this.withDrawUrl, data);
  }

  makePayment(dueAmount: any, customerName: any): Observable<any> {
    return new Observable((observer) => {
      this.razorpayLoaded.then(() => {
        const options = {
          key: 'rzp_test_RB0WElnRLezVJ5',
          amount: dueAmount * 100, 
          name: 'Ds Insurance Private Limited',
          description: 'Insurance Premium/EMI',
          handler: (response: any) => {
            console.log('✅ Payment Success:', response);

            // Success response
            observer.next({
              paymentId: response.razorpay_payment_id,
              status: true, // Payment successful
              method: 'Unknown' 
            });
            observer.complete();
          },
          prefill: {
            name: customerName
          },
          notes: {
            address: 'Ds Insurance Corporate Office',
          },
          theme: {
            color: '#F37254',
          },
        };

        try {
          const rzp1 = new Razorpay(options);
          rzp1.open();

          rzp1.on('payment.failed', (response: any) => {
            console.error('❌ Payment Failed:', response.error);

            // Failure response
            observer.next({
              paymentId: response.error.metadata.payment_id,
              status: false, // Payment failed
              method: 'Unknown' 
            });
            observer.complete();
          });
        } catch (error) {
          console.error('❌ Error creating Razorpay object:', error);
          observer.error(error);
        }
      });
    });
  }
}
