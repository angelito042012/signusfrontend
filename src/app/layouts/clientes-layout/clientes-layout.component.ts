import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ClientesHeaderComponent } from '../../shared/components/clientes-header/clientes-header.component';
import { ClientesFooterComponent } from '../../shared/components/clientes-footer/clientes-footer.component';

@Component({
  selector: 'app-clientes-layout',
  standalone: true,
  imports: [RouterOutlet, ClientesHeaderComponent, ClientesFooterComponent],
  templateUrl: './clientes-layout.component.html',
  styleUrl: './clientes-layout.component.css'
})
export class ClientesLayoutComponent {

}
