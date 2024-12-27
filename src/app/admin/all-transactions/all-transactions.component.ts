import { Component , ElementRef, ViewChild} from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';

@Component({
  selector: 'app-all-transactions',
  templateUrl: './all-transactions.component.html',
  styleUrls: ['./all-transactions.component.css']
})
export class AllTransactionsComponent {
transactions: any[] = [];
    filteredTransactions: any[] = [];
    paginatedTransactions: any[] = [];
    currentPage: number = 1;
    itemsPerPage: number = 10;
    totalPagesArray: number[] = [];
    searchText: string ='';
  
    @ViewChild('dateInput', { static: false }) dateInput!: ElementRef<HTMLInputElement>; 
    @ViewChild('searchInput', { static: false }) searchInput!: ElementRef<HTMLInputElement>;
  
    constructor(private paymentService: PaymentService) {}
  
    ngOnInit(): void {
      this.loadTransactionsByPolicyId();
    }
  
    loadTransactionsByPolicyId() {
   
      this.paymentService.getAllTransactions().subscribe((response: any) => {
        this.transactions = response.data;
        this.filteredTransactions = [...this.transactions];
        console.log(this.filteredTransactions);
        this.updatePagination();
      });
    }
  
    applyFilters() {
      const searchQuery = this.searchInput?.nativeElement.value.toLowerCase() || '';
      const selectedDate = this.dateInput?.nativeElement.value || '';
    
      this.filteredTransactions = this.transactions.filter((transaction) => {
        const matchesSearch = searchQuery
          ? transaction.transactionType.toLowerCase().includes(searchQuery) ||
            transaction.description?.toLowerCase().includes(searchQuery) // Include optional chaining
          : true;
    
        const matchesDate = selectedDate
          ? transaction.transactionDate.includes(selectedDate)
          : true;
    
        return matchesSearch && matchesDate;
      });
    
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
