// import { Injectable } from "@angular/core"
// import { weatherIconsData } from "./weather-icons-codes.data"
//
// @Injectable({
//   providedIn: "root",
// })
// export class WeatherIconsService {
//   getIconClassNameByCode(code: number, sunsetTimestamp = 0): string {
//     const classPrefix = "wi wi-"
//     const iconData = weatherIconsData[code as keyof typeof weatherIconsData]
//     let iconClassname = iconData?.icon || "sunny"
//     let dayPrefix = ""
//
//     if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
//       const dateNowTimestamp = Math.round(Date.now() / 1000)
//       dayPrefix = sunsetTimestamp && dateNowTimestamp > sunsetTimestamp ? "night-" : "day-"
//
//       if (sunsetTimestamp && dateNowTimestamp > sunsetTimestamp && iconClassname === "sunny") {
//         dayPrefix = "night-clear"
//         iconClassname = ""
//       }
//     }
//
//     return `${classPrefix}${dayPrefix}${iconClassname}`
//   }
// }


import { Injectable } from "@angular/core";
import { weatherIconsData } from "./weather-icons-codes.data";

@Injectable({
  providedIn: "root",
})
export class WeatherIconsService {
  private readonly classPrefix = "wi wi-";
  private readonly defaultIcon = "sunny";
  private readonly coldTemperatureThreshold = -10; // Градусов для "холодных" иконок

  getIconClassNameByCode(code: number, sunsetTimestamp = 0, temperature?: number): string {
    const iconData = weatherIconsData[code as keyof typeof weatherIconsData];
    let iconClassname = iconData?.icon || this.defaultIcon;
    let timePrefix = "";

    // Для явлений, не зависящих от времени суток (туман, смерч и т.д.)
    const isTimeDependent = !(code > 699 && code < 800) && !(code > 899 && code < 1000);

    if (isTimeDependent) {
      const isNight = sunsetTimestamp && (Date.now() / 1000) > sunsetTimestamp;
      timePrefix = isNight ? "night-" : "day-";

      // Особый случай для ясной ночи
      if (isNight && iconClassname === "sunny") {
        return `${this.classPrefix}night-clear`;
      }
    }

    // Обработка холодной погоды
    if (temperature !== undefined && temperature < this.coldTemperatureThreshold) {
      return this.getColdWeatherIcon(code, timePrefix);
    }

    return `${this.classPrefix}${timePrefix}${iconClassname}`;
  }

  private getColdWeatherIcon(code: number, timePrefix: string): string {
    // Для ясной погоды - снег
    if (code === 800) {
      return `${this.classPrefix}${timePrefix}snow`;
    }

    // Для облаков - снег
    if (code >= 801 && code <= 804) {
      return `${this.classPrefix}snow`;
    }

    // Для дождя - зимний дождь
    if (code >= 500 && code <= 531) {
      return `${this.classPrefix}rain-mix`;
    }

    // Для остальных случаев - стандартная иконка
    const iconData = weatherIconsData[code as keyof typeof weatherIconsData];
    const iconClassname = iconData?.icon || this.defaultIcon;
    return `${this.classPrefix}${timePrefix}${iconClassname}`;
  }
}