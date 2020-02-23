import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AddJobPayload, Job, JobListItem } from '../../shared/interfaces';

// import { map } from 'rxjs/operators';
// import {ADD_JOB_MUTATION, JOB_QUERY, JOBS_QUERY} from '../../shared/queries';

@Injectable({
  providedIn: 'root',
})
export class JobService {
  constructor(private readonly http: HttpClient) {}

  getAllJobs(): Observable<JobListItem[]> {
    const url = `${environment.baseApiUrl}/job/all`;
    return this.http.get<JobListItem[]>(url);
    // return this.apollo
    //   .query<{ job: JobListItem[] }>({
    //     query: JOBS_QUERY,
    //   })
    //   .pipe(map(response => response.data.jobs));
  }

  getJobDetails(jobId: string): Observable<Job> {
    const url = `${environment.baseApiUrl}/job/details/${jobId}`;
    return this.http.get<Job>(url);
    // this.apollo.query<{ job: Job }>({
    //   query: JOB_QUERY,
    //   variables: { id: jobId }
    //   }
    // ).pipe(map(response => response.data.job));
  }

  addJob(payload: AddJobPayload): Observable<Job> {
    const url = `${environment.baseApiUrl}/job/add`;
    return this.http.post<Job>(url, payload);
    // this.apollo.mutate<{ job: Job }>({
    //   mutation: ADD_JOB_MUTATION,
    //   variables: { payload}
    // }).pipe(map(response => response.data.job));
  }
}
