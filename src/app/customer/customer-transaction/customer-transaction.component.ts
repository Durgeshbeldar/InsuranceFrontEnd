import { Component,ViewChild, ElementRef } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
@Component({
  selector: 'app-customer-transaction',
  templateUrl: './customer-transaction.component.html',
  styleUrls: ['./customer-transaction.component.css']
})
export class CustomerTransactionComponent {

  transactions: any[] = [];
  filteredTransactions: any[] = [];
  paginatedTransactions: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPagesArray: number[] = [];

  @ViewChild('dateInput', { static: false }) dateInput!: ElementRef<HTMLInputElement>; 
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(private paymentService: PaymentService) {}

  ngOnInit(): void {
    this.loadTransactionsByPolicyId();
  }

  loadTransactionsByPolicyId() {
    const customerId = localStorage.getItem('userId'); // Use the correct policy ID
    this.paymentService.getTransactionsByUserId(customerId).subscribe((response: any) => {
      this.transactions = response.data;
      this.filteredTransactions = [...this.transactions];
      console.log(this.filteredTransactions);
      this.updatePagination();
    });
  }

  applyFilters() {
    const searchQuery = this.searchInput.nativeElement.value.toLowerCase();
    const selectedDate = this.dateInput?.nativeElement.value || '';

    this.filteredTransactions = this.transactions.filter(transaction => 
      (transaction.transactionType.toLowerCase().includes(searchQuery) || 
      transaction.paymentMethod.toLowerCase().includes(searchQuery) || 
      transaction.description.toLowerCase().includes(searchQuery)) && 
      (!selectedDate || transaction.transactionDate.includes(selectedDate))
    );

    this.updatePagination();
  }

  filterByDate(event: any) {
    this.applyFilters();
  }

  updatePagination() {
    this.totalPagesArray = Array.from(
      { length: Math.ceil(this.filteredTransactions.length / this.itemsPerPage) },
      (_, i) => i + 1
    );
    this.setPaginatedTransactions();
  }

  changePageSize(event: any) {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.currentPage = 1; 
    this.updatePagination();
  }

  setPaginatedTransactions() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedTransactions = this.filteredTransactions.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginatedTransactions();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPagesArray.length) {
      this.currentPage++;
      this.setPaginatedTransactions();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.setPaginatedTransactions();
  }

  triggerDateInput() {
    this.dateInput?.nativeElement.showPicker();
  }
}
