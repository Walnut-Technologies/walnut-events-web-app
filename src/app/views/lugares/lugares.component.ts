import { Component, OnInit } from '@angular/core';
import { LugarService } from '../../services/lugar.service';
import { Venue } from '../../models/lugar.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AgregarLugarComponent } from '../agregar-lugar/agregar-lugar.component';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.scss'],
    imports: [CommonModule, FormsModule], 

})
export class LugaresComponent implements OnInit {
  busqueda = '';
  itemsPorPagina = 10;
  lugares: Venue[] = [];
  lugaresFiltrados: Venue[] = [];
  modalAbierto = false;
  guardando = false;
  modalEliminarAbierto = false;
  lugarAEliminar: Venue | null = null;
  mostrarModalEliminar = false;
  errorMsg = '';

  nuevoLugar: Venue = {
    name: '',
    registrationDate: '',
    address: '',
    latitude: 0,
    longitude: 0,
    minCapacity: 1,
    maxCapacity: 1,
    rentalPrice: 0,
    numberOfHours: 1,
    contactPhone: '',
    openingTime: '',
    closingTime: ''
  };

  constructor(private lugarService: LugarService, private router: Router) {}

  ngOnInit(): void {
    this.cargarLugares();
  }

  cargarLugares(): void {
    this.lugarService.getLugares().subscribe({
      next: (lugares) => {
        this.lugares = lugares;
        this.filtrar();
      },
      error: (err) => {
        this.errorMsg = 'Error al cargar lugares';
        this.lugares = [];
        this.lugaresFiltrados = [];
      }
    });
  }

  filtrar(): void {
    const query = this.busqueda?.toLowerCase() || '';
    this.lugaresFiltrados = this.lugares.filter(lugar =>
      lugar.name.toLowerCase().includes(query) ||
      lugar.address.toLowerCase().includes(query)
    );
  }

  abrirModal(): void {
    this.modalAbierto = true;
  }
  cerrarModal(): void {
    this.modalAbierto = false;
    this.guardando = false;
    this.resetearFormulario();
  }
  cerrarModalSiClickFuera(event: Event): void {
    if (event.target === event.currentTarget) {
      this.cerrarModal();
    }
  }
  resetearFormulario(): void {
    this.nuevoLugar = {
      name: '',
      registrationDate: '',
      address: '',
      latitude: 0,
      longitude: 0,
      minCapacity: 1,
      maxCapacity: 1,
      rentalPrice: 0,
      numberOfHours: 1,
      contactPhone: '',
      openingTime: '',
      closingTime: ''
    };
  }

  agregarLugar(): void {
    if (this.validarFormulario()) {
      this.guardando = true;
      this.lugarService.createLugar(this.nuevoLugar).subscribe({
        next: () => {
          this.cargarLugares();
          this.cerrarModal();
        },
        error: () => {
          this.guardando = false;
          this.errorMsg = 'Error al guardar lugar';
        }
      });
    }
  }

  validarFormulario(): boolean {
    return !!(
      this.nuevoLugar.name?.trim() &&
      this.nuevoLugar.address?.trim() &&
      this.nuevoLugar.minCapacity &&
      this.nuevoLugar.maxCapacity &&
      this.nuevoLugar.rentalPrice >= 0 &&
      this.nuevoLugar.contactPhone?.trim()
    );
  }

  verPlace(id: string | undefined) {
    if (!id) return;
    this.router.navigate(['/lugares/ver', id]);
  }

  editPlace(id: string | undefined) {
    if (!id) return;
    this.router.navigate(['/lugares/editar', id]);
  }

  abrirModalEliminar(lugar: Venue) {
    this.lugarAEliminar = lugar;
    this.mostrarModalEliminar = true;
  }

  confirmarEliminar() {
    if (this.lugarAEliminar && this.lugarAEliminar.id) {
      this.lugarService.deleteLugar(this.lugarAEliminar.id).subscribe({
        next: () => {
          this.cargarLugares();
          this.mostrarModalEliminar = false;
          this.lugarAEliminar = null;
        },
        error: () => {
          this.errorMsg = 'Error al eliminar lugar';
          this.mostrarModalEliminar = false;
        }
      });
    }
  }

  cancelarEliminar() {
    this.mostrarModalEliminar = false;
    this.lugarAEliminar = null;
  }
}