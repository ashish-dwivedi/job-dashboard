import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { JobDetailsComponent } from './job-details.component';
import { RouterTestingModule } from '@angular/router/testing';
import { mockDetailsRouteData } from '../../shared/mock-data';
import { Job } from '../../shared/interfaces';

describe('JobDetailsComponent', () => {
  let component: JobDetailsComponent;
  let fixture: ComponentFixture<JobDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      imports: [RouterTestingModule],
      declarations: [JobDetailsComponent],
      providers: [
        { provide: FormBuilder, useValue: new FormBuilder() },
        { provide: ActivatedRoute, useValue: mockDetailsRouteData },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have title, description and date controls declared', () => {
    expect(component.form.controls.title).toBeDefined();
    expect(component.form.controls.description).toBeDefined();
    expect(component.form.controls.date).toBeDefined();
  });

  it('should assign corresponding values from Job to form controls', () => {
    component.job = {
      id: '123',
      title: 'Redo Kitchen Tiles',
      description: 'Kitchen tiles need to be replaced completely',
      date: '2020-02-17',
      status: 'Active',
      assignee: {
        name: 'Jimmy K',
        email: 'jimmy-k@myhammer.de',
        role: 'Case Manager',
        avatar: 'image1.jpg',
      },
      attachments: [
        {
          name: 'SampleTile.jpg',
          downloadUrl: 'download-url-1',
        },
        {
          name: 'Query.pdf',
          downloadUrl: 'download-url-2',
        },
      ],
    };
    fixture.detectChanges();
    expect(component.form.controls.title.value).toBe('Redo Kitchen Tiles');
    expect(component.form.controls.description.value).toBe('Kitchen tiles need to be replaced completely');
    expect(component.form.controls.date.value).toBe('2020-02-17');
  });
});
