import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualidad',
  standalone: true,
  imports: [CommonModule],  // Importa CommonModule aquí
  templateUrl: './actualidad.component.html',
  styleUrls: ['./actualidad.component.css']
})
export class ActualidadComponent {
  // Definición de las tarjetas en francés
  cards = [
    {
      id: 1,
      title: 'Nouvelles de la Ferme',
      description: 'Découvrez les dernières nouvelles de notre ferme, y compris les nouvelles arrivées et les événements récents.',
      imageUrl: 'assets/images/actualite1.jpg',
    },
    {
      id: 2,
      title: 'Événements à venir',
      description: 'Restez informé sur les prochains événements que nous organisons, de la foire agricole aux visites guidées.',
      imageUrl: 'assets/images/actualite2.jpg',
    },
    {
      id: 3,
      title: 'Visiter la Ferme',
      description: "Venez découvrir notre exploitation agricole lors d'une visite guidée. Nous serons ravis de partager notre passion avec vous!",
      imageUrl: 'assets/images/actualite3.jpg',
    }
  ];
}
