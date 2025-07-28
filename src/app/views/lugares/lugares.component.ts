import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { LugarService } from '../../services/lugar.service';
import { CommonModule } from '@angular/common';
import { Venue } from '../../models/lugar.model';


@Component({
  standalone: true,
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.scss'],
  imports: [FormsModule, CommonModule],

})
export class LugaresComponent implements OnInit {
  busqueda = '';
  itemsPorPagina = 10;
  modalAbierto = false;
  guardando = false;

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


  lugares: Venue[] = [];
  lugaresFiltrados: Venue[] = [];
  lugarAEliminar: Venue | null = null;
  mostrarModalEliminar = false;


  constructor(private router: Router, private lugarService: LugarService) {}

  ngOnInit(): void {
    this.cargarLugares();
  }

cargarLugares(): void {
  this.lugarService.getLugares().subscribe({
    next: (lugares: Venue[]) => {
      console.log('Lugares recibidos del backend:', lugares); // 👈 LOG
      this.lugares = lugares;
      this.filtrar();
    },
    error: (err: any) => {
      console.error('Error al cargar lugares:', err);
    }
  });
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
          alert('Error al eliminar');
          this.mostrarModalEliminar = false;
        }
      });
    }
  }

  cancelarEliminar() {
    this.mostrarModalEliminar = false;
    this.lugarAEliminar = null;
  }
  
filtrar(): void {
  const query = this.busqueda?.toLowerCase() || '';
  this.lugaresFiltrados = this.lugares.filter(lugar =>
    lugar.name.toLowerCase().includes(query) ||
    lugar.address.toLowerCase().includes(query)
  );
}

  abrirModal(): void {
    console.log('Se presionó el botón');
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

async agregarLugar(): Promise<void> {
  if (this.validarFormulario()) {
    this.guardando = true;

    const venue: Venue = {
      ...this.nuevoLugar,
      registrationDate: new Date().toISOString()
    };

    this.lugarService.createLugar(venue).subscribe({
      next: () => {
        this.cargarLugares();
        this.cerrarModal();
      },
      error: () => {
        this.guardando = false;
      }
    });
  }
}

  private validarFormulario(): boolean {
  return !!(
    this.nuevoLugar.name?.trim() &&
    this.nuevoLugar.address?.trim() &&
    this.nuevoLugar.minCapacity &&
    this.nuevoLugar.maxCapacity &&
    this.nuevoLugar.rentalPrice >= 0 &&
    this.nuevoLugar.contactPhone?.trim()
  );
}

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

verPlace(id: string | undefined) {
  if (!id) return;
  this.router.navigate(['/lugares/ver', id]);
}

  editPlace(id: string | undefined) {
  if (!id) return;
  this.router.navigate(['/lugares/editar', id]);
}

eliminarLugar(lugar: Venue): void {
  const confirmado = window.confirm(`¿Estás seguro de eliminar "${lugar.name}"?`);
  if (confirmado) {
    const index = this.lugares.findIndex(l => l.id === lugar.id);
    if (index > -1) {
      this.lugares.splice(index, 1);
      this.filtrar();
      alert('Lugar eliminado exitosamente');
    }
  }
}

  
}