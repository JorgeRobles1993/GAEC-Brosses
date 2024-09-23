import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // Importa el RouterModule
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Añade RouterModule aquí
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit{
  isMenuOpen = false;
  userName : string | null = null;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    const user = this.authService.getUserFromLocalStorage();
    if(user && user.name) {
      this.userName = user.name;
    }
  }

  toggleMenu() {
    if (window.innerWidth < 1024) {
      // Solo cierra el menú si la pantalla es pequeña (responsive)
      this.isMenuOpen = !this.isMenuOpen;
    }
  }

  logout() {
    this.authService.logout();
    this.userName = null;
    this.router.navigate(['/login']); // Redireccionar a la página de login
  }
}
