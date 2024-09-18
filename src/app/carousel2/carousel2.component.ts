import { Component } from '@angular/core';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-carousel2',
  standalone: true,
  imports: [CarouselModule, CommonModule],
  templateUrl: './carousel2.component.html',
  styleUrl: './carousel2.component.css',
})
export class Carousel2Component {
  images = [
    {
      id: '1',
      title: 'stabule',
      src: 'assets/images/stabule1.jpg',
      alt: 'Imagen de la granja 1',
    },
    {
      id: '2',
      title: 'vache',
      src: 'assets/images/vache1.jpg',
      alt: 'Imagen de la granja 2',
    },
    {
      id: '3',
      title: 'tractor',
      src: 'assets/images/tractor1.jpg',
      alt: 'Imagen de la granja 3',
    },
  ];

  customOptions: OwlOptions = {
    loop: true,
    margin: 20,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    dots: true,
    dotsEach: true,
    navSpeed: 800,
    smartSpeed: 1000,
    navText: [
      '<i class="fas fa-chevron-left"></i>',
      '<i class="fas fa-chevron-right"></i>',
    ],
    center: true,
    responsive: {
      0: {
        items: 1, // Un solo elemento en pantallas pequeñas
      },
      600: {
        items: 1, // Un solo elemento en pantallas medianas
      },
      1000: {
        items: 1, // Un solo elemento en pantallas grandes
      },
    },
    nav: true,
  };
}
