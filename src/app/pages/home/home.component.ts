import { isPlatformBrowser } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Inject,
  PLATFORM_ID,
  signal,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SupportedOauthProviders } from '../../core/models/auth.model';
import { ErrorModalComponent } from '../../shared/error-modal/error-modal.component';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
import { FaqComponent } from './components/faq/faq.component';
import { HeroComponent } from './components/hero/hero.component';
import { LatestPreviewComponent } from './components/latest-preview/latest-preview.component';
import { LearnedCardsComponent } from './components/learned-cards/learned-cards.component';

@Component({
  selector: 'til-home',
  standalone: true,
  imports: [
    NavbarComponent,
    HeroComponent,
    AboutComponent,
    LearnedCardsComponent,
    LatestPreviewComponent,
    ErrorModalComponent,
    FaqComponent,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {
  displayErrorModalSig = signal(false);
  errorData = signal<{
    error: string | string;
    wantedProvider: SupportedOauthProviders | undefined;
  }>({
    error: '',
    wantedProvider: undefined,
  });
  constructor(
    private readonly route: ActivatedRoute,
    @Inject(PLATFORM_ID) private readonly platformId: string,
  ) {}

  closeErrorModal(): void {
    this.displayErrorModalSig.set(false);
    this.errorData.set({
      error: '',
      wantedProvider: undefined,
    });
  }

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) return;
    const error = this.route.snapshot.queryParamMap.get('error');
    const wantedProvider =
      this.route.snapshot.queryParamMap.get('wantedProvider');
    if (error) {
      window.history.replaceState({}, '', '/');
      this.displayErrorModalSig.set(true);
      this.errorData.set({
        error,
        wantedProvider: wantedProvider as SupportedOauthProviders,
      });
    }
  }
}
