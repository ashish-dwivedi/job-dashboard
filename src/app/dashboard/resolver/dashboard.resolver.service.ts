import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { Injectable } from '@angular/core';
import { JobService } from '../service/job.service';
import { JobListItem } from '../../shared/interfaces';
import { TWO_SECONDS } from '../../shared/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DashboardResolverService implements Resolve<JobListItem[]> {
  constructor(private readonly jobService: JobService, private readonly snackBar: MatSnackBar) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<JobListItem[]> {
    return this.jobService.getAllJobs().pipe(
      catchError(error => {
        this.snackBar.open('Something went wrong while loading the jobs!', null, { duration: TWO_SECONDS });
        return throwError(error);
      })
    );
  }
}
