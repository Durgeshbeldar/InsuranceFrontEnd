import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-manage-agents',
  templateUrl: './manage-agents.component.html',
  styleUrls: ['./manage-agents.component.css']
})
export class ManageAgentsComponent {
  agents: any[] = [];
  filteredAgents: any[] = [];
  paginatedAgents: any[] = [];
  currentPage: number = 1;
  itemsPerPage: number = 10;
  totalPagesArray: number[] = [];
  searchText: string = '';
  selectedDate: string | null = null;
  showAgentDetails: boolean = false;
  selectedAgent: any = null;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadAgents();
  }

  loadAgents() {
    this.userService.getAgents().subscribe((response: any) => {
      this.agents = response.data;
      this.filteredAgents = [...this.agents];
      this.updatePagination();
    });
  }

  calculateAge(dateOfBirth: string): number {
    const dob = new Date(dateOfBirth);
    const diff = Date.now() - dob.getTime();
    return Math.floor(diff / (1000 * 60 * 60 * 24 * 365.25));
  }

  applyFilters() {
    this.filteredAgents = this.agents.filter((agent) => {
      const matchesSearch = this.searchText
        ? `${agent.firstName} ${agent.lastName}`.toLowerCase().includes(this.searchText.toLowerCase())
        : true;

      const matchesDate = this.selectedDate
        ? new Date(agent.activeSince).toISOString().split('T')[0] === this.selectedDate
        : true;

      return matchesSearch && matchesDate;
    });
    this.updatePagination();
  }

  updatePagination() {
    const totalPages = Math.ceil(this.filteredAgents.length / this.itemsPerPage);
    this.totalPagesArray = Array.from({ length: totalPages }, (_, i) => i + 1);
    this.setPaginatedAgents();
  }

  setPaginatedAgents() {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    this.paginatedAgents = this.filteredAgents.slice(startIndex, startIndex + this.itemsPerPage);
  }

  changePageSize(event: any) {
    this.itemsPerPage = parseInt(event.target.value, 10);
    this.currentPage = 1;
    this.updatePagination();
  }

  goToPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.setPaginatedAgents();
    }
  }

  goToNextPage() {
    if (this.currentPage < this.totalPagesArray.length) {
      this.currentPage++;
      this.setPaginatedAgents();
    }
  }

  goToPage(page: number) {
    this.currentPage = page;
    this.setPaginatedAgents();
  }

  toggleAgentStatus(agent: any, isActive: boolean) {
    agent.user.isActive = isActive;
    const user = agent.user;
    user.isActive = isActive;
    console.log(user);
    this.userService.updateUser(user).subscribe({
      next: (data:any) =>{
        alert("User Status Changed");
        console.log(data);
      },
      error: (error) =>{
        console.log("Error When updating", error)
      }
    })
  }

  viewDetails(agent: any) {
    this.selectedAgent = agent;
    this.showAgentDetails = true;
  }

  closeAgentDetails() {
    this.showAgentDetails = false;
    this.selectedAgent = null;
  }

  // Edit Agent 

  showEditModal: boolean = false;

  editAgentForm: FormGroup = new FormGroup({
    firstName: new FormControl('', Validators.required),
    lastName: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d{10}$/)])
  });

  openEditModal(agent: any) {
    this.selectedAgent = agent;
    this.editAgentForm.patchValue({
      firstName: agent.firstName,
      lastName: agent.lastName,
      email: agent.user.email,
      phoneNumber: agent.user.phoneNumber
    });
    this.showEditModal = true;
  }

  closeEditModal() {
    this.showEditModal = false;
    this.selectedAgent = null;
    this.editAgentForm.reset();
  }

  submitEditForm() {
    if (this.editAgentForm.invalid) return;

    this.selectedAgent.user.email = this.editAgentForm.get('email')?.value;
    this.selectedAgent.user.phoneNumber = this.editAgentForm.get('phoneNumber')?.value;
    this.selectedAgent.firstName = this.editAgentForm.get('firstName')?.value;
    this.selectedAgent.lastName = this.editAgentForm.get('lastName')?.value;

    console.log(this.selectedAgent);
    const user = this.selectedAgent.user;
    this.userService.updateUser(user).subscribe({
      next : ()=>{
        console.log("User updated successfully");
        this.updateAgent();
      },
      error: (err)=>{
        console.log("Failed to update user",err);
      }
    })
  }
  updateAgent(){
    this.userService.updateAgent(this.selectedAgent).subscribe({
      next: () => {
        alert('Agent updated successfully!');
        this.loadAgents();
        this.closeEditModal();
      },
      error: (err) => {
        console.error('Error updating agent:', err);
      }
    });
  }
}
