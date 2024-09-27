import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-actualites',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actualites.component.html',
  styleUrls: ['./actualites.component.css'],
})
export class ActualitesComponent implements OnInit {
  posts: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.getPosts();
  }

  getPosts() {
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
    this.router.navigate(['/actualite', id]);
  }
}
