import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosMenuComponent } from './empleados-menu.component';

describe('EmpleadosMenuComponent', () => {
  let component: EmpleadosMenuComponent;
  let fixture: ComponentFixture<EmpleadosMenuComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmpleadosMenuComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmpleadosMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
