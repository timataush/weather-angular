// export const appConfig = {
//   defaultUnit: "metric",
//   defaultCity: {
//     coord: {
//       latitude: 53.893009,
//       longitude: 27.567444,
//     },
//   },
// }
export const appConfig = {
  defaultUnit: "metric",
  defaultCity: {
    coord: {
      latitude: -77.85,  // Антарктида (постоянно холодно)
      longitude: 166.67
    },
  },
}

export const apiConfig = {
  host: "https://api.openweathermap.org/data/2.5",
  appId: "0f3fb9fa31ad3d41f1bb2bd0841c3f2f",
  measurementUnits: {
    metric: {
      temperature: "C",

    },
    imperial: {
      temperature: "F",

    },
  },
  amountForecastDays: 16,
  updateInterval: {
    forecast: 300000,
    weather: 300000,
  },
}
