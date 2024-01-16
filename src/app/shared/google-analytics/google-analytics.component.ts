import { isPlatformBrowser } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Inject,
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
export class GoogleAnalyticsComponent {
  trackingCode = environment.googleAnalyticsTrackingCode;

  constructor(
    @Inject(PLATFORM_ID) private readonly platformId: string,
    private readonly renderer: Renderer2,
    private readonly el: ElementRef,
  ) {
    if (isPlatformBrowser(this.platformId)) {
      const script = this.renderer.createElement('script') as HTMLScriptElement;
      script.src = `//www.googletagmanager.com/gtag/js?id=${this.trackingCode}`;
      script.async = true;
      this.renderer.appendChild(this.el.nativeElement, script);

      const script2 = this.renderer.createElement(
        'script',
      ) as HTMLScriptElement;
      const scriptBody = this.renderer.createText(`
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          dataLayer.push(arguments);
        }
        gtag('js', new Date());

        gtag('config', '${this.trackingCode}');
      `);
      this.renderer.appendChild(script2, scriptBody);
      this.renderer.appendChild(this.el.nativeElement, script2);
    }
  }
}
