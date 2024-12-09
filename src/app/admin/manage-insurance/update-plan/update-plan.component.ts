import { Component } from '@angular/core';
import { InsuranceService } from 'src/app/services/insurance.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FileService } from 'src/app/services/file.service';

@Component({
  selector: 'app-update-plan',
  templateUrl: './update-plan.component.html',
  styleUrls: ['./update-plan.component.css']
})
export class UpdatePlanComponent {
  fileName: string = '';
  uploadedFile: any;
  previewUrl: string | null = null;
  isPlanFetched: boolean = false;
  plans: any[] = []; // Available plans for selection
  selectedPlanId: string = ''; // Plan ID for updating the plan
   constructor(private insuranceService : InsuranceService , private fileService: FileService) {
    this.loadPlans();
  }
  updateForm = new FormGroup({
    planId: new FormControl('', Validators.required), // Disabled because planId cannot be edited
  })

  onCancel2(){
    this.updateForm.reset();
    this.cancelEnabled = false;
    this.updatePlanForm.reset();
    this.isPlanFetched = false;
    this.id= null;
  }

  updatePlanForm = new FormGroup({
    planId: new FormControl('', Validators.required), // Disabled because planId cannot be edited
    planName: new FormControl('', Validators.required),
    planImage: new FormControl(''),
    description: new FormControl('', Validators.required),
  });

 
 id : any;
 cancelEnabled = false;
  onPlanSelect() {
    this.cancelEnabled = true;
    this.id = this.updateForm.get('planId')?.value;
    this.insuranceService.getPlanById(this.id).subscribe({
      next: (plan: any) => {
        this.isPlanFetched = true; // Show the form
        this.fileName = ''; // Clear any existing filename
        this.populateForm(plan.data); // Populate form with existing plan details
      },
      error: (err) => console.error('Error fetching plan by ID:', err)
    });
  }

   // Populate form with the selected plan's data
  populateForm(plan: any) {
    this.updatePlanForm.patchValue({
      planId: plan.planId,
      planName: plan.planName,
      description: plan.description,
      planImage: '' // No file initially
    });
  }

  loadPlans() {
    this.insuranceService.getPlans().subscribe({
      next: (response:any) =>{
        this.plans = response.data;
      },
      error: (error: any) => console.error('Error While Fetching Plans:', error)
    })
  }
   // Handle file selection
   onFileSelect(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.fileName = file.name;
      this.uploadedFile = file;

      // Update FormControl value for planImage
      this.updatePlanForm.patchValue({ planImage: file });

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

   // Remove the selected image
   removeImage() {
    this.previewUrl = null; // Remove preview
    this.updatePlanForm.patchValue({ planImage: null }); // Clear the FormControl
    this.updatePlanForm.get('planImage')?.updateValueAndValidity();
  }

  // Trigger file input click
  triggerFileInput() {
    const inputElement: HTMLElement | null = document.getElementById('planImage');
    if (inputElement) {
      inputElement.click();
    }
  }
  // Handle form submission to update the plan
  // Handle form submission
  // Update the plan
  updatePlan() {
    if (this.updatePlanForm.valid) {
      this.uploadedFile = this.updatePlanForm.get('planImage')?.value;

      // Step 1: Upload Image First
      // const formData = new FormData();
      // formData.append('file', file);

      this.fileService.addImage(this.uploadedFile).subscribe({
        next: (response: any) => {
          const fileUrl = response.fileUrl;

          // Step 2: Add Plan Details
          const planData = {
            planName: this.updatePlanForm.get('planName')?.value,
            description: this.updatePlanForm.get('description')?.value,
            planImage: fileUrl // Set uploaded image URL in planImage
          };

          this.insuranceService.updatePlan(planData).subscribe({
            next: () => {
              alert('Plan added successfully!');
              this.updatePlanForm.reset();
              this.fileName = '';
              this.previewUrl = null;
            },
            error: (err) => console.error('Error updating plan:', err)
          });
        },
        error: (err) => console.error('Error uploading image:', err)
      });
    }
  }

  // Save updated plan details
  saveUpdatedPlan(planData: any) {
    this.insuranceService.updatePlan(planData).subscribe({
      next: () => {
        alert('Plan updated successfully!');
        this.updatePlanForm.reset();
        this.fileName = '';
        this.previewUrl = null;
        this.isPlanFetched = false; // Hide form after update
      },
      error: (err) => console.error('Error updating plan:', err)
    });
  }

  // Cancel button handler
  onCancel() {
    this.updatePlanForm.reset();
    this.fileName = '';
    this.previewUrl = null;
    this.isPlanFetched = false; // Hide form
  }
}
