import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { FormsModule } from '@angular/forms';       // ✅ Necesario para ngModel
import { CommonModule } from '@angular/common';
import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { LugaresComponent } from './views/lugares/lugares.component';
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
      { path: 'lugares', loadComponent: () => import('./views/lugares/lugares.component').then(m => m.LugaresComponent)},
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
