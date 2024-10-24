import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  isMenuOpen = false;
  userName: string | null = null;
  userRol: string | null = null;
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((isAuthenticated) => {
      this.isAuthenticated = isAuthenticated;

      console.log(this.isAuthenticated)
      if (this.isAuthenticated) {
        const user = this.authService.getUserFromLocalStorage();
        this.userName = user ? user.name : null;
        this.userRol = user ? user.rol : null;
      } else {
        this.userName = null;
        this.userRol = null;
      }
    });
  }

  toggleMenu() {
    if (window.innerWidth < 1024) {
      this.isMenuOpen = !this.isMenuOpen;
    }
  }

  logout() {
    this.authService.logout().subscribe(() => {
      this.router.navigate(['/login']);
    });
  }
}
