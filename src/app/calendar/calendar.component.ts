import { Component } from '@angular/core';
import { TaskService } from './calendar.service';
import { CommonModule } from '@angular/common';
import { Observable } from 'rxjs';

interface Task {
  time: string;
  name: string;
  id?: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent {
  tasks$: Observable<Task[]>;

  constructor(private taskService: TaskService) {
    this.tasks$ = this.taskService.getTasks();
  }
}