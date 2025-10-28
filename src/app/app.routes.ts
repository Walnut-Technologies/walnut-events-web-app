import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { RoleGuard } from './core/guards/role.guard';
import { FormsModule } from '@angular/forms';     
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { VenuesComponent } from './views/venues/venues.component';
import { LugaresComponent } from './views/lugares/lugares.component';
import { AgregarLugarComponent } from './views/agregar-lugar/agregar-lugar.component';
import { EventsComponent } from './modules/events/views/events/events.component';
import { AgenciesListComponent } from './modules/agencies/views/agencies-list/agencies-list.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'home', component: HomeComponent },
      // ruta protegida por rol:
      // { path: 'admin', component: AdminComponent, canActivate: [RoleGuard], data: { roles: ['admin'] } },
      { path: 'lugares/agregar', component: AgregarLugarComponent },
      { path: 'lugares', component: LugaresComponent },
      { path: 'lugares/editar/:id', component: AgregarLugarComponent },
      { path: 'lugares/ver/:id', component: AgregarLugarComponent }

      // { path: 'clientes', component: ClientesComponent },
      // { path: 'eventos', component: EventosComponent },
      // { path: 'mensajes', component: MensajesComponent },
      // { path: 'invitaciones', component: InvitacionesComponent },
      { path: 'lugares', component: VenuesComponent },
      { path: 'events', component: EventsComponent},
      { 
        path: 'agencies', 
        loadChildren: () => import('./modules/agencies/agencies.module').then(m => m.AgenciesModule) 
      },
        { path: '', redirectTo: '/home', pathMatch: 'full' }

    ]
  },
  // Ruta para acceso denegado
  { path: 'forbidden', loadComponent: () => import('./views/forbidden/forbidden.component').then(m => m.ForbiddenComponent) }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
