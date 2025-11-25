import { Routes } from '@angular/router';
import { ClientesLayoutComponent } from './layouts/clientes-layout/clientes-layout.component';
import { HomeComponent } from './features/clientes/pages/home/home.component';

export const routes: Routes = [
    {
        path: '',
        component: ClientesLayoutComponent,
        children: [
            { path: '', component: HomeComponent },
            // en el futuro aquí puedes agregar:
            // { path: 'producto/:id', component: ProductDetailComponent }
            // { path: 'carrito', component: CartComponent }
            // { path: 'perfil', component: PerfilComponent }
        ]
    }
];
