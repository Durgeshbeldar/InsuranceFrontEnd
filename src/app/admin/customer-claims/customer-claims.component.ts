import { Component } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';
import { Router } from '@angular/router';
import { PaymentService } from 'src/app/services/payment.service';


@Component({
  selector: 'app-customer-claims',
  templateUrl: './customer-claims.component.html',
  styleUrls: ['./customer-claims.component.css']
})
export class CustomerClaimsComponent {
claims: any[] = [];
  paginatedClaims: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPagesArray: number[] = [];
  searchText: string = '';
 selectedDate: string | null = null;
 filteredClaims: any[] = [];

  constructor(private paymentService : PaymentService,private claimService: InsuranceService, private router:Router) {}

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims() {
    this.claimService.getAllClaims().subscribe((response: any) => {
      this.claims = response.data;
      this.filteredClaims = [...this.claims];
      this.updatePagination();
    });
  }

  applyFilters() {
    this.filteredClaims = this.claims.filter((claim) => {
      const matchesSearch = this.searchText
        ? claim.policyNo.toLowerCase().includes(this.searchText.toLowerCase())
        : true;
  
      const matchesDate = this.selectedDate
        ? new Date(claim.claimDate).toISOString().split('T')[0] === this.selectedDate
        : true;
  
      return matchesSearch && matchesDate;
    });
  
    // Reset to the first page and update pagination
    this.currentPage = 1;
    this.updatePagination();
  }
  
  

  updatePagination() {
    const totalPages = Math.ceil(this.filteredClaims.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
  
    // Reset to first page if the current page exceeds total pages
    if (this.currentPage > totalPages) {
      this.currentPage = 1;
    }
  
    this.setPaginatedClaims();
  }
  

  setPaginatedClaims() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedClaims = this.filteredClaims.slice(startIndex, startIndex + this.itemsPerPage);
  }
  

  changePageSize(event: any) {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.currentPage = 1;
    this.updatePagination();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginatedClaims();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPagesArray.length) {
      this.currentPage++;
      this.setPaginatedClaims();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.setPaginatedClaims();
  }


  viewClaimDetails(claim: any) {
 
  }
  onApprove(claim: any) {
    this.selectedRow = claim;
    this.selectedRow.message = "Claim is Approved";
    this.selectedRow.status = "Approved";
    this.claimService.updateClaim(this.selectedRow).subscribe({
      next:()=>{
        alert("The Claim is successfully updated.");
        this.updateTransactionTable();
        this.selectedRow = null;
        this.router.navigateByUrl("manage-claims");
      },
      error: (error:any) => {
        console.log("An error occurred", error);
      }
    })
  }

  updateTransactionTable(){
    const payload = {
      userId : this.selectedRow.customerId,
      transactionType : "Claim Amount Credited",
      policyNo : this.selectedRow.policyNo,
      transactionDate : new Date().toISOString(),
      amount : this.selectedRow.claimAmount,
      status : "Successful",
      description:"Withdrawal to Bank A/C"
    }
    console.log("Payload is here", payload);
    this.paymentService.addTransaction(payload).subscribe({
      next: () =>{
        alert("Transaction History Saved!")
        console.log('Transaction added successfully!')
      } ,
      error: (err) =>{ console.error('Error adding transaction:', err)}
    });
  }
  

  //Modal Handling 

  showRejectModal: boolean = false;
  rejectionReason: string = ''; 
  selectedRow: any; 

 

  
  onReject(row: any): void {
    this.selectedRow = row; 
    this.showRejectModal = true;
  }

  // Close the reject modal
  closeRejectModal(): void {
    this.showRejectModal = false;
    this.rejectionReason = ''; // Reset the reason
  }

  // Confirm rejection
  confirmRejection(): void {
    if (!this.rejectionReason.trim()) {
      alert('Please enter a rejection reason.');
      return;
    }
    this.selectedRow.message = this.rejectionReason
    this.selectedRow.status = "Rejected";
    this.claimService.updateClaim(this.selectedRow).subscribe({
      next:()=>{
        alert("The Claim is successfully updated.");
        this.router.navigateByUrl("manage-claims");
      },
      error: (error:any) => {
        console.log("An error occurred", error);
      }
    })
  }
  
}
