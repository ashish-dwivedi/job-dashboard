import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { MatDialogRef } from '@angular/material';
import { JobService } from '../service/job.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AddJobComponent } from './add-job.component';
import { SharedModule } from '../../shared/shared.module';
import { UserService } from '../../shared/services/user.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MockJobService, MockMatDialogRef, MockUserService } from '../../shared/mock-data';

describe('AddJobComponent', () => {
  let component: AddJobComponent;
  let fixture: ComponentFixture<AddJobComponent>;
  let userService: UserService;
  let jobService: JobService;
  let matDialogRef: MatDialogRef<any>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [NoopAnimationsModule, HttpClientTestingModule, SharedModule],
      declarations: [AddJobComponent],
      providers: [
        { provide: FormBuilder, useValue: new FormBuilder() },
        { provide: MatDialogRef, useClass: MockMatDialogRef },
        { provide: UserService, useClass: MockUserService },
        { provide: JobService, useClass: MockJobService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddJobComponent);
    component = fixture.componentInstance;
    userService = TestBed.get(UserService);
    jobService = TestBed.get(JobService);
    matDialogRef = TestBed.get(MatDialogRef);
    spyOn(userService, 'getUsers').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('has a title in h1 tag', () => {
    const title = fixture.debugElement.query(By.css('h2'));
    expect(title).not.toBeNull();
  });

  it('title reads Add Job', () => {
    const title = fixture.debugElement.query(By.css('h2'));
    expect(title.nativeElement.innerHTML).toContain('Add Job');
  });

  it('has save button disabled till form is valid', () => {
    fixture.detectChanges();
    const button = fixture.debugElement.queryAll(By.css('button'));
    expect(button[1].nativeElement.disabled).toBeTruthy();
  });

  it('has save button enabled for a dirty & valid', () => {
    component.form.setValue({
      title: 'title',
      description: 'description',
      date: '2020-02-19',
      assignee: {
        name: 'Ashish',
        email: 'ash@de',
        role: 'Job Handler',
      },
    });
    component.form.markAsDirty();
    fixture.detectChanges();
    const button = fixture.debugElement.queryAll(By.css('button'));
    expect(button[1].nativeElement.disabled).toBeFalsy();
  });

  it('should call user service getUsers function on load', () => {
    expect(userService.getUsers).toHaveBeenCalled();
  });

  it('should call addJob function from job service on save button click', () => {
    spyOn(jobService, 'addJob').and.callThrough();
    component.form.setValue({
      title: 'title',
      description: 'description',
      date: '2020-02-19',
      assignee: {
        name: 'Ashish',
        email: 'ash@de',
        role: 'Job Handler',
      },
    });
    component.form.markAsDirty();
    fixture.detectChanges();
    const buttons = fixture.debugElement.queryAll(By.css('button'));
    const saveButton = buttons[1];
    saveButton.nativeElement.click();
    expect(jobService.addJob).toHaveBeenCalled();
  });

  it('should pass the added job object to the parent component while closing', () => {
    const jobData = {
      id: '123',
      status: 'Active',
      title: 'title',
      description: 'description',
      date: '2020-02-19',
      assignee: {
        name: 'Ashish',
        email: 'ash@de',
        role: 'Job Handler',
      },
    };
    spyOn(matDialogRef, 'close').and.callThrough();
    component.onCloseDialogClick(jobData);
    expect(matDialogRef.close).toHaveBeenCalledWith(jobData);
  });

  it('should pass empty string if dialog is closed and no value is supplied', () => {
    const matIcons = fixture.debugElement.queryAll(By.css('mat-icon'));
    const closeButton = matIcons[0];
    spyOn(matDialogRef, 'close').and.callThrough();
    closeButton.nativeElement.click();
    expect(matDialogRef.close).toHaveBeenCalledWith('');
  });
});
