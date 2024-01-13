import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ApiUser } from '../models/api.model';
import { SupportedOauthProviders } from '../models/auth.model';
import { ErrorHandlerService } from './error-handler.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private http: HttpClient,
    private errorHandlingService: ErrorHandlerService,
  ) {}

  loginWithProvider(code: string, provider: SupportedOauthProviders) {
    return this.http
      .post<ApiUser>(`${environment.baseUrl}/api/auth/oauth`, {
        code,
        provider,
      })
      .pipe(catchError((e) => this.errorHandlingService.handleError(e)));
  }

  logout() {
    localStorage.removeItem('isLoggedIn');
    return this.http
      .post<void>(`${environment.baseUrl}/api/auth/logout`, {})
      .pipe(catchError((e) => this.errorHandlingService.handleError(e)));
  }

  signInWithGoogle(): void {
    const googleUrl = new URL('https://accounts.google.com/o/oauth2/v2/auth');
    googleUrl.searchParams.append('client_id', environment.googleClientId);
    googleUrl.searchParams.append(
      'redirect_uri',
      environment.googleRedirectUri,
    );
    googleUrl.searchParams.append('response_type', 'code');
    googleUrl.searchParams.append('scope', 'email profile');

    const urlString = googleUrl.toString();

    window.location.href = urlString;
  }

  signInWithGithub(): void {
    const githubUrl = new URL('https://github.com/login/oauth/authorize');
    githubUrl.searchParams.append('client_id', environment.githubClientId);
    githubUrl.searchParams.append(
      'redirect_uri',
      environment.githubRedirectUri,
    );
    githubUrl.searchParams.append('scope', 'user:email read:user');

    const urlString = githubUrl.toString();

    window.location.href = urlString;
  }

  signInWithLinkedin(): void {
    const linkedinUrl = new URL(
      'https://www.linkedin.com/oauth/v2/authorization',
    );
    linkedinUrl.searchParams.append('client_id', environment.linkedinClientId);
    linkedinUrl.searchParams.append(
      'redirect_uri',
      environment.linkedinRedirectUri,
    );
    linkedinUrl.searchParams.append('response_type', 'code');
    linkedinUrl.searchParams.append('scope', 'profile email openid');

    const urlString = linkedinUrl.toString();

    window.location.href = urlString;
  }
}
