import { TestBed, inject } from '@angular/core/testing';

import { SearchingproductService } from './searchingproduct.service';

describe('SearchingproductService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SearchingproductService]
    });
  });

  it('should be created', inject([SearchingproductService], (service: SearchingproductService) => {
    expect(service).toBeTruthy();
  }));
});
