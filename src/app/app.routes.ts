import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { FormsModule } from '@angular/forms';     
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LugaresComponent } from './views/lugares/lugares.component';
import { AgregarLugarComponent } from './views/agregar-lugar/agregar-lugar.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      { path: 'home', component: HomeComponent },
      // { path: 'clientes', component: ClientesComponent },
      // { path: 'eventos', component: EventosComponent },
      // { path: 'mensajes', component: MensajesComponent },
      // { path: 'invitaciones', component: InvitacionesComponent },
      { path: 'lugares/agregar', component: AgregarLugarComponent },    
      { path: 'lugares', component: LugaresComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path : 'lugares/editar/:id', component: AgregarLugarComponent },
      { path : 'lugares/ver/:id', component: AgregarLugarComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
