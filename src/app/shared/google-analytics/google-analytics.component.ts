import { DOCUMENT, isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  PLATFORM_ID,
} from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'til-google-analytics',
  standalone: true,
  imports: [],
  template: '',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GoogleAnalyticsComponent {
  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    @Inject(DOCUMENT) private document: Document,
  ) {
    const gaTrackId = environment.googleAnalyticsTrackingCode;
    if (isPlatformBrowser(this.platformId)) {
      const scriptGtag = this.document.createElement(
        'script',
      ) as HTMLScriptElement;
      scriptGtag.src = `//www.googletagmanager.com/gtag/js?id=${gaTrackId}`;
      scriptGtag.async = true;
      this.document.head.appendChild(scriptGtag);

      const scriptInit = this.document.createElement(
        'script',
      ) as HTMLScriptElement;
      const scriptBody = this.document.createTextNode(`
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag('js', new Date());
        gtag('config', '${gaTrackId}');
      `);

      scriptInit.appendChild(scriptBody);
      this.document.head.appendChild(scriptInit);
    }
  }
}
