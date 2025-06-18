import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';

import { AgenciesListComponent } from './agencies-list.component';

describe('AgenciesListComponent', () => {
  let component: AgenciesListComponent;
  let fixture: ComponentFixture<AgenciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgenciesListComponent,MatFormFieldModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgenciesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
