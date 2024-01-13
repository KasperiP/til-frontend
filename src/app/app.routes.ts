import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
  },
  {
    path: 'auth/oauth/:provider/callback',
    loadComponent: () =>
      import('./pages/oauth-callback/oauth-callback.component').then(
        (m) => m.OauthCallbackComponent,
      ),
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent,
      ),
    canActivate: [authGuard],
  },
  {
    path: 'writer',
    loadComponent: () =>
      import('./pages/writer/writer.component').then((m) => m.WriterComponent),
    canActivate: [authGuard],
  },
  {
    path: 'feed',
    loadComponent: () =>
      import('./pages/feed/feed.component').then((m) => m.FeedComponent),
  },
  {
    path: 'feed',
    loadComponent: () =>
      import('./pages/feed/feed.component').then((m) => m.FeedComponent),
  },
  {
    path: 'post/:id',
    loadComponent: () =>
      import('./pages/post/post.component').then((m) => m.PostComponent),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
