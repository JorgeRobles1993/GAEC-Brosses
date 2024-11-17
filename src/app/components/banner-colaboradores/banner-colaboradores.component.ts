import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-banner-colaboradores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './banner-colaboradores.component.html',
  styleUrls: ['./banner-colaboradores.component.css'],
})
export class BannerColaboradoresComponent {
  colaboradores = [
    'assets/chambre-de-agriculture.jpg',
    'assets/CliniqueDesPierresJaunes.jpg',
    'assets/CrozetFendt.jpg',
    'assets/eureacoop.jpg',
    'assets/CreditAgricole.jpg',
    'assets/herdbookcharolais.jpg',
    'assets/GenesDifussion.jpg',
    'assets/coopelgenetique.jpg',
    'assets/jhondeere.jpeg',
  ];
}
