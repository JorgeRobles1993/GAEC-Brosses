import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-actualites',
  standalone: true,
  imports: [ CommonModule],
  templateUrl: './admin-actualites.component.html',
  styleUrls: ['./admin-actualites.component.css'],
})
export class AdminActualitesComponent implements OnInit {
  actualites: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.authService.getPosts().subscribe(
      (data: any) => {
        this.actualites = data;
      },
      (error) => {
        console.error('Erreur lors de la récupération des actualités:', error);
      }
    );
  }

  goToAdminDashboard() {
    this.router.navigate(['/admin']);  // Navega a la ruta de la dashboard
  }
}
