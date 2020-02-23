import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { JobListItem } from '../../shared/interfaces';
import { MatDialog } from '@angular/material/dialog';
import { TWO_SECONDS } from '../../shared/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AddJobComponent } from '../add-job/add-job.component';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit, OnDestroy {
  jobList: JobListItem[];
  ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly route: ActivatedRoute,
    private readonly snackBar: MatSnackBar,
    private readonly changeDetectorRef: ChangeDetectorRef
  ) {}

  ngOnInit() {
    this.jobList = this.route.snapshot.data.allJobs;
  }

  onJobItemClick(jobId: string): void {
    this.router.navigate([`job/details/${jobId}`]);
  }

  onAddJobClick(): void {
    const dialogRef = this.dialog.open(AddJobComponent, {
      width: '600px',
      disableClose: true,
    });
    dialogRef
      .afterClosed()
      .pipe(
        filter(response => response),
        takeUntil(this.ngUnsubscribe)
      )
      .subscribe((response: JobListItem) => {
        if (response) {
          // Change object reference so as to trigger change detection in the child component to re-render the job table.
          this.jobList = [].concat(this.jobList, response);
          this.snackBar.open(`${response.title} added successfully`, null, { duration: TWO_SECONDS });
          this.changeDetectorRef.markForCheck();
        }
      });
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
