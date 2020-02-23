import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MatButtonModule } from '@angular/material/button';
import { AddJobComponent } from './add-job/add-job.component';
import { DashboardComponent } from './component/dashboard.component';
import { DashboardListComponent } from './dashboard-list/dashboard-list.component';

@NgModule({
  declarations: [DashboardComponent, DashboardListComponent, AddJobComponent],
  imports: [CommonModule, SharedModule, MatButtonModule, ReactiveFormsModule],
  exports: [DashboardListComponent],
  entryComponents: [AddJobComponent],
})
export class DashboardModule {}
