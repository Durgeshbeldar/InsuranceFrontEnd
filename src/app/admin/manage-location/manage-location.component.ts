import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LocationService } from 'src/app/services/location.service';

@Component({
  selector: 'app-manage-location',
  templateUrl: './manage-location.component.html',
  styleUrls: ['./manage-location.component.css']
})
export class ManageLocationComponent {
  // State Form
  stateForm = new FormGroup({
    name: new FormControl('', Validators.required),
  });

  // City Form
  cityForm = new FormGroup({
    stateId: new FormControl('', Validators.required),
    name: new FormControl('', Validators.required),
  });

  constructor(private locationService: LocationService) {
    this.loadStates();
  }

  states: { stateId: string; name: string }[] = [];

  // Load States for Dropdown
  loadStates() {
    this.locationService.getStates().subscribe({
      next: (response: any) => {
        this.states = response?.data || [];
        console.log('States loaded successfully:', this.states);
      },
      error: (error: any) => {
        console.error('Error fetching states:', error);
      }
    });
  }

  // Add State
  addState() {
    if (this.stateForm.valid) {
      const stateData = this.stateForm.value;
      console.log('State Payload:', stateData);

      this.locationService.addState(stateData).subscribe({
        next: () => {
          alert('State added successfully');
          this.stateForm.reset();
          this.loadStates(); // Reload states for updated dropdown
        },
        error: (err) => {
          console.error('Error adding state:', err);
        }
      });
    }
  }

  // Add City
  addCity() {
    if (this.cityForm.valid) {
      const cityData = this.cityForm.value;
      console.log('City Payload:', cityData);

      this.locationService.addCity(cityData).subscribe({
        next: () => {
          alert('City added successfully');
          this.cityForm.reset();
        },
        error: (err) => {
          console.error('Error adding city:', err);
        }
      });
    }
  }

  // Cancel State Form
  onCancel() {
    this.stateForm.reset();
  }

  // Cancel City Form
  onCancelCity() {
    this.cityForm.reset();
  }
}
