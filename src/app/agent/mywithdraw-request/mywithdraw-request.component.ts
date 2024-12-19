import { Component, ElementRef, ViewChild } from '@angular/core';
import { PaymentService } from 'src/app/services/payment.service';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-mywithdraw-request',
  templateUrl: './mywithdraw-request.component.html',
  styleUrls: ['./mywithdraw-request.component.css']
})
export class MywithdrawRequestComponent {

   withdrawalRequests: any[] = [];
    paginatedRequests: any[] = [];
    filteredRequests: any[] = [];
    agents: any[] = [];
    searchQuery: string = '';
    currentPage: number = 1;
    pageSize: number = 10;
    totalPagesArray: number[] = []; 
    itemsPerPage: number = 10;
  
    @ViewChild('dateInput', { static: false }) dateInput!: ElementRef<HTMLInputElement>; // ViewChild for date input
  
    constructor(private paymentService: PaymentService, private userService: UserService) {}
  agentId :any;
    ngOnInit(): void {
      this.getAgentId();
      this.loadRequests();
    }
    getAgentId(){
      this.agentId = localStorage.getItem('userId'); 
    }
   
    loadRequests() {
      this.paymentService.getAllWithdrawRequests().subscribe((response: any) => {
        this.withdrawalRequests = response.data.filter((req:any)=>req.agentId ===this.agentId)
        this.filteredRequests = [...this.withdrawalRequests]; // Initialize filteredRequests
        this.extractAgents();
        this.updatePagination();
      });
    }
  
    extractAgents() {
      const agentMap = new Map();
      this.withdrawalRequests.forEach(request => {
        if (request.agent && !agentMap.has(request.agent.agentId)) {
          agentMap.set(request.agent.agentId, request.agent);
        }
      });
      this.agents = Array.from(agentMap.values());
      console.log('Extracted Agents: ', this.agents);
    }
  
    applyFilters() {
      const selectedAgent = (document.getElementById('agentFilter') as HTMLSelectElement).value;
      const selectedDate = this.dateInput?.nativeElement.value || '';
  
      this.filteredRequests = this.withdrawalRequests
        .filter(request => 
          (selectedAgent === 'all' || request.agent?.agentId === selectedAgent) &&
          (!selectedDate || request.requestDate.includes(selectedDate))
        );
  
      this.currentPage = 1; // Reset to first page after filter
      this.updatePagination();
    }
  
    filterByAgent(event: any) {
      const agentId = event.target.value;
      this.filteredRequests = agentId === 'all' 
        ? this.withdrawalRequests 
        : this.withdrawalRequests.filter(request => request.agent?.agentId === agentId);
  
      this.currentPage = 1; // Reset to first page after filter
      this.updatePagination();
    }
  
    filterByDate(event: any) {
      const selectedDate = event.target.value;
      this.filteredRequests = this.withdrawalRequests.filter(request => request.requestDate.includes(selectedDate));
  
      this.currentPage = 1; // Reset to first page after filter
      this.updatePagination();
    }
  
    updatePagination() {
      this.totalPagesArray = Array.from(
        { length: Math.ceil(this.filteredRequests.length / this.pageSize) },
        (_, i) => i + 1
      );
      this.setPaginatedRequests();
    }
  
    changePageSize(event: any) {
      this.pageSize = parseInt(event.target.value, 10);
      this.currentPage = 1; // Reset to first page
      this.updatePagination(); // Recalculate total pages
    }
  
    setPaginatedRequests() {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      this.paginatedRequests = this.filteredRequests.slice(startIndex, startIndex + this.pageSize);
    }
  
    goToPreviousPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
        this.setPaginatedRequests();
      }
    }
  
    goToNextPage() {
      if (this.currentPage < this.totalPagesArray.length) {
        this.currentPage++;
        this.setPaginatedRequests();
      }
    }
  
    goToPage(page: number) {
      this.currentPage = page;
      this.setPaginatedRequests();
    }
  
    approveRequest(request: any) {
      request.status = 'Approved';
      this.paymentService.updateWithdrawalRequest(request).subscribe({
        next: () => {
          alert('Request Approved Successfully');
          this.updateTransactionTable(request);
          this.loadRequests();
        },
        error: (err: any) => console.error('Error updating request:', err)
      });
    }
  
    rejectRequest(request: any) {
      request.status = 'Rejected';
      this.paymentService.updateWithdrawalRequest(request).subscribe({
        next: () => {
          this.updateAgent(request);
          alert('Request Rejected Successfully');
          this.loadRequests();
        },
        error: (err: any) => console.error('Error updating request:', err)
      });
    }
    updateTransactionTable(request:any){
      const payload = {
        userId : request.agentId,
        transactionType : "Amount Debited",
        transactionDate : new Date().toISOString(),
        amount : request.amount,
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
  
    updateAgent(request: any) {
      this.userService.getAgentById(request.agentId).subscribe({
        next: (response: any) => {
          const agent = response.data;
          const amount = request.amount;
          agent.walletBalance += amount;
          this.userService.updateAgent(agent).subscribe({
            next: () => alert('Agent updated successfully'),
            error: (err: any) => console.error('Error updating agent:', err)
          });
        }
      });
    }
  
    triggerDateInput() {
      this.dateInput?.nativeElement.showPicker();
    }
  
    getStatusClass(status: string) {
      return status === 'Pending' ? 'pending' : status === 'Approved' ? 'approved' : 'rejected';
    }
}
