import { TestBed } from '@angular/core/testing';

import { CompraOnlineService } from './compra-online.service';

describe('CompraOnlineService', () => {
  let service: CompraOnlineService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CompraOnlineService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
