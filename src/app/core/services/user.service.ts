import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiStatistics, ApiUser } from '../models/api.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  readonly user$: BehaviorSubject<ApiUser | null> =
    new BehaviorSubject<ApiUser | null>(null);

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

  getStatistics() {
    return this.http
      .get<ApiStatistics>(`${environment.baseUrl}/api/user/statistics`)
      .pipe(catchError((e) => this.errorHandlingService.handleError(e)));
  }

  clearUser(): void {
    this.setUser(null);
  }
}
