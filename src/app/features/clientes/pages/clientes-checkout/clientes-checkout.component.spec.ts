import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesCheckoutComponent } from './clientes-checkout.component';

describe('ClientesCheckoutComponent', () => {
  let component: ClientesCheckoutComponent;
  let fixture: ComponentFixture<ClientesCheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesCheckoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesCheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
