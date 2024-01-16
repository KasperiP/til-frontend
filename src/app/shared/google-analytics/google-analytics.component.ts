import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
  PLATFORM_ID,
  Renderer2,
} from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'til-google-analytics',
  standalone: true,
  imports: [],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleAnalyticsComponent implements OnInit {
  trackingCode = environment.googleAnalyticsTrackingCode;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private readonly renderer: Renderer2,
  ) {}

  ngOnInit(): void {
    if (isPlatformBrowser(this.platformId) && environment.production) {
      this.appendGoogleAnalyticsScripts();
    }
  }

  private appendGoogleAnalyticsScripts(): void {
    const head = document.getElementsByTagName('head')[0];

    const script = this.renderer.createElement('script');
    script.src = `https://www.googletagmanager.com/gtag/js?id=${this.trackingCode}`;
    script.async = true;
    this.renderer.appendChild(head, script);

    const script2 = this.renderer.createElement('script');
    const scriptBody = this.renderer.createText(`
      window.dataLayer = window.dataLayer || [];
      function gtag() {
        dataLayer.push(arguments);
      }
      gtag('js', new Date());

      gtag('config', '${this.trackingCode}');
    `);
    this.renderer.appendChild(script2, scriptBody);
    this.renderer.appendChild(head, script2);
  }
}
