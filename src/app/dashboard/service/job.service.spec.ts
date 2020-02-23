import { TestBed } from '@angular/core/testing';

import { JobService } from './job.service';
import { environment } from '../../../environments/environment';
import { AddJobPayload, Job, JobListItem } from '../../shared/interfaces';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('JobService', () => {
  let service: JobService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(JobService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return array of JobListItems on invoking getAllJobs function', () => {
    const response: JobListItem[] = [
      {
        id: '123',
        title: 'Redo Kitchen Tiles',
        description: 'Kitchen tiles need to be replaced completely',
        date: '2020-02-17',
        status: 'Active',
        assignee: { name: 'Jimmy K', email: 'jimmy-k@myhammer.de', role: 'Case Manager', avatar: 'image1.jpg' },
      },
    ];
    service.getAllJobs().subscribe(res => {
      expect(res).toBe(response);
    });
    const request = httpMock.expectOne(`${environment.baseApiUrl}/job/all`);
    expect(request.request.method).toBe('GET');
    request.flush(response);
    httpMock.verify();
  });

  it('should return details of a job id on invoking getJobDetails function', () => {
    const jobDetails: Job = {
      id: '123',
      title: 'Redo Kitchen Tiles',
      description: 'Kitchen tiles need to be replaced completely',
      date: '2020-02-17',
      status: 'Active',
      assignee: {
        name: 'Jimmy K',
        email: 'jimmy-k@myhammer.de',
        role: 'Case Manager',
        avatar: 'image1.jpg',
      },
      attachments: [
        {
          name: 'SampleTile.jpg',
          downloadUrl: 'download-url-1',
        },
        {
          name: 'Query.pdf',
          downloadUrl: 'download-url-2',
        },
      ],
    };
    service.getJobDetails('123').subscribe(response => {
      expect(response).toBe(jobDetails);
    });
    const request = httpMock.expectOne(`${environment.baseApiUrl}/job/details/123`);
    expect(request.request.method).toBe('GET');
    request.flush(jobDetails);
    httpMock.verify();
  });

  it('should return the added job when a new job is added', () => {
    const jobItem: AddJobPayload = {
      title: 'Redo Kitchen Tiles',
      description: 'Kitchen tiles need to be replaced completely',
      date: '2020-02-17',
      assignee: { name: 'Jimmy K', email: 'jimmy-k@myhammer.de', role: 'Case Manager', avatar: 'image1.jpg' },
    };
    service.addJob(jobItem).subscribe(response => {
      expect(response.id).toBe('123abc');
    });
    const request = httpMock.expectOne(`${environment.baseApiUrl}/job/add`);
    expect(request.request.method).toBe('POST');
    request.flush({ ...jobItem, id: '123abc', status: 'Active' });
    httpMock.verify();
  });
});
