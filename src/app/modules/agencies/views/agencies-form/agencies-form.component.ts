import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule  } from '@angular/forms';
import { AgenciesService } from '../../services/agencies.service';
import { CommonModule } from '@angular/common';
import { Agency } from '../../interfaces/agency.interface';


@Component({
  selector: 'app-agencies-form',
  standalone: true,  // marca que es standalone
  imports: [CommonModule, ReactiveFormsModule],  // Agrega CommonModule aquí
  templateUrl: './agencies-form.component.html',
  styleUrl: './agencies-form.component.scss'
})

export class AgenciesFormComponent implements OnInit {
  tab = 0;

  agencyForm: FormGroup;
  accessForm: FormGroup;

  constructor(
  private fb: FormBuilder,
  private eventsService: AgenciesService
) {
    this.agencyForm = this.fb.group({
      name: ['', Validators.required],
      phone: [''],
      email: ['', [Validators.required, Validators.email]],
      address: [''],
      city: [''],
      state: [''],
      postalCode: ['']
    });

    this.accessForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      confirmPassword: ['', Validators.required],
      status: ['active']
    });
  }

  async ngOnInit(): Promise<void> {
   
  }

  goToAccessTab() {
    if (this.agencyForm.valid) {
      this.tab = 1;
    }
  }

  save() {
     
    if (this.accessForm.valid) {
      const agencyData: Agency = {
      id: '', // Asignar si es requerido o dejarlo vacío si lo genera el backend
      name: this.agencyForm.value.name,
      registrationDate: new Date().toISOString(), // o como tu backend lo requiera
      description: '', // puedes obtener de un campo si lo agregas
      address: this.agencyForm.value.address || '',
      logoUrl: '' // o puedes dejarlo fuera si no se necesita
    };
      this.eventsService.addAgency(agencyData);
      console.log('Enviar a API:', agencyData);
    }
  }

  cancel() {
    // Puedes redirigir o limpiar el formulario
  }
}
