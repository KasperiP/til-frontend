import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { User } from '../models/api.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  readonly user$: BehaviorSubject<User | null> =
    new BehaviorSubject<User | null>(null);

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlerService,
  ) {}

  createPost(body: { content: string; title: string }): Observable<any> {
    return this.http
      .post(`${environment.baseUrl}/api/posts/create`, body)
      .pipe(catchError((e) => this.errorHandlingService.handleError(e)));
  }
}
