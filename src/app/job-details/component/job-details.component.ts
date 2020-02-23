import { Job } from '../../shared/interfaces';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class JobDetailsComponent implements OnInit {
  job: Job;
  form: FormGroup;

  constructor(private readonly route: ActivatedRoute, private readonly formBuilder: FormBuilder) {}

  ngOnInit() {
    this.job = this.route.snapshot.data.job;
    this.form = this.formBuilder.group({
      title: [this.job.title || ''],
      description: [this.job.description || ''],
      date: [this.job.date || ''],
    });
  }
}
