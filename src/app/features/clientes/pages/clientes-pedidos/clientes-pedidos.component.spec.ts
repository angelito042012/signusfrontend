import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesPedidosComponent } from './clientes-pedidos.component';

describe('ClientesPedidosComponent', () => {
  let component: ClientesPedidosComponent;
  let fixture: ComponentFixture<ClientesPedidosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesPedidosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesPedidosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
