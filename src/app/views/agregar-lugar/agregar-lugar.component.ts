import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from '../../shared/confirm-modal/confirm-modal.component';
@Component({
  standalone: true,
  selector: 'app-agregar-lugar',
  templateUrl: './agregar-lugar.component.html',
  styleUrls: ['./agregar-lugar.component.scss'],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ConfirmModalComponent 
  ]
})
export class AgregarLugarComponent {
  lugarForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.lugarForm = this.fb.group({
      nombreLugar: ['', [Validators.required]],
      direccion: ['', [Validators.required]],
      url: [''],
      capacidadMinima: ['', [Validators.required, Validators.min(1)]],
      capacidadMaxima: ['', [Validators.required, Validators.min(1)]],
      precioRenta: ['', [Validators.required, Validators.min(0)]],
      numeroHoras: ['', [Validators.required, Validators.min(1)]],
      tiempoServicio: ['', [Validators.required]],
      horarioCierre: ['', [Validators.required]],
      numeroContacto: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.lugarForm.valid) {
      console.log('Datos del lugar:', this.lugarForm.value);
      // Aquí puedes agregar la lógica para enviar los datos al backend
    } else {
      console.log('Formulario inválido');
      this.markFormGroupTouched();
    }
  }

  onCancel() {
    // Lógica para cancelar y regresar
    console.log('Cancelado');
  }

    direccionFormateada = '';
    mostrarModal = false;

    validarDireccion() {
      const direccion = this.lugarForm.get('direccion')?.value || '';
      // Puedes agregar más campos si quieres
      this.direccionFormateada = direccion;
      this.mostrarModal = true;
    }

    guardarLugar() {
      this.mostrarModal = false;
      this.onSubmit(); // o lógica para guardar
    }


  private markFormGroupTouched() {
    Object.keys(this.lugarForm.controls).forEach(key => {
      const control = this.lugarForm.get(key);
      control?.markAsTouched();
    });
  }
}