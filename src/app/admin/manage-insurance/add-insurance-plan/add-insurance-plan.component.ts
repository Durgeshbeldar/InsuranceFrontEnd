import { Component } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';
import { FileService } from'src/app/services/file.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Component({
  selector: 'app-add-insurance-plan',
  templateUrl: './add-insurance-plan.component.html',
  styleUrls: ['./add-insurance-plan.component.css']
})
export class AddInsurancePlanComponent {
  constructor(private insuranceService: InsuranceService,private fileService : FileService) {
    
  }

  fileName: string = '';
  previewUrl: string | null = null;

  // Plan Form
  planForm = new FormGroup({
    planName: new FormControl('', Validators.required),
    description: new FormControl(''), // Optional field
    planImage: new FormControl('', Validators.required) // File required
  });

  triggerFileInput() {
    const inputElement: HTMLElement | null = document.getElementById('planImage');
    if (inputElement) {
      inputElement.click();
    }
  }
  
  onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;

      // Update FormControl value for planImage
      this.planForm.patchValue({ planImage: file });

      // Create a preview for the image
      const reader = new FileReader();
      reader.onload = () => {
        this.previewUrl = reader.result as string;
      };
      reader.readAsDataURL(file);
    }
    this.startUploadAnimation();
  }

  startUploadAnimation() {
    const icon = document.querySelector('.cloud-icon');
    if (icon) {
      icon.classList.add('animate-icon'); // Add animation class
      setTimeout(() => {
        icon.classList.remove('animate-icon'); // Remove animation after 1 second
      }, 1000);
    }
  }
  removeImage() {
    this.previewUrl = null; // Remove preview
    this.planForm.patchValue({ planImage: null }); // Clear the FormControl
    this.planForm.get('planImage')?.updateValueAndValidity();
}

 uploadedFile : any;
  addPlan() {
    if (this.planForm.valid) {
      this.uploadedFile = this.planForm.get('planImage')?.value;

      // Step 1: Upload Image First
      // const formData = new FormData();
      // formData.append('file', file);

      this.fileService.addImage(this.uploadedFile).subscribe({
        next: (response: any) => {
          const fileUrl = response.fileUrl;

          // Step 2: Add Plan Details
          const planData = {
            planName: this.planForm.get('planName')?.value,
            description: this.planForm.get('description')?.value,
            planImage: fileUrl // Set uploaded image URL in planImage
          };

          this.insuranceService.addPlan(planData).subscribe({
            next: () => {
              alert('Plan added successfully!');
              this.planForm.reset();
              this.fileName = '';
              this.previewUrl = null;
            },
            error: (err) => {
              alert("Some error is occured or plan name is already exists!");
              console.error('Error adding plan:', err)
            }
          });
        },
        error: (err) => console.error('Error uploading image:', err)
      });
    }
  }

  onPlanCancel() {
    this.planForm.reset();
    this.fileName = '';
    this.previewUrl = null;
  }

}
