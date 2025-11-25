import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperacionesInventarioComponent } from './operaciones-inventario.component';

describe('OperacionesInventarioComponent', () => {
  let component: OperacionesInventarioComponent;
  let fixture: ComponentFixture<OperacionesInventarioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperacionesInventarioComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperacionesInventarioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
