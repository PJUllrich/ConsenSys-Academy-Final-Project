import { inject, TestBed } from '@angular/core/testing';

import { HashService } from './hash.service';

describe('HashService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [HashService]
    });
  });

  it('should be created', inject([HashService], (service: HashService) => {
    expect(service).toBeTruthy();
  }));
});
