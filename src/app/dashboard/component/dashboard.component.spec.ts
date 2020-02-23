import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { Router } from '@angular/router';
import { By } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../shared/shared.module';
import { RouterTestingModule } from '@angular/router/testing';
import { DashboardComponent } from './dashboard.component';
import { MockDialog, mockJobList } from '../../shared/mock-data';
import { AddJobComponent } from '../add-job/add-job.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('DashboardComponent', () => {
  let component: DashboardComponent;
  let fixture: ComponentFixture<DashboardComponent>;
  let router: Router;
  let dialog: MatDialog;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, HttpClientTestingModule, SharedModule, NoopAnimationsModule],
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [DashboardComponent],
      providers: [{ provide: MatDialog, useClass: MockDialog }],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardComponent);
    component = fixture.componentInstance;
    component.jobList = mockJobList;
    router = TestBed.get(Router);
    dialog = TestBed.get(MatDialog);
    spyOn(dialog, 'open').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title in h1 tag', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading).toBeDefined();
  });

  it('title should read Jobs List', () => {
    const heading = fixture.debugElement.query(By.css('h1'));
    expect(heading.nativeElement.innerHTML).toBe('Jobs List');
  });

  it('should show corresponding message for no added jobs', () => {
    component.jobList = [];
    fixture.detectChanges();
    const messageContainer = fixture.debugElement.query(By.css('h3'));
    expect(messageContainer.nativeElement.innerHTML).toBe('No jobs added yet!');
  });

  it('should render the list component for added jobs', () => {
    fixture.detectChanges();
    const listComponent = fixture.debugElement.query(By.css('app-dashboard-list'));
    expect(listComponent).toBeDefined();
  });

  it('should show corresponding message for no added jobs', () => {
    component.jobList = [];
    fixture.detectChanges();
    const messageContainer = fixture.debugElement.query(By.css('h3'));
    expect(messageContainer.nativeElement.innerHTML).toBe('No jobs added yet!');
  });

  it('should navigate to details page on clicking on job row', () => {
    const id = '123';
    spyOn(router, 'navigate').and.callFake(() => {});
    component.onJobItemClick(id);
    expect(router.navigate).toHaveBeenCalledWith([`job/details/${id}`]);
  });

  it('should open a dialog with passed values', () => {
    const addButton = fixture.debugElement.query(By.css('button'));
    addButton.nativeElement.click();
    expect(dialog.open).toHaveBeenCalledWith(AddJobComponent, { width: '600px', disableClose: true });
  });
});
