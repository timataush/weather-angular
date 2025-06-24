import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface ForecastItem {
  day: string;
  icon: string;
  temp: number;
}

@Component({
  selector: 'app-weather',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './weather.html',
  styleUrls: ['./weather.scss']
})
export class WeatherComponent implements OnInit {
  currentTemp = 2;
  currentIcon = '🌤️';
  currentView = 'daily';
  isLoading = false;

  forecast: ForecastItem[] = [
    { day: 'Today', icon: '🌤️', temp: 2 },
    { day: 'Tuesday', icon: '🌦️', temp: 0 },
    { day: 'Wednesday', icon: '🌤️', temp: 1 },
    { day: 'Thursday', icon: '☁️', temp: 0 },
    { day: 'Friday', icon: '🌧️', temp: 2 },
    { day: 'Saturday', icon: '🌧️', temp: 2 },
    { day: 'Sunday', icon: '☁️', temp: 1 }
  ];

  ngOnInit() {
    this.loadWeatherData();
  }

  switchView(view: string) {
    this.currentView = view;
    this.loadWeatherData();
  }

  loadWeatherData() {
    this.isLoading = true;

    // Simulate API call
    setTimeout(() => {
      // Generate random weather data
      const temps = [2, 5, -1, 8, 12, 15, 18, 22];
      const icons = ['☀️', '⛅', '🌧️', '❄️', '🌤️'];

      this.currentTemp = temps[Math.floor(Math.random() * temps.length)];
      this.currentIcon = icons[Math.floor(Math.random() * icons.length)];

      // Update forecast
      this.forecast = this.forecast.map(item => ({
        ...item,
        temp: temps[Math.floor(Math.random() * temps.length)],
        icon: icons[Math.floor(Math.random() * icons.length)]
      }));

      this.isLoading = false;
    }, 1000);
  }
}
