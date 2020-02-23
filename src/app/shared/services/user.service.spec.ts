import { TestBed } from '@angular/core/testing';

import { UserService } from './user.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../../../environments/environment';
import { User } from '../interfaces';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.get(UserService);
    httpMock = TestBed.get(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return list of all the users', () => {
    const response: User[] = [{ name: 'Ashish', avatar: 'abc', role: 'Manager', email: 'ashish@dwivedi.de' }];
    service.getUsers().subscribe(res => {
      expect(res).toBe(response);
    });
    const request = httpMock.expectOne(`${environment.baseApiUrl}/user/all`);
    expect(request.request.method).toBe('GET');
    request.flush(response);
    httpMock.verify();
  });
});
