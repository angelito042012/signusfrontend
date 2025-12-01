import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrarOperacionInventarioComponent } from './registrar-operacion-inventario.component';

describe('RegistrarOperacionInventarioComponent', () => {
  let component: RegistrarOperacionInventarioComponent;
  let fixture: ComponentFixture<RegistrarOperacionInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegistrarOperacionInventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrarOperacionInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
