import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig } from '@angular/core';
import { provideClientHydration } from '@angular/platform-browser';
import { provideRouter } from '@angular/router';
import { provideQuillConfig } from 'ngx-quill';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideClientHydration(),
    provideHttpClient(withFetch()),
    provideQuillConfig({
      modules: {
        syntax: true,
        toolbar: [['code-block']],
      },
      theme: 'snow',
    }),
  ],
};
