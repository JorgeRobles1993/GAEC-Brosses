import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-reservations',
  standalone: true,
  templateUrl: './admin-reservations.component.html',
  styleUrls: ['./admin-reservations.component.css'],
})
export class AdminReservationsComponent implements OnInit {
  reservations: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
    // Aquí puedes agregar una llamada para obtener las reservaciones de la API
    // Supón que tienes un servicio getReservations
    // this.authService.getReservations().subscribe(
    //   (data: any) => {
    //     this.reservations = data;
    //   },
    //   (error) => {
    //     console.error('Erreur lors de la récupération des réservations:', error);
    //   }
    // );

  }
  goToAdminDashboard() {
    this.router.navigate(['/admin']);
  }
}
