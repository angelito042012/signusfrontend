import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosLoginComponent } from './empleados-login.component';

describe('EmpleadosLoginComponent', () => {
  let component: EmpleadosLoginComponent;
  let fixture: ComponentFixture<EmpleadosLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
