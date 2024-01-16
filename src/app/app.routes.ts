import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./pages/home/home.component').then((m) => m.HomeComponent),
    title: 'Today I Learned — Share what you learned today',
  },
  {
    path: 'auth/oauth/:provider/callback',
    loadComponent: () =>
      import('./pages/oauth-callback/oauth-callback.component').then(
        (m) => m.OauthCallbackComponent,
      ),
    title: 'Authenticating...',
  },
  {
    path: 'profile',
    loadComponent: () =>
      import('./pages/profile/profile.component').then(
        (m) => m.ProfileComponent,
      ),
    canActivate: [authGuard],
    title: 'Profile',
  },
  {
    path: 'new-post',
    loadComponent: () =>
      import('./pages/new-post/new-post.component').then(
        (m) => m.NewPostComponent,
      ),
    canActivate: [authGuard],
    title: 'Write a post',
  },
  {
    path: 'feed',
    loadComponent: () =>
      import('./pages/feed/feed.component').then((m) => m.FeedComponent),
    title: 'Feed',
  },
  {
    path: 'post/:id',
    loadComponent: () =>
      import('./pages/post/post.component').then((m) => m.PostComponent),
  },
  {
    path: 'legal/terms-of-service',
    loadComponent: () =>
      import('./pages/terms-of-service/terms-of-service.component').then(
        (m) => m.TermsOfServiceComponent,
      ),
  },
  {
    path: 'legal/privacy-policy',
    loadComponent: () =>
      import('./pages/privacy-policy/privacy-policy.component').then(
        (m) => m.PrivacyPolicyComponent,
      ),
  },
  {
    path: '**',
    redirectTo: '',
  },
];
