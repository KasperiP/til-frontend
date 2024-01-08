import { Component } from '@angular/core';
import { NavbarComponent } from '../../shared/navbar/navbar.component';
import { AboutComponent } from './components/about/about.component';
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
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
