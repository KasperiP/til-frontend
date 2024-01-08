import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ThemeEnum } from '../models/theme.model';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  currentTheme$: BehaviorSubject<ThemeEnum>;
  private readonly default = ThemeEnum.LIGHT;

  constructor(@Inject(PLATFORM_ID) readonly platformId: string) {
    this.currentTheme$ = new BehaviorSubject<ThemeEnum>(this.default);
  }

  get theme(): ThemeEnum {
    if (isPlatformBrowser(this.platformId)) {
      const theme =
        (localStorage.getItem('theme') as ThemeEnum) ?? this.default;
      this.currentTheme$.next(theme);
      return theme;
    }
    return this.default;
  }

  get isDark(): boolean {
    return this.theme === ThemeEnum.DARK;
  }

  set theme(value: ThemeEnum) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem('theme', value);
      document.documentElement.setAttribute('data-theme', value);
      this.currentTheme$.next(value);
    }
  }
}
