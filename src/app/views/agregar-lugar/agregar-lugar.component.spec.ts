import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarLugarComponent } from './agregar-lugar.component';

describe('AgregarLugarComponent', () => {
  let component: AgregarLugarComponent;
  let fixture: ComponentFixture<AgregarLugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarLugarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarLugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
