import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView , CalendarModule } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { startOfDay, addHours, addDays } from 'date-fns';
import { Router } from '@angular/router';
import { AuthService } from '../../auth.service'; 

@Component({
  selector: 'app-admin-reservations',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule,
  ],
  templateUrl: './admin-reservations.component.html',
  styleUrls: ['./admin-reservations.component.css']
})
export class AdminReservationsComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  CalendarView = CalendarView;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.loadReservations();
  }

  loadReservations() {
    this.authService.getReservations().subscribe(
      (reservations: any[]) => {
        this.events = reservations.map(reservation => ({
          title: `Reservación de ${reservation.user.name}`,
          start: new Date(`${reservation.reservation_date}T${reservation.start_time}`),
          end: new Date(`${reservation.reservation_date}T${reservation.end_time}`),
          color: { primary: '#ad2121', secondary: '#FAE3E3' },
          meta: { id: reservation.id, user: reservation.user },
        }));
      },
      (error) => {
        console.error('Error al cargar las reservas:', error);
      }
    );
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  handleEventClick(event: CalendarEvent) {
    console.log('Clicked event:', event);
  }



}
