import { TestBed } from '@angular/core/testing';

import { DashproductserviceService } from './dashproductservice.service';

describe('DashproductserviceService', () => {
  let service: DashproductserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DashproductserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
