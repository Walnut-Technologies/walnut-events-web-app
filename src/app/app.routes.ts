import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

import { LoginComponent } from './views/login/login.component';
import { HomeComponent } from './views/home/home.component';
import { LayoutComponent } from './layout/layout.component';
import { EventsComponent } from './modules/events/views/events/events.component';
import { AgenciesListComponent } from './modules/agencies/views/agencies-list/agencies-list.component';

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
      // { path: 'lugares', component: LugaresComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'events', component: EventsComponent},
      { path: 'agencies', component: AgenciesListComponent}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
