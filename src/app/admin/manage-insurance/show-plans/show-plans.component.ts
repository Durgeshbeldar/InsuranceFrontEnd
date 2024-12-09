import { Component } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';
@Component({
  selector: 'app-show-plans',
  templateUrl: './show-plans.component.html',
  styleUrls: ['./show-plans.component.css']
})
export class ShowPlansComponent {
  plans: any[] = []; // All plans
  paginatedPlans: any[] = []; // Current page plans
  currentPage: number = 1;
  itemsPerPage: number = 5; // Number of plans per page
  totalPages: number = 1;

  constructor(private insuranceService: InsuranceService) {}

  ngOnInit() {
    this.loadPlans();
  }

  // Load plans from the service
  loadPlans() {
    this.insuranceService.getPlans().subscribe({
      next: (response: any) => {
        this.plans = response.data || [];
        console.log("plans are : " + this.plans)
        this.calculatePagination();
      },
      error: (err: any) => {
        console.error('Error fetching plans:', err);
      }
    });
  }

  deletePlan(planId:any){
    this.insuranceService.deletePlan(planId).subscribe({
      next: (response: any) => {
        console.log('Plan deleted successfully:', response);
        this.loadPlans();
      },
      error: (err: any) => {
        console.error('Error deleting plan:', err);
      }
    });
  }
  // Calculate pagination details
  calculatePagination() {
    this.totalPages = Math.ceil(this.plans.length / this.itemsPerPage);
    this.updatePaginatedPlans();
  }

  // Update paginated data
  updatePaginatedPlans() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    this.paginatedPlans = this.plans.slice(startIndex, endIndex);
  }

  // Go to the previous page
  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePaginatedPlans();
    }
  }

  // Go to the next page
  goToNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePaginatedPlans();
    }
  }
}
