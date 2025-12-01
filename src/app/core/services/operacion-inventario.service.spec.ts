import { TestBed } from '@angular/core/testing';

import { OperacionInventarioService } from './operacion-inventario.service';

describe('OperacionInventarioService', () => {
  let service: OperacionInventarioService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OperacionInventarioService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
