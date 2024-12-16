import { Component } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';
import { UserService } from 'src/app/services/user.service';
import { PaymentService } from 'src/app/services/payment.service';
import { FileService } from 'src/app/services/file.service';
@Component({
  selector: 'app-applied-policies',
  templateUrl: './applied-policies.component.html',
  styleUrls: ['./applied-policies.component.css']
})
export class AppliedPoliciesComponent {

constructor(private fileService:FileService,private paymentService : PaymentService,private insuranceService:InsuranceService, private userService : UserService){}
appliedPolicies: any;
policies: any[] = []; // All policies from the API
paginatedPolicies: any[] = []; // Policies displayed on the current page
currentPage: number = 1; // Current page number
itemsPerPage: number = 5; // Number of policies per page
totalPages: number = 0; // Total number of pages
selectedPolicy: any = null; 
ngOnInit(): void {
  this.loadAppliedPolicies();
}
loadAppliedPolicies() {
  this.insuranceService.getPolicyAccounts().subscribe({
    next: (response: any) => {
      this.policies = response.data.filter((policy: any) => !policy.isApproved); // Filter policies where isApproved is false
      this.totalPages = Math.ceil(this.policies.length / this.itemsPerPage); // Calculate total pages
      this.setPaginatedPolicies(); // Load initial page
    },
    error: (err) => console.error('Error loading applied policies:', err)
  });
}

setPaginatedPolicies() {
  const startIndex = (this.currentPage - 1) * this.itemsPerPage;
  const endIndex = startIndex + this.itemsPerPage;
  this.paginatedPolicies = this.policies.slice(startIndex, endIndex);
}

goToNextPage() {
  if (this.currentPage < this.totalPages) {
    this.currentPage++;
    this.setPaginatedPolicies();
  }
}

goToPreviousPage() {
  if (this.currentPage > 1) {
    this.currentPage--;
    this.setPaginatedPolicies();
  }
}
policy:any;
togglePolicyDetails(policy: any) {
  this.selectedPolicy = this.selectedPolicy?.policyNo === policy.policyNo ? null : policy;
  this.policy = this.selectedPolicy;
}

// Approve the selected policy
approvePolicy(policy: any) {
  const date = new Date().toISOString();
  const payload = {
    policyNo: policy.policyNo,
    isApproved: true,
    issueDate : date,
    maturityDate : this.calculateDate(policy.policyTerm),
    isKycVerified : true,
    status : "Approved"
  }
  console.log(payload);
  this.insuranceService.changePolicyAccountStatus(payload).subscribe({
    next: () => {
      alert('Policy Approved Successfully!');
      const installments = this.generateInstallmentSchedule(
        policy.policyNo,
        policy.premiumAmount,
        policy.premiumType,
        policy.policyTerm
      )
      this.submitInstallments(installments);
      alert("Installment Schedule Generated Successfully!");
      this.updateAgentCommision(policy);
      this.loadAppliedPolicies();
    },
    error: (err) => {
      alert("error while changing the status");
      console.error('Error approving policy:', err)
    }
  })

}

agent : any;
updateAgentCommision(policy:any){
  console.log(policy)
 
  this.userService.getAgentById(policy.agentId).subscribe({
    next:(response:any)=>{
      this.agent = response.data;
      let amount = policy.premiumAmount;
      let commisionPercentage = policy.insuranceScheme.registrationCommission;
      let commissionAmount = amount * (commisionPercentage / 100);
      console.log(this.agent);
    
      this.agent.totalCommission += commissionAmount;
      this.agent.walletBalance += commissionAmount;
      this.userService.updateAgent(this.agent).subscribe({
        next: () => {console.log('Agent Commission Updated Successfully')
          alert("Agent Commission Updated Successfully");
          this.updateTransactionTable(policy,true);
        },
        error: (err) =>{ console.error('Error updating agent commission:', err)
          alert("Failed To Update Commission For Agent!");
          this.updateTransactionTable(policy,false);
        }
      });
    },
    error: (error)=>{
      console.log("Error While Fetching Agent",error);
    }
  });

}

updateTransactionTable(policy:any, isTrue:boolean){

  let amount = policy.premiumAmount * (policy.insuranceScheme.registrationCommission/100);
  const payload = {
    policyNo: policy.policyNo,
    transactionType : "Reg. Comm. Credited",
    transactionDate : new Date().toISOString(),
    transactionAmount : amount,
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
submitInstallments(installments: any[]) {
  this.insuranceService.addInstallmentScheduled(installments).subscribe({
    next: () => console.log('Installments created successfully'),
    error: (err) => console.error('Error creating installments:', err)
  });
}
 // 🔥 Generate Installment Schedule 🔥
 generateInstallmentSchedule(policyNo: string, premiumAmount: any, premiumType: any, policyTerm: any) {
  let numberOfInstallments;
  let intervalInMonths;

  switch (premiumType) {
    case 'Monthly':
      numberOfInstallments = policyTerm;
      intervalInMonths = 1;
      break;
    case 'Quarterly':
      numberOfInstallments = policyTerm / 3;
      intervalInMonths = 3;
      break;
    case 'Yearly':
      numberOfInstallments = policyTerm / 12;
      intervalInMonths = 12;
      break;
    default:
      numberOfInstallments = 0;
      intervalInMonths = 0;
  }

  const installmentAmount = premiumAmount / numberOfInstallments;
  const installments = [];

  let dueDate = new Date();
  dueDate.setDate(2); // Start from 2nd of next month

  for (let i = 0; i < numberOfInstallments; i++) {
    dueDate.setMonth(dueDate.getMonth() + intervalInMonths);
    installments.push({
      policyNo: policyNo,
      dueDate: new Date(dueDate).toISOString(),
      amountDue: installmentAmount.toFixed(),
      status: 'Unpaid'
    });
  }
  return installments;
}

calculateDate(term: any) {
  const startDate = new Date();
  const maturityDate = new Date(startDate);
  maturityDate.setMonth(maturityDate.getMonth() + term);
  return maturityDate.toISOString();
}



// Documents view section 



uploadedDocuments: any[] = []; // Stores uploaded documents for the selected policy
isModalOpen = false; // Controls modal visibility
currentIndex: number = 0; // Tracks the currently displayed document

// View documents for a selected policy
viewDocuments(policy: any) {
  this.selectedPolicy = policy; // Assign the selected policy
  this.isModalOpen = true; // Open the modal
  this.currentIndex = 0; // Reset index to the first document

  // Fetch documents from the user service by customer ID
  this.userService.getUserById(policy.customerId).subscribe({
    next: (response: any) => {
      this.uploadedDocuments = response.data.documents.map((doc: any) => ({
        ...doc,
        filePath: doc.filePath || 'assets/default-placeholder.png', // Provide a default placeholder if filePath is missing
      }));
    },
    error: (err: any) => {
      console.error('Error fetching documents:', err);
      this.uploadedDocuments = []; // Ensure empty state on error
    },
  });
}

// Close the modal
closeModal() {
  this.isModalOpen = false; // Hide the modal
  this.selectedPolicy = null; // Clear the selected policy
  this.uploadedDocuments = []; // Clear uploaded documents
  this.currentIndex = 0; // Reset the document index
}

// Navigate to the previous document
previousDocument() {
  if (this.currentIndex > 0) {
    this.currentIndex--;
  }
}

// Navigate to the next document
nextDocument() {
  if (this.currentIndex < this.uploadedDocuments.length - 1) {
    this.currentIndex++;
  }
}

// Verify the current document
verifyDocument(document: any) {
  document.isVerified = true;
  document.message = "Document is verified";
  console.log(document);
  this.fileService.updateDocumentStatus(document).subscribe({
    next: () => {
      alert('Document verification successful!');
    },
    error: (err) => {
      alert('Error While verifying document');
      console.error('Error verifying document:', err);
    }
  })
}

// Reject the current document
rejectDocument(document: any) {
  document.isVerified = false;
  document.message = "Document Rejected! Re-Upload";

  this.fileService.updateDocumentStatus(document).subscribe({
    next: () => {
      alert('Document Rejected!');
    },
    error: (err) => {
      alert('Error While verifying document');
      console.error('Error verifying document:', err);
    }
  })
}
}
