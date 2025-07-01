export const appConfig = {
  defaultUnit: 'metric',
  defaultCity: {
    coord: {
      latitude: 51.509865,
      longitude: -0.118092
    }
  }
};

export const apiConfig = {
  host: 'https://api.openweathermap.org/data/2.5',
  appId: '0f3fb9fa31ad3d41f1bb2bd0841c3f2f',
  measurementUnits: {
    metric: {
      temperature: 'C',
    },
    imperial: {
      temperature: 'F',

    }
  },
  amountForecastDays: 16,
  updateInterval: {
    forecast: 300000,
    weather: 300000
  }
};
