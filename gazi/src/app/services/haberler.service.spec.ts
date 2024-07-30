import { TestBed } from '@angular/core/testing';

import { HaberlerService } from './haberler.service';

describe('HaberlerService', () => {
  let service: HaberlerService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HaberlerService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
