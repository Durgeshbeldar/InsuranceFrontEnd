import { Component, ViewChild, ElementRef } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-my-policies',
  templateUrl: './my-policies.component.html',
  styleUrls: ['./my-policies.component.css']
})
export class MyPoliciesComponent {
  policies: any[] = [];
  filteredPolicies: any[] = [];
  paginatedPolicies: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPagesArray: number[] = [];
  selectedPolicy: any = null;
  nominees : any[] = [];
  @ViewChild('searchInput', { static: false }) searchInput!: ElementRef<HTMLInputElement>;

  constructor(private insuranceService: InsuranceService, private router: Router) { }

  ngOnInit(): void {
    this.loadPoliciesByCustomerId();
    this.initializeForm();
  }


  loadPoliciesByCustomerId() {
    const customerId = localStorage.getItem('userId');
    this.insuranceService.getPolicyAccountsByCustomerId(customerId).subscribe((response: any) => {
      this.policies = response.data;
      this.filteredPolicies = [...this.policies];
      this.updatePagination();
    });
  }

  

  applyFilters() {
    const searchQuery = this.searchInput.nativeElement.value.toLowerCase();

    this.filteredPolicies = this.policies.filter(policy =>
      policy.policyNo.toLowerCase().includes(searchQuery) ||
      policy.insuranceScheme?.schemeName.toLowerCase().includes(searchQuery) ||
      policy.agent?.firstName.toLowerCase().includes(searchQuery)
    );

    this.updatePagination();
  }

  updatePagination() {
    this.totalPagesArray = Array.from(
      { length: Math.ceil(this.filteredPolicies.length / this.itemsPerPage) },
      (_, i) => i + 1
    );
    this.setPaginatedPolicies();
  }

  changePageSize(event: any) {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.currentPage = 1;
    this.updatePagination();
  }

  setPaginatedPolicies() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedPolicies = this.filteredPolicies.slice(startIndex, startIndex + this.itemsPerPage);
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginatedPolicies();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPagesArray.length) {
      this.currentPage++;
      this.setPaginatedPolicies();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.setPaginatedPolicies();
  }



  viewPolicyDetails(policy: any) {
    this.selectedPolicy = policy;
  }
  togglePolicyDetails(policy: any) {
    this.selectedPolicy =
      this.selectedPolicy?.policyNo === policy.policyNo ? null : policy;
  }

  // Claim Section

  isClaimFormVisible: boolean = false;
  claimForm!: FormGroup;

 
  
  nominee:any = null;
  getNominee(policyNo:any):any{
    
    this.insuranceService.getNomineeByPolicyNo(policyNo).subscribe({
      next:(response:any)=>{
        this.nominee = response.data;
        console.log("Nominee Retrived");
      },
      error:(error)=>{
        this.nominee = null;
        console.log("Error while fetching nominee", error);
      }
    })
    if(this.nominee === null)
      return "Not Added"
    return this.nominee.nomineeName;
  }

  initializeForm() {
    const customerName = this.getCustomerName();

    this.claimForm = new FormGroup({
      policyNo: new FormControl({ disabled: true }, [Validators.required]),
      customerId: new FormControl({ disabled: true }, [Validators.required]),
      claimAmount: new FormControl('', [Validators.required, Validators.min(1)]),
      bankAccountNo: new FormControl('', [Validators.required, Validators.pattern('^[0-9]{9,18}$')]),
      bankAccountHolderName: new FormControl(customerName, [Validators.required, Validators.minLength(3)]),
      ifscCode: new FormControl('', [Validators.required, Validators.pattern('^[A-Z|a-z]{4}[0-9]{7}$')]),
      bankName: new FormControl('', [Validators.required, Validators.minLength(3)])
    });
  }

  toggleClaimForm(policy: any) {
    this.isClaimFormVisible = true;
    this.claimForm.patchValue({
      policyNo: policy.policyNo,
      customerId: policy.customerId,
      bankAccountHolderName: policy.customer.firstName + ' ' + policy.customer.lastName,
      claimAmount: policy.sumAssured
    });
  }

  submitClaim() {


    const payload = this.claimForm.getRawValue();
    console.log('Claim Submitted:', payload);
    this.insuranceService.addClaim(payload).subscribe({
      next: () => {
        alert("Claim Submitted Successfully");
        this.claimForm.reset();
        this.router.navigateByUrl("my-claims");
      },
      error: (err) => {
        console.log("error", err);
      }
    })
  }

  cancelClaim() {
    this.isClaimFormVisible = false;
    this.claimForm.reset();
  }

  getCustomerName() {
    // Logic to fetch customer name (from API or localStorage)
    return 'John Doe'; // Example name
  }
  // Nominee logic 

  showNomineeModal = false; // Controls modal visibility

  relationships: string[] = ['Spouse', 'Child', 'Parent', 'Sibling', 'Other']; // Dropdown options

  addNomineeForm = new FormGroup({
    nomineeName: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    relationship: new FormControl('', Validators.required),
    age: new FormControl('', [Validators.required, Validators.min(0), Validators.max(150)]),
  });


  // Open Modal
  openAddNomineeModal(policy:any) {
    this.selectedPolicy = policy;
    this.showNomineeModal = true;
  }

  // Close Modal
  closeAddNomineeModal() {
    this.showNomineeModal = false;
    this.addNomineeForm.reset();
    this.selectedPolicy= null;
  }

  // Submit Form
  submitNomineeForm() {
    if (this.addNomineeForm.invalid) {
      alert('Please fill all fields correctly.');
      return;
    }

    const nomineePayload = {
      ...this.addNomineeForm.value,
      policyNo: this.selectedPolicy.policyNo,
    };

    this.insuranceService.addNominee(nomineePayload).subscribe({
      next: () => {
        alert('Nominee added successfully!');
        this.closeAddNomineeModal();
      },
      error: (err) => {
        console.error('Error adding nominee:', err);
        alert('Failed to add nominee. Please try again.');
      },
    });
  }
}
