import { Component , OnInit} from '@angular/core';

@Component({
  selector: 'app-agent-transaction',
  templateUrl: './agent-transaction.component.html',
  styleUrls: ['./agent-transaction.component.css']
})
export class AgentTransactionComponent {
  transactions: any[];
  constructor(){
    this.transactions  = [
      { policyNo: '3fa85f64-5717-4562-b3fc-2c963f66afa6', installmentId: '12345678', transactionType: 'Deposit', paymentMethod: 'UPI', transactionDate: '2024-12-16T22:13:24.918Z', amount: 1000, status: 'Successful', description: 'Premium Payment' },
      { policyNo: '1ab25c64-5717-4562-b3fc-2c963f66abc9', installmentId: '22345678', transactionType: 'Withdraw', paymentMethod: 'Bank Transfer', transactionDate: '2024-12-14T18:10:24.918Z', amount: 500, status: 'Failed', description: 'Payout Failed' },
    ]
  }

  paginatedTransactions: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPages: number = 0;

  ngOnInit() {
    this.totalPages = Math.ceil(this.transactions.length / this.itemsPerPage);
    this.updatePagination();
  }

 

 

  applyFilter(event: any) {
    const filterValue = event.target.value.trim().toLowerCase();
    this.transactions = this.transactions.filter(transaction =>
      Object.values(transaction).some(value => 
        value?.toString().toLowerCase().includes(filterValue)
      )
    );
    this.updatePagination();
  }

  onPageSizeChange(event: any) {
    this.itemsPerPage = +event.target.value;
    this.updatePagination();
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedTransactions = this.transactions.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

}
