import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css']
})
export class CarouselComponent {
  images = [
    { id: 1, src: 'assets/images/stabule1.jpg', alt: 'Imagen de la granja 1' },
    { id: 2, src: 'assets/images/vache1.jpg', alt: 'Imagen de la granja 2' },
    { id: 3, src: 'assets/images/tractor1.jpg', alt: 'Imagen de la granja 3' }
  ];

  currentIndex = 0;
  transitionDuration = '0.5s';
  nextSlide() {
    if (this.currentIndex === this.images.length - 1) {
      setTimeout(() => {
        this.transitionDuration = '0s';
        this.currentIndex = 0;
        setTimeout(() => {
          this.transitionDuration = '0.5s';
        }, 50);
      }, 4000);
    } else {
      this.currentIndex++;
    }
  }

  prevSlide() {
    if (this.currentIndex === 0) {
      this.transitionDuration = '0s';
      this.currentIndex = this.images.length - 1;
      setTimeout(() => {
        this.transitionDuration = '0.5s';
      }, 50);
    } else {
      this.currentIndex--;
    }
  }

  ngOnInit() {
    setInterval(() => {
      this.nextSlide();
    }, 4000);
  }
}