import { TestBed } from '@angular/core/testing';

import { AcccountManagementService } from './account-management.service';

describe('AcccountManagementService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AcccountManagementService = TestBed.get(AcccountManagementService);
    expect(service).toBeTruthy();
  });
});
