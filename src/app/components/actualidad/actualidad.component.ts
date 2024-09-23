import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-actualidad',
  standalone: true,
  imports: [CommonModule], // Importa CommonModule aquí
  templateUrl: './actualidad.component.html',
  styleUrls: ['./actualidad.component.css'],
})
export class ActualidadComponent implements OnInit {
  // Definición de las tarjetas en francés
  posts: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getPosts().subscribe(
      (data: any) => {
        this.posts = data;
        console.log('Posts récupérés:', this.posts);
      },
      (error) => {
        console.error('Erreur lors de la récupération des actualités:', error);
      }
    );
  }

  redirectToSinglePost(id: number) {
    //redirection to single post
    this.router.navigate(['/actualite', id]);
  }
}
