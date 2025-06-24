import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface CalendarEvent {
  time: string;
  title: string;
}

@Component({
    selector: 'app-calendar',
    imports: [CommonModule],
    templateUrl: './calendar.html',
    styleUrls: ['./calendar.scss']
})
export class CalendarComponent implements OnInit {
  events: CalendarEvent[] = [
    { time: '9:00', title: 'English class' },
    { time: '10:00', title: 'Daily meeting' },
    { time: '16:00', title: 'Retro' }
  ];

  ngOnInit() {
    // Load calendar events
  }

  loadCalendarEvents() {
    // Simulate Google Calendar API call
    // In real implementation, this would integrate with Google Calendar API
  }
}
