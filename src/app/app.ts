import { Component } from '@angular/core';

import { HeaderComponent } from './components/header/header';
import { WeatherComponent } from './components/weather/weather';
import { CalendarComponent } from './components/calendar/calendar';

@Component({
    selector: 'app-root',
    imports: [HeaderComponent, WeatherComponent, CalendarComponent],
    template: `
    <div class="weather-bg" [class]="weatherCondition"></div>

    <div class="app-container">
      <div class="glass-container">
        <app-header (weatherConditionChange)="onWeatherConditionChange($event)"></app-header>
        <app-calendar></app-calendar>
        <app-weather></app-weather>
      </div>
    </div>
  `,
    styles: [`
    .app-container {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      position: relative;
      z-index: 1;
    }
  `]
})
export class AppComponent {
  weatherCondition = 'sunny';

  onWeatherConditionChange(condition: string) {
    this.weatherCondition = condition;
  }
}
