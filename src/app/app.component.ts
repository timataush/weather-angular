// import {Component, OnDestroy} from "@angular/core"
// import { RouterOutlet } from "@angular/router"
// import { LoaderComponent } from "./loader/loader.component"
// import {Subscription} from "rxjs";
// import {WeatherService} from "./weather/weather.service";
//
// @Component({
//   selector: "app-root",
//   standalone: true,
//   imports: [RouterOutlet, LoaderComponent],
//   templateUrl: './app.component.html',
//   styleUrls: ['./app.component.scss']
// })
// export class AppComponent implements OnDestroy {
//   weatherBackgroundClass = 'default';
//   private weatherSubscription: Subscription;
//
//   // constructor(private weatherService: WeatherService) {
//   //   this.weatherSubscription = this.weatherService.getWeather().subscribe(weather => {
//   //     this.updateBackground(weather.iconClassname);
//   //   });
//   // }
//
//
//
//   // private updateBackground(iconClass: string): void {
//   //   const weatherMap: {[key: string]: string} = {
//   //     'wi-day-sunny': 'sunny',
//   //     'wi-day-cloudy': 'cloudy',
//   //     'wi-cloudy': 'cloudy',
//   //     'wi-rain': 'rainy',
//   //     'wi-snow': 'snowy',
//   //     'wi-thunderstorm': 'thunderstorm',
//   //     'wi-night-clear': 'clear',
//   //     'wi-night-cloudy': 'cloudy'
//   //   };
//   //
//   //   this.weatherBackgroundClass = weatherMap[iconClass] || 'default';
//   // }
//
//   private updateBackground(iconClass: string, isCold: boolean): void {
//     const weatherMap: {[key: string]: string} = {
//       'wi-day-sunny': isCold ? 'cold' : 'sunny',
//       'wi-day-cloudy': isCold ? 'cold-cloudy' : 'cloudy',
//       'wi-cloudy': isCold ? 'cold-cloudy' : 'cloudy',
//       'wi-rain': isCold ? 'cold-rain' : 'rainy',
//       'wi-snow': 'snowy',
//       'wi-thunderstorm': 'thunderstorm',
//       'wi-night-clear': isCold ? 'cold-night' : 'clear',
//       'wi-night-cloudy': isCold ? 'cold-night-cloudy' : 'cloudy',
//       'wi-day-snow': 'snowy',
//       'wi-night-snow': 'snowy'
//     };
//
//     this.weatherBackgroundClass = weatherMap[iconClass] || 'default';
//   }
//
//   ngOnDestroy(): void {
//     this.weatherSubscription?.unsubscribe();
//   }
// }


import { Component, OnDestroy } from "@angular/core";
import { RouterOutlet } from "@angular/router";
import { LoaderComponent } from "./loader/loader.component";
import { Subscription } from "rxjs";
import { WeatherService } from "./weather/weather.service";
import { Weather } from "./weather/weather.model"; // Добавьте этот импорт

@Component({
  selector: "app-root",
  standalone: true,
  imports: [RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {
  weatherBackgroundClass = 'default';
  private weatherSubscription: Subscription;

  constructor(private weatherService: WeatherService) {
    this.weatherSubscription = this.weatherService.getWeather().subscribe((weather: Weather) => {
      this.updateBackground(weather.iconClassname, weather.isCold);
    });
  }

  private updateBackground(iconClass: string, isCold: boolean): void {
    const weatherMap: {[key: string]: string} = {
      'wi-day-sunny': isCold ? 'cold' : 'sunny',
      'wi-day-cloudy': isCold ? 'cold-cloudy' : 'cloudy',
      'wi-cloudy': isCold ? 'cold-cloudy' : 'cloudy',
      'wi-rain': isCold ? 'cold-rain' : 'rainy',
      'wi-snow': 'snowy',
      'wi-thunderstorm': 'thunderstorm',
      'wi-night-clear': isCold ? 'cold-night' : 'clear',
      'wi-night-cloudy': isCold ? 'cold-night-cloudy' : 'cloudy',
      'wi-day-snow': 'snowy',
      'wi-night-snow': 'snowy'
    };

    this.weatherBackgroundClass = weatherMap[iconClass] || 'default';
  }

  ngOnDestroy(): void {
    this.weatherSubscription?.unsubscribe();
  }
}