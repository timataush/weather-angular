import { Component, Input, type OnChanges, type OnDestroy, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import type { Subscription } from "rxjs"
import { ForecastService } from "./forecast.service"
import type { Forecast } from "./forecast.model"

@Component({
  selector: "app-forecast",
  standalone: true,
  imports: [CommonModule],
  templateUrl: './forecast.component.html',
  styleUrls: ['./forecast.component.scss']
})
export class ForecastComponent implements OnChanges, OnDestroy {
  @Input() cityName!: string
  @Input() measureOfTemp!: string
  @Input() viewMode: "daily" | "hourly" = "daily"

  private forecastService = inject(ForecastService)
  private subscription?: Subscription

  forecastData: any[] = [];

  ngOnChanges(): void {
    if (this.cityName) {
      this.loadForecast()
    }
  }

  ngOnDestroy(): void {
    this.subscription?.unsubscribe()
  }

  getDisplayedForecast(): Forecast[] {
    return this.forecastData.slice(0, 6)
  }

  getWeatherIcon(iconClass: string): string {
    const iconMap: { [key: string]: string } = {
      "wi-day-sunny": "☀️",
      "wi-day-cloudy": "⛅",
      "wi-cloudy": "☁️",
      "wi-rain": "🌧️",
      "wi-snow": "❄️",
      "wi-thunderstorm": "⛈️",
      "wi-night-clear": "🌙",
      "wi-night-cloudy": "☁️",
    }

    return iconMap[iconClass] || "☀️"
  }

  private loadForecast(): void {
    this.subscription?.unsubscribe()

    this.subscription = this.forecastService.getForecastByCity(this.cityName).subscribe((forecast) => {
      this.forecastData = forecast.map((forecastByDay: any) =>
        this.forecastService.handleResponseForecastData(forecastByDay),
      )
    })
  }
}

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

