import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { RouterModule, Routes } from '@angular/router';

// Components
import { EventsComponent } from './views/events/events.component';

const routes: Routes = [
  { path: '', component: EventsComponent }
];

@NgModule({
  imports: [
    CommonModule,
    MatFormFieldModule,
    EventsComponent,
  ]
})
export class EventsModule { }
