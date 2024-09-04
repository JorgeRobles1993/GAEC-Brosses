import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CarouselComponent } from '../carousel/carousel.component';
import { ActualidadComponent } from '../actualidad/actualidad.component';
import { VideoSectionComponent } from '../video-section/video-section.component';

@Component({
  selector: 'app-home-page',
  standalone: true,
  imports: [CommonModule, CarouselComponent, ActualidadComponent, VideoSectionComponent],
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent {}
