import { Injectable, inject } from "@angular/core"
import { LocalStorageService } from "./localstorage.service"
import { appConfig } from "../../../environments/environment"

@Injectable({
  providedIn: "root",
})
export class AppService {
  private localStorageService = inject(LocalStorageService)
  private unitSystem: string

  constructor() {
    this.unitSystem = this.localStorageService.get("unit") || appConfig.defaultUnit
  }

  getUnitSystem(): string {
    return this.unitSystem
  }

  updateUnitSystem(unitSystem: string): void {
    this.localStorageService.set("unit", unitSystem)
    setTimeout(() => window.location.reload(), 300)
  }
}
