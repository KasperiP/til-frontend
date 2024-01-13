import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiPreviewPosts, ApiUser } from '../models/api.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  readonly user$: BehaviorSubject<ApiUser | null> =
    new BehaviorSubject<ApiUser | null>(null);

  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlerService,
  ) {}

  createPost(body: { content: string; title: string }) {
    return this.http
      .post<void>(`${environment.baseUrl}/api/posts/create`, body)
      .pipe(catchError((e) => this.errorHandlingService.handleError(e)));
  }

  getPosts(limit: number, offset: number) {
    return this.http
      .get<ApiPreviewPosts>(
        `${environment.baseUrl}/api/posts/preview?limit=${limit}&offset=${offset}`,
      )
      .pipe(catchError((e) => this.errorHandlingService.handleError(e)));
  }

  getPost(id: string) {
    return this.http
      .get(`${environment.baseUrl}/api/posts/getFull?id=${id}`)
      .pipe(catchError((e) => this.errorHandlingService.handleError(e)));
  }
}
