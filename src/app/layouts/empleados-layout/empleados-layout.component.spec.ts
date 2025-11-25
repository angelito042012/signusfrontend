import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosLayoutComponent } from './empleados-layout.component';

describe('EmpleadosLayoutComponent', () => {
  let component: EmpleadosLayoutComponent;
  let fixture: ComponentFixture<EmpleadosLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosLayoutComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
