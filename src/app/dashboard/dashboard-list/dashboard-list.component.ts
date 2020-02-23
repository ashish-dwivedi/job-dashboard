import { MatTable } from '@angular/material/table';
import { JobListItem } from '../../shared/interfaces';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'app-dashboard-list',
  templateUrl: './dashboard-list.component.html',
  styleUrls: ['./dashboard-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardListComponent {
  @Input() jobList: JobListItem[];
  @Output() rowClicked = new EventEmitter();
  displayedColumns = ['title', 'description', 'date', 'status', 'assignee'];
  @ViewChild('jobTable') tableRef: MatTable<JobListItem>;

  constructor() {}

  onRowClick(job: JobListItem): void {
    this.rowClicked.emit(job.id);
  }
}
