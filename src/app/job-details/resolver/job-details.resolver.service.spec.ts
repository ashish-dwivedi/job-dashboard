import { TestBed } from '@angular/core/testing';

import { JobDetailsResolverService } from './job-details.resolver.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { JobService } from '../../dashboard/service/job.service';
import { MockJobService } from '../../shared/mock-data';
import { of } from 'rxjs';
import { ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';

describe('JobDetailsResolverService', () => {
  let jobService: JobService;
  let service: JobDetailsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule, RouterTestingModule],
      providers: [{ provide: JobService, useClass: MockJobService }],
    });
    service = TestBed.get(JobDetailsResolverService);
    jobService = TestBed.get(JobService);
    spyOn(jobService, 'getJobDetails').and.callThrough();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the getJobDetails function of job service', () => {
    const route = { paramMap: convertToParamMap({ id: '123' }) } as ActivatedRouteSnapshot;
    service.resolve(route, null);
    expect(jobService.getJobDetails).toHaveBeenCalled();
  });

  it('should call the getJobDetails function of job service with same id as provided', () => {
    const id = '123';
    const route = { paramMap: convertToParamMap({ id }) } as ActivatedRouteSnapshot;
    service.resolve(route, null);
    expect(jobService.getJobDetails).toHaveBeenCalledWith(id);
  });
});
