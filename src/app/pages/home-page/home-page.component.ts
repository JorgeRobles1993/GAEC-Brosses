import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualidadComponent } from '../../components/actualidad/actualidad.component';
import { VideoSectionComponent } from '../../components/video-section/video-section.component';
import { FullWidthSectionComponent } from '../../components/full-width-section/full-width-section.component';
import { Carousel2Component } from '../../components/carousel2/carousel2.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [
    CommonModule,
    ActualidadComponent,
    VideoSectionComponent,
    FullWidthSectionComponent,
    Carousel2Component,
  ],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent {}
