import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, map, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiUser, ApiUserStatistics } from '../models/api.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly user$: BehaviorSubject<ApiUser | null> =
    new BehaviorSubject<ApiUser | null>(null);

  readonly isLoggedIn$ = this.user$.pipe(map((user) => !!user));

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlerService,
  ) {}

  setUser(user: ApiUser | null): void {
    this.user$.next(user);
  }

  getUser() {
    return this.http.get<ApiUser>(`${environment.baseUrl}/api/user/me`).pipe(
      tap((user) => this.setUser(user)),
      catchError((e) => this.errorHandlingService.handleError(e)),
    );
  }

  getUserStatistics() {
    return this.http
      .get<ApiUserStatistics>(`${environment.baseUrl}/api/user/statistics`)
      .pipe(catchError((e) => this.errorHandlingService.handleError(e)));
  }

  clearUser(): void {
    this.setUser(null);
  }
}
