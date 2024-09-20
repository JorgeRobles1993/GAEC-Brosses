import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActualidadComponent } from '../../components/actualidad/actualidad.component';
import { VideoSectionComponent } from '../../components/video-section/video-section.component';
import { FullWidthSectionComponent } from '../../components/full-width-section/full-width-section.component';
import { Carousel2Component } from '../../components/carousel2/carousel2.component';
import { AuthService } from '../../auth.service';

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
export class HomePageComponent implements OnInit {
  users: any[] = [];

  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('authToken');
    if (token) {
      this.authService.getUsers(token).subscribe(
        (data: any) => {
          this.users = data;
          console.log('Utilisateurs récupérés:', this.users);
        },
        (error) => {
          console.error(
            'Erreur lors de la récupération des utilisateurs:',
            error
          );
        }
      );
    }
  }
}
