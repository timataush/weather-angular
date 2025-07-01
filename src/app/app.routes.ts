import type { Routes } from "@angular/router"
import { WeatherComponent } from "./weather/weather.component"
import { NotFoundComponent } from "./not-found/not-found.component"
import { ErrorComponent } from "./error/error.component"

export const routes: Routes = [
  { path: "", component: WeatherComponent },
  { path: "city/:city", component: WeatherComponent },
  { path: "not-found", component: NotFoundComponent },
  { path: "error", component: ErrorComponent },
  { path: "**", redirectTo: "/error" },
]
