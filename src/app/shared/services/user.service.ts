import { Observable } from 'rxjs';
import { User } from '../interfaces';
import { Apollo } from 'apollo-angular';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

// import { map } from 'rxjs/operators';
// import { USERS_QUERY } from '../queries';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private readonly http: HttpClient) {}

  getUsers(): Observable<User[]> {
    const url = `${environment.baseApiUrl}/user/all`;
    return this.http.get<User[]>(url);
    // return this.apollo
    //   .query<{users: User[]}>({
    //     query: USERS_QUERY,
    //   })
    //   .pipe(map(response => response.data.users));
  }
}
