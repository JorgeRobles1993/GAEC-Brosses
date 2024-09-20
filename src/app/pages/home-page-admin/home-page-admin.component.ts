import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home-page-admin',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-page-admin.component.html',
  styleUrl: './home-page-admin.component.css',
})
export class HomePageAdminComponent implements OnInit {
  users: any[] = [];
  posts: any[] = [];
  post: any;
  tokenOk: boolean = false;
  constructor(private authService: AuthService) {}

  ngOnInit() {
    const token = localStorage.getItem('authToken');

    console.log('getuser', this.authService.getUser());

    if (this.authService.isLoggedIn() && this.authService.isAdmin(token)) {
      this.tokenOk = true;
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

        this.authService.getPosts().subscribe(
          (data: any) => {
            this.posts = data;
            console.log('Posts récupérés:', this.posts);
          },
          (error) => {
            console.error(
              'Erreur lors de la récupération des utilisateurs:',
              error
            );
          }
        );

        this.authService.getSinglePost(1).subscribe(
          (data: any) => {
            this.post = data;
            console.log('Posts single:', this.post);
          },
          (error) => {
            console.error(
              'Erreur lors de la récupération des utilisateurs:',
              error
            );
          }
        );
      }
    } else {
      console.log('pasok');
      console.log(this.authService.isLoggedIn());
      console.log(this.authService.isAdmin(token));

      this.tokenOk = false;
    }
  }
}
