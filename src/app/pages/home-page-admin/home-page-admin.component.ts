import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home-page-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page-admin.component.html',
  styleUrls: ['./home-page-admin.component.css'],
})
export class HomePageAdminComponent implements OnInit {
  userName: string | null = null; 
  users: any[] = [];
  posts: any[] = [];
  post: any;
  newReservations: number = 0;
  lastUpdate: Date = new Date();
  tokenOk: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    const token = localStorage.getItem('authToken');
  
    if (this.authService.isLoggedIn() && this.authService.isAdmin(token)) {
      this.tokenOk = true;
  
      if (token) {
        this.authService.getUsers(token).subscribe(
          (data: any) => {
            this.users = data; 
            console.log('Usuarios obtenidos:', this.users);
          },
          (error) => {
            console.error('Error al obtener los usuarios:', error);
          }
        );
  
        this.authService.getPosts().subscribe(
          (data: any) => {
            this.posts = data; 
            console.log('Publicaciones obtenidas:', this.posts);
          },
          (error) => {
            console.error('Error al obtener las publicaciones:', error);
          }
        );

        this.authService.getLastPost().subscribe(
          (data: any) => {
            this.post = data; 
            console.log('Última publicación obtenida:', this.post);
          },
          (error) => {
            console.error('Error al obtener la última publicación:', error);
          }
        );

        this.userName = localStorage.getItem('user_name');
        this.newReservations = Math.floor(Math.random() * 10);  // Exemple de métrique simulée A CHANGER /******** */
      }
    } else {
      this.tokenOk = false;
    }
  }

  goToActualites() {
    this.router.navigate(['/admin-actualites']);
  }

  goToReservations() {
    this.router.navigate(['/admin-reservations']);
  }

  goToUsers() {
    this.router.navigate(['/admin-users']);
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
  
}
