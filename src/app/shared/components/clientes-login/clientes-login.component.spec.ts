import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesLoginComponent } from './clientes-login.component';

describe('ClientesLoginComponent', () => {
  let component: ClientesLoginComponent;
  let fixture: ComponentFixture<ClientesLoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesLoginComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesLoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
