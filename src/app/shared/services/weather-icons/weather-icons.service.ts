import { Injectable } from "@angular/core"
import { weatherIconsData } from "./weather-icons-codes.data"

@Injectable({
  providedIn: "root",
})
export class WeatherIconsService {
  getIconClassNameByCode(code: number, sunsetTimestamp = 0): string {
    const classPrefix = "wi wi-"
    const iconData = weatherIconsData[code as keyof typeof weatherIconsData]
    let iconClassname = iconData?.icon || "sunny"
    let dayPrefix = ""

    if (!(code > 699 && code < 800) && !(code > 899 && code < 1000)) {
      const dateNowTimestamp = Math.round(Date.now() / 1000)
      dayPrefix = sunsetTimestamp && dateNowTimestamp > sunsetTimestamp ? "night-" : "day-"

      if (sunsetTimestamp && dateNowTimestamp > sunsetTimestamp && iconClassname === "sunny") {
        dayPrefix = "night-clear"
        iconClassname = ""
      }
    }

    return `${classPrefix}${dayPrefix}${iconClassname}`
  }
}
