import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';

@Component({
  standalone: true,
  selector: 'app-add-place',
  templateUrl: './agregar-lugar.component.html',
  styleUrls: ['./agregar-lugar.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfirmModalComponent 
  ]
})
export class AgregarLugarComponent  {
  placeForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.placeForm = this.fb.group({
      placeName: ['', [Validators.required]],
      address: ['', [Validators.required]],
      url: [''],
      minCapacity: ['', [Validators.required, Validators.min(1)]],
      maxCapacity: ['', [Validators.required, Validators.min(1)]],
      rentalPrice: ['', [Validators.required, Validators.min(0)]],
      numberOfHours: ['', [Validators.required, Validators.min(1)]],
      serviceTime: ['', [Validators.required]],
      closingTime: ['', [Validators.required]],
      contactNumber: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.placeForm.valid) {
      console.log('Place data:', this.placeForm.value);
    } else {
      console.log('Invalid form');
      this.markFormGroupTouched();
    }
  }

  onCancel() {
    console.log('Cancelled');
  }

  formattedAddress = '';
  showModal = false;

  validateAddress() {
    const address = this.placeForm.get('address')?.value || '';
    this.formattedAddress = address;
    this.showModal = true;
  }

  savePlace() {
    this.showModal = false;
    this.onSubmit(); 
  }

  private markFormGroupTouched() {
    Object.keys(this.placeForm.controls).forEach(key => {
      const control = this.placeForm.get(key);
      control?.markAsTouched();
    });
  }
}
