import { Component } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';
@Component({
  selector: 'app-show-schemes',
  templateUrl: './show-schemes.component.html',
  styleUrls: ['./show-schemes.component.css']
})
export class ShowSchemesComponent {
  schemes: any[] = [];
  paginatedSchemes: any[] = [];
  currentPage: number = 1;
  pageSize: number = 5;
  totalPages: number = 1;
  expandedSchemeId: string | null = null; // Used to toggle scheme details

  constructor(private insuranceService: InsuranceService) {}

  ngOnInit() {
    this.loadSchemes();
  }

  loadSchemes() {
    this.insuranceService.getSchemes().subscribe({
      next: (response: any) => {
        this.schemes = response.data;
        this.totalPages = Math.ceil(this.schemes.length / this.pageSize);
        this.updatePagination();
      },
      error: (err) => console.error('Error loading schemes:', err)
    });
  }

  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedSchemes = this.schemes.slice(startIndex, startIndex + this.pageSize);
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
scheme:any = null;
toggleViewDetails(scheme: any) {
    if (this.scheme === scheme) {
      this.scheme = null;
    } else {
      this.scheme = scheme;
    }
  }

  // toggleViewDetails(scheme: any) {
  //   this.expandedSchemeId = this.expandedSchemeId === scheme.schemeId ? null : scheme.schemeId;
  // }
}
