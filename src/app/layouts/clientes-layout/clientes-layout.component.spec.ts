import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesLayoutComponent } from './clientes-layout.component';

describe('ClientesLayoutComponent', () => {
  let component: ClientesLayoutComponent;
  let fixture: ComponentFixture<ClientesLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
