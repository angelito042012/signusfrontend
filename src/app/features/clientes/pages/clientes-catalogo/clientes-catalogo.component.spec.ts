import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesCatalogoComponent } from './clientes-catalogo.component';

describe('ClientesCatalogoComponent', () => {
  let component: ClientesCatalogoComponent;
  let fixture: ComponentFixture<ClientesCatalogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesCatalogoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesCatalogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
