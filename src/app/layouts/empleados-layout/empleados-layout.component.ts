import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { EmpleadosMenuComponent } from "../../shared/components/empleados-menu/empleados-menu.component";

@Component({
  selector: 'app-empleados-layout',
  standalone: true,
  imports: [CommonModule, RouterOutlet, EmpleadosMenuComponent], //deberia usar solo common y routeroutlet pero estamos poniendo routerlink para el menu aside
  templateUrl: './empleados-layout.component.html',
  styleUrl: './empleados-layout.component.css'
})
export class EmpleadosLayoutComponent {

}
