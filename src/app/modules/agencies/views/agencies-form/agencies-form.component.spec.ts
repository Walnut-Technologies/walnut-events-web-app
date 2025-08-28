import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AgenciesFormComponent } from './agencies-form.component';

describe('AgenciesFormComponent', () => {
  let component: AgenciesFormComponent;
  let fixture: ComponentFixture<AgenciesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgenciesFormComponent,FormGroup,Validators,FormBuilder,ReactiveFormsModule, FormsModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgenciesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
