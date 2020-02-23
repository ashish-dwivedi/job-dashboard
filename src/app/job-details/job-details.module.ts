import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { JobDetailsComponent } from './component/job-details.component';

@NgModule({
  declarations: [JobDetailsComponent],
  imports: [CommonModule, SharedModule, ReactiveFormsModule, MatButtonModule, RouterModule],
  exports: [JobDetailsComponent],
})
export class JobDetailsModule {}
