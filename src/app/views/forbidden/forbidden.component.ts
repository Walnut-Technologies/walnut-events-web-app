import { Component } from '@angular/core';

@Component({
  selector: 'app-forbidden',
  standalone: true,
  template: `
    <div class="forbidden">
      <h2>Acceso denegado</h2>
      <p>No tienes permisos para acceder a esta página.</p>
      <a routerLink="/home">Volver al inicio</a>
    </div>
  `,
  styles: [`
    .forbidden { text-align: center; margin-top: 4rem; }
    h2 { color: #c00; }
    a { color: #1976d2; text-decoration: underline; }
  `]
})
export class ForbiddenComponent {}
