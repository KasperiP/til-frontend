import {
  provideHttpClient,
  withFetch,
  withInterceptors,
} from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { provideRouter } from '@angular/router';
import { provideQuillConfig } from 'ngx-quill';
import { routes } from './app.routes';
import { credentialsInterceptor } from './core/interceptors/credentials.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch(), withInterceptors([credentialsInterceptor])),
    importProvidersFrom(BrowserAnimationsModule),
    provideQuillConfig({
      modules: {
        syntax: true,
        toolbar: [['code-block']],
      },
      theme: 'snow',
    }),
  ],
};
