import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesCarritoComponent } from './clientes-carrito.component';

describe('ClientesCarritoComponent', () => {
  let component: ClientesCarritoComponent;
  let fixture: ComponentFixture<ClientesCarritoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesCarritoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesCarritoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
