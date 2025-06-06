import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Lugar {
  nombre: string;
  direccion: string;
  capacidad: string;
  agencia: string;
  contacto: string;
}

@Component({
  standalone: true,
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.scss'],
  imports: [CommonModule, FormsModule]
})
export class LugaresComponent implements OnInit {
  busqueda = '';
  itemsPorPagina = 10;
  modalAbierto = false;
  guardando = false;

  nuevoLugar: Lugar = {
    nombre: '',
    direccion: '',
    capacidad: '',
    agencia: '',
    contacto: ''
  };

  lugares: Lugar[] = [
    { nombre: 'Arboleda Susurrante', direccion: 'Patricio Sáinz 14, Col. Del Valle', capacidad: '10-50', agencia: 'Agencia Devon', contacto: '+526290537862' },
    { nombre: 'Cascadas Carmesí', direccion: 'AV LOPEZ PORTILLO SN', capacidad: '10-50', agencia: 'Agencia Devon', contacto: '663 406 4625' },
    { nombre: 'Festive Flair Events', direccion: 'Patricio Sáinz 14, Col. Del Valle', capacidad: '10-50', agencia: 'Agencia Devon', contacto: '+529165417785' },
    { nombre: 'Grand Event', direccion: '16 DE SEPBRE NO. 513 S/N', capacidad: '10-50', agencia: 'Agencia Devon', contacto: '+525889690040' },
    { nombre: 'Celebration Strands', direccion: 'AV MORELOS SUR NO. 114', capacidad: '10-50', agencia: 'Agencia Devon', contacto: '315 799 5554' },
    { nombre: 'The After Party Blowout', direccion: 'FRAY SERVANDO T DE MIER SN', capacidad: '10-50', agencia: 'Agencia Devon', contacto: '588 482 3639' }
  ];

  lugaresFiltrados: Lugar[] = [];

  ngOnInit(): void {
    this.lugaresFiltrados = this.lugares;
  }

  filtrar(): void {
    const query = this.busqueda.toLowerCase();
    this.lugaresFiltrados = this.lugares.filter(lugar =>
      lugar.nombre.toLowerCase().includes(query) ||
      lugar.direccion.toLowerCase().includes(query) ||
      lugar.agencia.toLowerCase().includes(query)
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
    // Solo cerrar si se hace click en el overlay, no en el modal
    if (event.target === event.currentTarget) {
      this.cerrarModal();
    }
  }

  resetearFormulario(): void {
    this.nuevoLugar = {
      nombre: '',
      direccion: '',
      capacidad: '',
      agencia: '',
      contacto: ''
    };
  }

  async agregarLugar(): Promise<void> {
    if (this.validarFormulario()) {
      this.guardando = true;
      
      try {
        // Simular una llamada API
        await this.delay(1500);
        
        // Agregar el nuevo lugar
        this.lugares.push({ ...this.nuevoLugar });
        this.filtrar(); // Actualizar la lista filtrada
        
        // Mostrar mensaje de éxito (opcional)
        console.log('Lugar agregado exitosamente:', this.nuevoLugar);
        
        // Cerrar modal
        this.cerrarModal();
        
      } catch (error) {
        console.error('Error al agregar lugar:', error);
        this.guardando = false;
      }
    }
  }

  private validarFormulario(): boolean {
    return !!(
      this.nuevoLugar.nombre?.trim() &&
      this.nuevoLugar.direccion?.trim() &&
      this.nuevoLugar.capacidad &&
      this.nuevoLugar.agencia &&
      this.nuevoLugar.contacto?.trim()
    );
  }

  private delay(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Funciones para los botones de acción (por implementar)
  verLugar(lugar: Lugar): void {
    console.log('Ver lugar:', lugar);
    // Aquí puedes implementar la lógica para ver detalles
  }

  editarLugar(lugar: Lugar): void {
    console.log('Editar lugar:', lugar);
    // Aquí puedes implementar la lógica para editar
  }

  eliminarLugar(lugar: Lugar): void {
    console.log('Eliminar lugar:', lugar);
    if (confirm(`¿Estás seguro de que quieres eliminar "${lugar.nombre}"?`)) {
      const index = this.lugares.findIndex(l => l === lugar);
      if (index > -1) {
        this.lugares.splice(index, 1);
        this.filtrar();
      }
    }
  }
}