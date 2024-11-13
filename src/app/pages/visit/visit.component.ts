import { CommonModule } from '@angular/common';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CalendarEvent, CalendarModule, CalendarView } from 'angular-calendar';
import { startOfMonth, endOfMonth, addDays, isSaturday, addMonths, subMonths, startOfDay } from 'date-fns';

@Component({
  selector: 'app-visit',
  standalone: true,
  imports: [CommonModule,
    CalendarModule,],
  templateUrl: './visit.component.html',
  styleUrl: './visit.component.css'
})
export class VisitComponent {
  view: CalendarView = CalendarView.Month;
  viewDate: Date = new Date();
  currentDate : Date = new Date();
  events: CalendarEvent[] = [
    {
      start: startOfDay(new Date()), 
      title: 'Evento del sábado',
    },
  ];

  get saturdaysOfMonth(): Date[] {

    const start = startOfMonth(this.viewDate);
    const end = endOfMonth(this.viewDate);
    let current = start;
    const saturdays = [];

    while (current <= end) {
      console.log(current);
      if (isSaturday(current) &&  current >= this.currentDate) {
        saturdays.push(current);
      }
      current = addDays(current, 1);
    }

    return saturdays;
  }

  nextMonth(): void {
    this.viewDate = addMonths(this.viewDate, 1);
  }

  previousMonth(): void {
    this.viewDate = subMonths(this.viewDate, 1);
  }

  isSameDay(date1: Date, date2: Date): boolean {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}