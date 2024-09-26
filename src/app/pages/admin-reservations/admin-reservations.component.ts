import { Component, OnInit } from '@angular/core';
import { CalendarEvent, CalendarView } from 'angular-calendar';
import { CommonModule } from '@angular/common';
import { startOfDay, addHours, addDays } from 'date-fns';
import { Router } from '@angular/router';
import { CalendarModule } from 'angular-calendar';

@Component({
  selector: 'app-admin-reservations',
  standalone: true,
  imports: [
    CommonModule,
    CalendarModule, // Import the full CalendarModule
  ],
  templateUrl: './admin-reservations.component.html',
  styleUrls: ['./admin-reservations.component.css']
})
export class AdminReservationsComponent implements OnInit {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  events: CalendarEvent[] = [];

  CalendarView = CalendarView;

  ngOnInit(): void {
    // Simulate some events
    this.events = [
      {
        start: startOfDay(new Date()),
        title: 'Test Reservation 1',
        color: { primary: '#1e90ff', secondary: '#D1E8FF' },
      },
      {
        start: addHours(new Date(), 2),
        end: addHours(new Date(), 4),
        title: 'Test Reservation 2',
        color: { primary: '#e3bc08', secondary: '#FDF1BA' },
        allDay: false,
      },
      {
        start: addDays(new Date(), 1),
        title: 'Test Reservation 3',
        color: { primary: '#ad2121', secondary: '#FAE3E3' },
      },
    ];
  }

  setView(view: CalendarView) {
    this.view = view;
  }

  handleEventClick(event: CalendarEvent) {
    console.log('Clicked event:', event);
  }
}
