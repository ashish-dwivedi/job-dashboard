import { of } from 'rxjs';

export class MockUserService {
  getUsers() {
    return of([]);
  }
}
