import { Component } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
@Component({
  selector: 'app-my-documents',
  templateUrl: './my-documents.component.html',
  styleUrls: ['./my-documents.component.css']
})
export class MyDocumentsComponent {
  documents: any[] = []; // Stores the documents fetched from API

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.loadCustomerDocuments();
  }

  // Load Customer Documents
  loadCustomerDocuments() {
    const userId = localStorage.getItem('userId'); // Get userId from localStorage
    if (userId) {
      this.userService.getUserById(userId).subscribe({
        next: (response: any) => {
          this.documents = response.data.documents || []; // Populate the documents array
        },
        error: (err) => console.error('Error loading documents:', err)
      });
    } else {
      console.error('No userId found in localStorage!');
    }
  }

  // View Document
  viewDocument(filePath: string) {
    window.open(filePath, '_blank'); // Opens the document in a new tab
  }

}
