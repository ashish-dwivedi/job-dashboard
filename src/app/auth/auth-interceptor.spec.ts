import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth-interceptor';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { JobService } from '../dashboard/service/job.service';
import { environment } from '../../environments/environment';

describe('AuthInterceptor', () => {
  let jobService: JobService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [JobService, { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }],
    });
    jobService = TestBed.get(JobService);
    httpMock = TestBed.get(HttpTestingController);
    jobService.getAllJobs().subscribe(response => {
      expect(response).toBeTruthy();
    });
  });

  it('should be created', () => {
    const service: AuthInterceptor = new AuthInterceptor();
    expect(service).toBeTruthy();
  });

  it('should add an Authorization header', () => {
    const httpRequest = httpMock.expectOne(`${environment.baseApiUrl}/job/all`);
    expect(httpRequest.request.headers.has('Authorization')).toBeTruthy();
  });

  it('should add the token as stored in environment file', () => {
    const httpRequest = httpMock.expectOne(`${environment.baseApiUrl}/job/all`);
    expect(httpRequest.request.headers.get('Authorization')).toBe(`Bearer ${environment.authToken}`);
  });
});
