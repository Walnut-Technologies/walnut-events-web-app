import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { AgenciesListComponent } from './views/agencies-list/agencies-list.component';
import { Routes } from '@angular/router';



const routes: Routes = [
  { path: '', component: AgenciesListComponent }
];

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    AgenciesListComponent,
  ]
})
export class AgenciesModule { }
