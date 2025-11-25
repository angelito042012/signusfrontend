import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-empleados-home',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './empleados-home.component.html',
  styleUrl: './empleados-home.component.css'
})
export class EmpleadosHomeComponent {

}
