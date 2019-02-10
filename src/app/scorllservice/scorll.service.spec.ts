import { TestBed, inject } from '@angular/core/testing';

import { ScorllService } from './scorll.service';

describe('ScorllService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ScorllService]
    });
  });

  it('should be created', inject([ScorllService], (service: ScorllService) => {
    expect(service).toBeTruthy();
  }));
});
