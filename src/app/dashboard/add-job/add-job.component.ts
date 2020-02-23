import * as moment from 'moment';
import { Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { JobService } from '../service/job.service';
import { MatDialogRef } from '@angular/material';
import { UserService } from '../../shared/services/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AddJobPayload, JobListItem, User } from '../../shared/interfaces';
import { ChangeDetectionStrategy, Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddJobComponent implements OnInit, OnDestroy {
  form: FormGroup;
  users: Observable<User[]>;
  ngUnsubscribe: Subject<boolean> = new Subject<boolean>();

  constructor(
    private readonly jobService: JobService,
    private readonly userService: UserService,
    private readonly formBuilder: FormBuilder,
    private readonly dialogRef: MatDialogRef<AddJobComponent>
  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      title: ['', Validators.required],
      description: ['', Validators.required],
      date: [moment(), Validators.required],
      assignee: ['', Validators.required],
    });
    this.getUsers();
  }

  getUsers(): void {
    this.users = this.userService.getUsers();
  }

  onSaveJobClick(): void {
    const payload: AddJobPayload = {
      ...this.form.value,
    };
    this.jobService
      .addJob(payload)
      .pipe(takeUntil(this.ngUnsubscribe))
      .subscribe(response => {
        this.onCloseDialogClick(response);
      });
  }

  onCloseDialogClick(addedJob?: JobListItem): void {
    this.dialogRef.close(addedJob ? addedJob : '');
  }

  ngOnDestroy(): void {
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
