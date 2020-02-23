import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardListComponent } from './dashboard-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { By } from '@angular/platform-browser';

describe('DashboardListComponent', () => {
  let component: DashboardListComponent;
  let fixture: ComponentFixture<DashboardListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [SharedModule],
      declarations: [DashboardListComponent],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardListComponent);
    component = fixture.componentInstance;
    component.jobList = [
      {
        id: '123',
        title: 'Redo Kitchen Tiles',
        description: 'Kitchen tiles need to be replaced completely',
        date: '2020-02-17',
        status: 'Active',
        assignee: { name: 'Jimmy K', email: 'jimmy-k@myhammer.de', role: 'Case Manager', avatar: 'image1.jpg' },
      },
    ];
    spyOn(component.rowClicked, 'emit');
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit an event on row click', () => {
    component.onRowClick(component.jobList[0]);
    expect(component.rowClicked.emit).toHaveBeenCalledWith('123');
  });
});
