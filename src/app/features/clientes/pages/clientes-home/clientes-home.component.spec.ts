import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesHomeComponent } from './clientes-home.component';

describe('ClientesHomeComponent', () => {
  let component: ClientesHomeComponent;
  let fixture: ComponentFixture<ClientesHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
