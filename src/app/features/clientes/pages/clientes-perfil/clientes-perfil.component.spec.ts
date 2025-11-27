import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesPerfilComponent } from './clientes-perfil.component';

describe('ClientesPerfilComponent', () => {
  let component: ClientesPerfilComponent;
  let fixture: ComponentFixture<ClientesPerfilComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesPerfilComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesPerfilComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
