import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
import { LugarService } from '../../services/lugar.service';
import { Venue } from '../../models/lugar.model';

@Component({
  standalone: true,
  selector: 'app-add-place',
  templateUrl: './agregar-lugar.component.html',
  styleUrls: ['./agregar-lugar.component.scss'],
  imports: [CommonModule, ReactiveFormsModule, ConfirmModalComponent],
})
export class AgregarLugarComponent implements OnInit {
  placeForm: FormGroup;
  mode: 'create' | 'edit' | 'view' = 'create';
  placeId: string | null = null;
  showModal = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private placeService: LugarService
  ) {
    this.placeForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      latitude: [0],
      longitude: [0],
      minCapacity: [1, [Validators.required, Validators.min(1)]],
      maxCapacity: [1, [Validators.required, Validators.min(1)]],
      rentalPrice: [0, [Validators.required, Validators.min(0)]],
      numberOfHours: [1, [Validators.required, Validators.min(1)]],
      openingTime: ['', Validators.required],
      closingTime: ['', Validators.required],
      contactPhone: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    const urlPath = this.route.snapshot.url.map(segment => segment.path);
    if (urlPath.includes('editar')) this.mode = 'edit';
    else if (urlPath.includes('ver')) this.mode = 'view';

    this.placeId = this.route.snapshot.paramMap.get('id');

    if (this.mode !== 'create' && this.placeId) {
      this.loadPlaceData(this.placeId);
    }

    if (this.mode === 'view') {
      this.placeForm.disable();
    }
  }

  loadPlaceData(id: string): void {
    this.placeService.getLugar(id).subscribe({
      next: (place) => {
        this.placeForm.patchValue(place);
      },
      error: () => {
        alert('No se pudo cargar el lugar');
        this.router.navigate(['/lugares']);
      }
    });
  }

  savePlace(): void {
    if (this.placeForm.valid) {
      const payload: Venue = {
        ...this.placeForm.value,
        registrationDate: new Date().toISOString()
      };

      if (this.mode === 'edit' && this.placeId) {
        this.placeService.updateLugar(this.placeId, payload).subscribe({
          next: () => {
            alert('Lugar actualizado');
            this.router.navigate(['/lugares']);
          },
          error: () => alert('Error al actualizar')
        });
      } else {
        this.placeService.createLugar(payload).subscribe({
          next: () => {
            alert('Lugar creado');
            this.router.navigate(['/lugares']);
          },
          error: () => alert('Error al crear')
        });
      }
    }
  }

  confirmDelete(): void {
    this.showModal = true;
  }

  deletePlace(): void {
    if (this.placeId) {
      this.placeService.deleteLugar(this.placeId).subscribe({
        next: () => {
          alert('Lugar eliminado');
          this.router.navigate(['/lugares']);
        },
        error: () => alert('Error al eliminar')
      });
    }
    this.showModal = false;
  }

  cancel(): void {
    this.router.navigate(['/lugares']);
  }
}