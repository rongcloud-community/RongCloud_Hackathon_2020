import { TestBed } from '@angular/core/testing';

import { RongCloudService } from './rong-cloud.service';

describe('RongCloudService', () => {
  let service: RongCloudService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(RongCloudService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
