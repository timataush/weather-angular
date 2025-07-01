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
