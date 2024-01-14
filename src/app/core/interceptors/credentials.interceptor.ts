import { isPlatformBrowser } from '@angular/common';
import { HttpEvent, HttpHandlerFn, HttpRequest } from '@angular/common/http';
import { PLATFORM_ID, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { CookieService } from '../services/cookie.service';

export function credentialsInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> {
  const platformId = inject(PLATFORM_ID);
  const cookieService = inject(CookieService);
  const isBrowser = isPlatformBrowser(platformId);
  let modifiedReq: HttpRequest<unknown>;
  if (isBrowser) {
    modifiedReq = req.clone({
      withCredentials: true,
    });
  } else {
    const cookies = cookieService.get();

    // Parse session cookie and set it to the request
    const sessionCookie = cookies
      ?.split(';')
      ?.find((cookie) => cookie.startsWith('session='));

    modifiedReq = req.clone({
      withCredentials: true,
      setHeaders: {
        cookie: sessionCookie ?? '',
      },
    });
  }
  return next(modifiedReq);
}
