import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router'; // Importa el RouterModule

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule], // Añade RouterModule aquí
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  isMenuOpen = false;

  toggleMenu() {
    if (window.innerWidth < 1024) { // Solo cierra el menú si la pantalla es pequeña (responsive)
      this.isMenuOpen = !this.isMenuOpen;
    }
  }
}
