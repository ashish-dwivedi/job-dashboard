import { TestBed } from '@angular/core/testing';

import { DashboardResolverService } from './dashboard.resolver.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ActivatedRouteSnapshot, convertToParamMap } from '@angular/router';
import { JobService } from '../service/job.service';
import { MockJobService, MockMatSnackBar } from '../../shared/mock-data';
import { SharedModule } from '../../shared/shared.module';
import { Observable, of, throwError } from 'rxjs';
import { MatSnackBar } from '@angular/material';
import { TWO_SECONDS } from '../../shared/constants';
import { HttpErrorResponse } from '@angular/common/http';

describe('DashboardResolverService', () => {
  let jobService: JobService;
  let snackBar: MatSnackBar;
  let service: DashboardResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, SharedModule],
      providers: [
        { provide: JobService, useClass: MockJobService },
        { provide: MatSnackBar, useClass: MockMatSnackBar },
      ],
    });
    service = TestBed.get(DashboardResolverService);
    jobService = TestBed.get(JobService);
    snackBar = TestBed.get(MatSnackBar);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call the getJobDetails function of job service', () => {
    spyOn(jobService, 'getAllJobs').and.callThrough();
    service.resolve(null, null);
    expect(jobService.getAllJobs).toHaveBeenCalled();
  });
});
