import { Component, type OnInit, type OnDestroy, inject } from "@angular/core"
import { CommonModule } from "@angular/common"
import { ActivatedRoute, Router } from "@angular/router"
import type { Subscription } from "rxjs"
import { WeatherService } from "./weather.service"
import { AppService } from "../shared/services/app.service"
import type { Weather } from "./weather.model"
import { SearchBarComponent } from "../search-bar/search-bar.component"
import { ClockComponent } from "../clock/clock.component"
import { DateComponent } from "../date/date.component"
import { ForecastComponent } from "../forecast/forecast.component"
import {CalendarComponent} from "../calendar/calendar.component";

@Component({
  selector: "app-weather",
  standalone: true,
  imports: [CommonModule, SearchBarComponent, ClockComponent, DateComponent, ForecastComponent, CalendarComponent],
  templateUrl: './weather.component.html',
  styleUrls: ['./weather.component.scss']
})
export class WeatherComponent implements OnInit, OnDestroy {
  private weatherService = inject(WeatherService)
  private appService = inject(AppService)
  private route = inject(ActivatedRoute)
  private router = inject(Router)

  weather: Weather | null = null
  unitSystem = "metric"
  measureOfTemp = "C"
  viewMode: "daily" | "hourly" = "daily"

  private weatherSubscription?: Subscription

  ngOnInit(): void {
    this.unitSystem = this.appService.getUnitSystem()
    this.measureOfTemp = this.unitSystem === "metric" ? "C" : "F"

    this.route.params.subscribe((params) => {
      if (params["city"]) {
        this.loadWeatherForCity(params["city"])
      } else {
        this.loadWeatherForCurrentLocation()
      }
    })

    this.weatherSubscription = this.weatherService.getWeather().subscribe((weather) => {
      this.weather = weather
    })
  }

  ngOnDestroy(): void {
    this.weatherSubscription?.unsubscribe()
  }

  setViewMode(mode: "daily" | "hourly"): void {
    this.viewMode = mode
  }

  // getWeatherIcon(iconClass: string): string {
  //   const iconMap: { [key: string]: string } = {
  //     "wi-day-sunny": "☀️",
  //     "wi-day-cloudy": "⛅",
  //     "wi-cloudy": "☁️",
  //     "wi-rain": "🌧️",
  //     "wi-snow": "❄️",
  //     "wi-thunderstorm": "⛈️",
  //     "wi-night-clear": "🌙",
  //     "wi-night-cloudy": "☁️",
  //   }
  //
  //   return iconMap[iconClass] || "☀️"
  // }

  getWeatherIcon(iconClass: string, isCold: boolean): string {
    const iconMap: { [key: string]: string } = {
      "wi-day-sunny": isCold ? "❄️" : "☀️",
      "wi-day-cloudy": isCold ? "🌨️" : "⛅",
      "wi-cloudy": isCold ? "🌨️" : "☁️",
      "wi-rain": isCold ? "🌧️❄️" : "🌧️",
      "wi-snow": "❄️",
      "wi-thunderstorm": "⛈️",
      "wi-night-clear": isCold ? "🌙❄️" : "🌙",
      "wi-night-cloudy": isCold ? "☁️❄️" : "☁️",
      "wi-day-snow": "❄️",
      "wi-night-snow": "❄️"
    };

    return iconMap[iconClass] || (isCold ? "❄️" : "☀️");
  }


  private loadWeatherForCity(city: string): void {
    this.weatherService.createResponseWeatherByCity(city).subscribe({
      next: (weather) => {
        this.weather = weather;
      },
      error: (error) => {
        console.error("Error loading weather for city:", error);
        this.router.navigate(["/not-found"], { queryParams: { city } });
      }
    });
  }

  private loadWeatherForCurrentLocation(): void {
    this.weatherService.getWeatherByCurrentLocation().subscribe({
      next: (city: string) => {
        this.router.navigate(['/city', city]);
      },
      error: (error) => {
        console.error('Error loading weather for current location:', error);
      }
    });
  }

}


