import { CommonModule, isPlatformBrowser } from '@angular/common';
import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ThemeService } from './core/services/theme.service';
import { FooterComponent } from './shared/footer/footer.component';
import { NavbarComponent } from './shared/navbar/navbar.component';

@Component({
  selector: 'til-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FooterComponent, NavbarComponent],
  templateUrl: './app.component.html',
})
export class AppComponent implements OnInit {
  constructor(
    private readonly themeService: ThemeService,
    @Inject(PLATFORM_ID) private readonly platformId: string,
  ) {}

  ngOnInit() {
    if (!isPlatformBrowser(this.platformId)) return;
    const theme = this.themeService.theme;
    document.documentElement.setAttribute('data-theme', theme);
  }
}
