import { CommonModule, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  PLATFORM_ID,
} from '@angular/core';
import { NavigationEnd, Router, RouterOutlet } from '@angular/router';
import { Subject, filter, takeUntil } from 'rxjs';
import { FooterComponent } from './shared/footer/footer.component';
import { GoogleAnalyticsComponent } from './shared/google-analytics/google-analytics.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'til-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    FooterComponent,
    NavbarComponent,
    GoogleAnalyticsComponent,
  ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit, OnDestroy {
  private readonly onDestroy$ = new Subject<void>();

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private readonly router: Router,
  ) {}

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      this.router.events
        .pipe(
          filter((event) => event instanceof NavigationEnd),
          takeUntil(this.onDestroy$),
        )
        .subscribe(() => window.scrollTo(0, 0));
    }
  }

  ngOnDestroy() {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
