/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SystemConfigManagerService } from './systemConfigManager.service';

describe('Service: SystemConfigManager', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SystemConfigManagerService],
    });
  });

  it('should ...', inject([SystemConfigManagerService], (service: SystemConfigManagerService) => {
    expect(service).toBeTruthy();
  }));
});
