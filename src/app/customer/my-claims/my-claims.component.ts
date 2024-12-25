import { Component } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';
@Component({
  selector: 'app-my-claims',
  templateUrl: './my-claims.component.html',
  styleUrls: ['./my-claims.component.css']
})
export class MyClaimsComponent {
  claims: any[] = [];
  paginatedClaims: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPagesArray: number[] = [];

  constructor(private claimService: InsuranceService) {}

  ngOnInit(): void {
    this.loadClaims();
  }

  loadClaims() {
    this.claimService.getClaimsByCustomerId(localStorage.getItem('userId')).subscribe((response: any) => {
      this.claims = response.data;
      this.updatePagination();
    });
  }

  updatePagination() {
    const totalPages = Math.ceil(this.claims.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    this.setPaginatedClaims();
  }

  setPaginatedClaims() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedClaims = this.claims.slice(startIndex, startIndex + this.itemsPerPage);
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

  applyFilters() {
    // Implement search functionality here if required
  }

  viewClaimDetails(claim: any) {
    alert(`Viewing details for Claim ID: ${claim.claimId}`);
  }
}
