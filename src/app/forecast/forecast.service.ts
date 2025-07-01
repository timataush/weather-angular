import { Injectable, inject } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import { type Observable, interval } from "rxjs"
import { switchMap, map, catchError, startWith } from "rxjs/operators"
import { AppService } from "../shared/services/app.service"
import { WeatherService } from "../weather/weather.service"
import { HelperService } from "../shared/services/helper.service"
import { WeatherIconsService } from "../shared/services/weather-icons/weather-icons.service"
import { Forecast } from "./forecast.model"
import { apiConfig } from "../../environments/environment"

@Injectable({
  providedIn: "root",
})
export class ForecastService {
  private http = inject(HttpClient)
  private appService = inject(AppService)
  private weatherService = inject(WeatherService)
  private weatherIconsService = inject(WeatherIconsService)
  private helperService = inject(HelperService)

  private forecastUpdateInterval = apiConfig.updateInterval.forecast
  private unitSystem: string

  constructor() {
    this.unitSystem = this.appService.getUnitSystem()
  }

  getForecastByCity(city: string): Observable<any> {
    return interval(this.forecastUpdateInterval).pipe(
      startWith(0),
      switchMap(() =>
        this.http.get(
          `${apiConfig.host}/forecast/daily?q=${city}&appid=${apiConfig.appId}&units=${this.unitSystem}&cnt=${apiConfig.amountForecastDays}`,
        ),
      ),
      map((response: any) => response.list),
      catchError(this.handleError.bind(this)),
    )
  }

  handleResponseForecastData(responseData: any): Forecast {
    const { dt, temp, weather } = responseData
    const currentWeatherTimestamp = this.weatherService.getCurrentWeatherTimestamp()

    const currentDay = this.helperService.isItCurrentDayByTimestamps(dt, currentWeatherTimestamp)
    const date = dt * 1000
    const iconClassname = this.weatherIconsService.getIconClassNameByCode(weather[0].id)
    const temperatureDay = Math.round(temp.day)
    const temperatureNight = Math.round(temp.night)

    return new Forecast(currentDay, date, iconClassname, temperatureDay, temperatureNight, weather[0].description)
  }

  private handleError(error: any): Observable<never> {
    console.error("Forecast service error:", error)
    throw error
  }
}
