import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosHomeComponent } from './empleados-home.component';

describe('EmpleadosHomeComponent', () => {
  let component: EmpleadosHomeComponent;
  let fixture: ComponentFixture<EmpleadosHomeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosHomeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
