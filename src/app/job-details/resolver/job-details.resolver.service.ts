import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Job } from '../../shared/interfaces';
import { Injectable } from '@angular/core';
import { TWO_SECONDS } from '../../shared/constants';
import { MatSnackBar } from '@angular/material/snack-bar';
import { JobService } from '../../dashboard/service/job.service';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class JobDetailsResolverService implements Resolve<Job> {
  constructor(private readonly jobService: JobService, private readonly snackBar: MatSnackBar, private readonly router: Router) {}

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Job> {
    return this.jobService.getJobDetails(route.paramMap.get('id')).pipe(
      catchError(error => {
        this.snackBar.open(`Job details for this id not found!`, null, { duration: TWO_SECONDS });
        this.router.navigate(['dashboard']);
        throw Error(error);
      })
    );
  }
}
