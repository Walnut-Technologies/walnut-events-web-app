import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// Importa componentes standalone
import { AgenciesListComponent } from './views/agencies-list/agencies-list.component';
import { AgenciesFormComponent } from './views/agencies-form/agencies-form.component';

const routes: Routes = [
  { path: '', component: AgenciesListComponent },
  { path: 'create', component: AgenciesFormComponent },
];

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    AgenciesListComponent, // Importa aquí porque es standalone
    AgenciesFormComponent, // Importa aquí porque es standalone
    RouterModule.forChild(routes),
  ]
})
export class AgenciesModule { }
