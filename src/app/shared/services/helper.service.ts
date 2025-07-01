import { Injectable, inject } from "@angular/core"
import { AppService } from "./app.service"

@Injectable({
  providedIn: "root",
})
export class HelperService {
  private appService = inject(AppService)
  private unitSystem: string

  constructor() {
    this.unitSystem = this.appService.getUnitSystem()
  }

  getWindDirection(windDegree: number): string {
    const windDirectionIndex = Math.round((windDegree - 11.25) / 22.5)
    const windNames = [
      "North",
      "North Northeast",
      "Northeast",
      "East Northeast",
      "East",
      "East Southeast",
      "Southeast",
      "South Southeast",
      "South",
      "South Southwest",
      "Southwest",
      "West Southwest",
      "West",
      "West Northwest",
      "Northwest",
      "North Northwest",
    ]

    return windNames[windDirectionIndex] || "North"
  }

  getWindBeaufortScaleByMeterInSecond(windSpeed: number): string {
    const beaufortWindScale = [
      "calm",
      "light air",
      "light breeze",
      "gentle breeze",
      "moderate breeze",
      "fresh breeze",
      "strong breeze",
      "high wind, near gale",
      "gale",
      "severe gale",
      "storm",
      "violent storm",
      "hurricane",
    ]

    const windSpeedScale = [
      [0, 0.3],
      [0.4, 1.6],
      [1.7, 3.5],
      [3.6, 5.5],
      [5.6, 8],
      [8.1, 10.8],
      [10.9, 13.9],
      [14, 17.2],
      [17.3, 20.8],
      [20.9, 24.5],
      [24.6, 28.5],
      [28.6, 32.7],
      [32.8, 1000],
    ]

    for (let i = 0; i < windSpeedScale.length; i++) {
      if (windSpeed >= windSpeedScale[i][0] && windSpeed <= windSpeedScale[i][1]) {
        return beaufortWindScale[i]
      }
    }

    return beaufortWindScale[0]
  }

  getPressureInMmHg(pressureInHpa: number): number {
    return Math.round(pressureInHpa * 0.75006375541921)
  }

  isItCurrentDayByTimestamps(firstTimestamp: number, secondTimestamp: number): boolean {
    const days = [firstTimestamp, secondTimestamp].map((timestamp) => Math.floor(timestamp / (3600 * 24)))
    return days[0] === days[1]
  }
}
