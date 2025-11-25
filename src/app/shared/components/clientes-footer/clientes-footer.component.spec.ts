import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientesFooterComponent } from './clientes-footer.component';

describe('ClientesFooterComponent', () => {
  let component: ClientesFooterComponent;
  let fixture: ComponentFixture<ClientesFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ClientesFooterComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientesFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
