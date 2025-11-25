import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsuariosEmpleadosComponent } from './usuarios-empleados.component';

describe('UsuariosEmpleadosComponent', () => {
  let component: UsuariosEmpleadosComponent;
  let fixture: ComponentFixture<UsuariosEmpleadosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UsuariosEmpleadosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UsuariosEmpleadosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
