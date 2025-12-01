import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarVentaFisicaComponent } from './registrar-venta-fisica.component';

describe('RegistrarVentaFisicaComponent', () => {
  let component: RegistrarVentaFisicaComponent;
  let fixture: ComponentFixture<RegistrarVentaFisicaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarVentaFisicaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarVentaFisicaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
