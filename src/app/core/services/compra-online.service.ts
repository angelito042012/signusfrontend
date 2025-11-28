import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CompraOnlineService {

  constructor() { }

  private http = inject(HttpClient);

  private baseUrl = environment.apiUrl + '/compras';

  // ---------------------------------------------------------
  // POST: Confirmar pedido (compra online)
  // ---------------------------------------------------------
  confirmarPedido(body: any): Observable<any> {
    return this.http.post(`${this.baseUrl}/online`, body);
  }

}
