import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner-colaboradores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner-colaboradores.component.html',
  styleUrls: ['./banner-colaboradores.component.css']
})
export class BannerColaboradoresComponent {
  colaboradores = [
    'assets/logo.png',
    'assets/logo.png',
    'assets/logo.png',
    'assets/logo.png',
    'assets/logo.png',
    'assets/logo.png',
    'assets/logo.png',
    'assets/logo.png',
    'assets/logo.png',
    'assets/logo.png',

  ];
}
