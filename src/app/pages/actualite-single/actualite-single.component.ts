import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-actualite-single',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './actualite-single.component.html',
  styleUrl: './actualite-single.component.css',
})
export class ActualiteSingleComponent {
  post: any;

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService
  ) {}

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    this.authService.getSinglePost(postId).subscribe(
      (data: any) => {
        this.post = data;
        console.log('Post recuperado:', this.post);
      },
      (error) => {
        console.error('Erreur lors de la récupération du post:', error);
      }
    );
  }
}
