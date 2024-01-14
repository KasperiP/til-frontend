import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  Inject,
  Injectable,
  InjectionToken,
  Optional,
  PLATFORM_ID,
} from '@angular/core';

// this const is loaded on the server.ts
export const APP_SSR_COOKIES = new InjectionToken<any>('APP_SSR_COOKIES');

@Injectable({
  providedIn: 'root',
})
export class CookieService {
  private isBrowser: boolean;
  constructor(
    @Optional() @Inject(DOCUMENT) private doc: Document,
    @Inject(PLATFORM_ID) private platformId: string,
    @Optional() @Inject(APP_SSR_COOKIES) private ssrCookies: string,
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  get(): string {
    return this.isBrowser ? this.doc.cookie : this.ssrCookies;
  }
}
