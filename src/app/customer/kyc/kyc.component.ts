import { Component } from '@angular/core';
import { FileService } from 'src/app/services/file.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-kyc',
  templateUrl: './kyc.component.html',
  styleUrls: ['./kyc.component.css']
})
export class KycComponent {


 
  selectedFiles: { [key: string]: File | null } = {
    'Aadhar Card': null,
    'PAN Card': null,
    'Selfie Image': null
  };

  uploadedDocuments: { [key: string]: string | null } = {
    'Aadhar Card': null,
    'PAN Card': null,
    'Selfie Image': null
  };

  documents: any[] = []; // List of document objects to send to API
  selectedDocumentPath: string | null = null; // Path for viewing documents
  agent : any;
  constructor(private fileService: FileService, private router : Router) 
  {
  }

  // Handle File Selection
  onFileSelect(event: any, documentName: string) {
    const file = event.target.files[0];
    if (file) {
      this.selectedFiles[documentName] = file;
    }
  }

  // Upload a Single Document
  uploadDocument(documentName: string) {
    const file = this.selectedFiles[documentName];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    this.fileService.addImage(file).subscribe({
      next: (response: any) => {
        const filePath = response.fileUrl; // Assume API returns fileUrl
        this.uploadedDocuments[documentName] = filePath;

        // Push the document object into the documents array
        this.documents.push({
          documentName,
          filePath,
          isVerified: false,
          userId: localStorage.getItem('userId') // Assuming userId is stored in localStorage
        });

        alert(`${documentName} uploaded successfully!`);
      },
      error: (err) => console.error(`Error uploading ${documentName}:`, err)
    });
  }

  // Submit All Documents
  submitDocuments() {
    this.fileService.uploadDocuments(this.documents).subscribe({
      next: () => {
        alert('All documents uploaded successfully!')
        this.router.navigateByUrl('customer-dashboard');
      },
      error: (err) => console.error('Error submitting documents:', err)
    });
  }

  // Check if All Documents are Uploaded
  allDocumentsUploaded(): boolean {
    return Object.values(this.uploadedDocuments).every((filePath) => !!filePath);
  }

  // View Document in Modal
  viewDocument(filePath: string) {
    this.selectedDocumentPath = filePath;
  }

  // Close Modal
  closeModal() {
    this.selectedDocumentPath = null;
  }
}
