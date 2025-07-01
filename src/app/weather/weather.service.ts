import { Injectable, inject } from "@angular/core"
import { HttpClient } from "@angular/common/http"
import {Observable, Subject, interval, throwError, tap, finalize} from "rxjs"
import { switchMap, map, catchError, startWith } from "rxjs/operators"
import { Weather } from "./weather.model"
import { AppService } from "../shared/services/app.service"
import { LoaderService } from "../loader/loader.service"
import { HelperService } from "../shared/services/helper.service"
import { WeatherIconsService } from "../shared/services/weather-icons/weather-icons.service"
import { apiConfig, appConfig } from "../../environments/environment"

@Injectable({
  providedIn: "root",
})
export class WeatherService {
  private http = inject(HttpClient)
  private appService = inject(AppService)
  private loaderService = inject(LoaderService)
  private helperService = inject(HelperService)
  private weatherIconsService = inject(WeatherIconsService)

  private unitSystem: string
  private weather = new Subject<Weather>()
  private currentWeatherTimestamp = 0
  private weatherUpdateInterval = apiConfig.updateInterval.weather

  constructor() {
    this.unitSystem = this.appService.getUnitSystem()
  }

  getWeather(): Subject<Weather> {
    return this.weather
  }

  getCurrentWeatherTimestamp(): number {
    return this.currentWeatherTimestamp
  }

  getWeatherByCurrentLocation(): Observable <string> {
    this.showLoader();

    return new Observable <string>(subscriber => {
      if (!navigator.geolocation) {
        subscriber.error(new Error("Geolocation is not supported"));
        return;
      }

      navigator.geolocation.getCurrentPosition(
          position => {
            const { latitude, longitude } = position.coords;
            this.getWeatherByLocation(latitude, longitude).subscribe({
              next: weather => subscriber.next(weather.city),
              error: err => subscriber.error(err)
            });
          },
          error => {
            if (error.code === 1) {
              this.getWeatherByLocation(
                  appConfig.defaultCity.coord.latitude,
                  appConfig.defaultCity.coord.longitude
              ).subscribe({
                next: weather => subscriber.next(weather.city),
                error: err => subscriber.error(err)
              });
            } else {
              subscriber.error(error);
            }
          }
      );
    }).pipe(
        finalize(() => this.hideLoader())
    );
  }


  createResponseWeatherByCity(city: string): Observable<Weather> {
    this.showLoader();

    return this.getWeatherByCity(city).pipe(
        tap(() => this.hideLoader()),
        catchError(error => {
          this.hideLoader();
          return throwError(() => error);
        })
    );
  }

  getWeatherByLocation(latitude: number, longitude: number): Observable<Weather> {
    return interval(this.weatherUpdateInterval).pipe(
      startWith(0),
      switchMap(() =>
        this.http.get(
          `${apiConfig.host}/weather?appid=${apiConfig.appId}&lat=${latitude}&lon=${longitude}&units=${this.unitSystem}`,
        ),
      ),

      map((data: any) => {
        const weather = this.handleResponseWeatherData(data)
        this.weather.next(weather)
        return weather
      }),
      catchError(this.handleError.bind(this)),
    )
  }

  getWeatherByCity(city: string): Observable<Weather> {
    return interval(this.weatherUpdateInterval).pipe(
      startWith(0),
      switchMap(() =>
        this.http.get(`${apiConfig.host}/weather?appid=${apiConfig.appId}&q=${city}&units=${this.unitSystem}`),
      ),
      map((data: any) => {
        const weather = this.handleResponseWeatherData(data)
        this.weather.next(weather)
        return weather
      }),
      catchError(this.handleError.bind(this)),
    )
  }

  // private handleResponseWeatherData(responseData: any): Weather {
  //   const { name, main, weather, wind, sys, dt } = responseData
  //
  //   const testTemperature = -15; // Холодная температура
  //   const isCold = true;
  //
  //   this.currentWeatherTimestamp = dt
  //
  //   const updateAt = new Date().getTime()
  //   const iconClassname = this.weatherIconsService.getIconClassNameByCode(weather[0].id, sys.sunset)
  //   const temperature = Math.round(main.temp)
  //   const pressureInHpa = Math.round(main.pressure)
  //   const pressure =
  //     this.unitSystem === appConfig.defaultUnit ? this.helperService.getPressureInMmHg(pressureInHpa) : pressureInHpa
  //   const windDegrees = Math.round(wind.deg)
  //   const windDirection = this.helperService.getWindDirection(windDegrees)
  //   const windBeaufortScale = this.helperService.getWindBeaufortScaleByMeterInSecond(wind.speed)
  //   const sunriseTime = sys.sunrise * 1000
  //   const sunsetTime = sys.sunset * 1000
  //
  //   return new Weather(
  //     updateAt,
  //     name,
  //     iconClassname,
  //     temperature,
  //     main.humidity,
  //   pressure,
  //     weather[0].description,
  //     sunriseTime,
  //     sunsetTime,
  //     windDirection,
  //     wind.speed,
  //     windBeaufortScale,
  //   )
  // }


  private handleResponseWeatherData(responseData: any): Weather {
    const { name, main, weather, wind, sys, dt } = responseData;
    this.currentWeatherTimestamp = dt;

    const updateAt = new Date().getTime();
    const temperature = Math.round(main.temp);
    const isCold = temperature < -10; // Определяем холодную погоду

    // Передаем температуру в метод получения иконки
    const iconClassname = this.weatherIconsService.getIconClassNameByCode(
        weather[0].id,
        sys.sunset,
        temperature
    );

    const pressureInHpa = Math.round(main.pressure);
    const pressure = this.unitSystem === appConfig.defaultUnit
        ? this.helperService.getPressureInMmHg(pressureInHpa)
        : pressureInHpa;
    const windDegrees = Math.round(wind.deg);
    const windDirection = this.helperService.getWindDirection(windDegrees);
    const windBeaufortScale = this.helperService.getWindBeaufortScaleByMeterInSecond(wind.speed);
    const sunriseTime = sys.sunrise * 1000;
    const sunsetTime = sys.sunset * 1000;

    return new Weather(
        updateAt,
        name,
        iconClassname,
        temperature,
        main.humidity,
        pressure,
        weather[0].description,
        sunriseTime,
        sunsetTime,
        windDirection,
        wind.speed,
        windBeaufortScale,
        isCold // Добавляем флаг холодной погоды
    );
  }



  private handleError(error: any): Observable<never> {
    console.error("Weather service error:", error)
    throw error
  }

  private showLoader(): void {
    this.loaderService.show()
  }

  private hideLoader(): void {
    this.loaderService.hide()
  }
}

