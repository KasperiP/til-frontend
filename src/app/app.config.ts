import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import {
  MARKED_OPTIONS,
  MarkedOptions,
  MarkedRenderer,
  provideMarkdown,
} from 'ngx-markdown';
import { routes } from './app.routes';
import { credentialsInterceptor } from './core/interceptors/credentials.interceptor';

export function markedOptionsFactory(): MarkedOptions {
  const renderer = new MarkedRenderer();

  /**
   * TIL has own title property which is page's h1. We don't want
   * users to add more h1 tags, so we are replacing them with h2, but
   * keeping the same style (h1 is bigger than h2).
   *
   *  Having multiple h1 tags is not good for SEO.
   */
  renderer.heading = (text: string, level: number) => {
    if (level === 1) {
      return `<h2 class="text-4xl font-bold mt-8">${text}</h2>\n`;
    } else {
      return `<h${level}>${text}</h${level}>\n`;
    }
  };

  return {
    renderer: renderer,
  };
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([credentialsInterceptor])),
    importProvidersFrom(BrowserAnimationsModule),
    provideMarkdown({
      markedOptions: {
        provide: MARKED_OPTIONS,
        useValue: markedOptionsFactory(),
      },
    }),
  ],
};
