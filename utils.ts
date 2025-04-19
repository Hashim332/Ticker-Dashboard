export function roundDownTwoDP(value: number): number {
  return Math.floor(value * 100) / 100;
}

export interface WeatherApiResponse {
  main: {
    temp: number;
    feels_like: number;
  };
  weather: {
    id: number;
    description: string;
    icon: string;
    main: string;
  }[];
  name: string;
}

// STOCK DATA INTERFACES/FUNCTIONS

export interface Stock {
  ticker: string;
  c: number; // current price
  d: number; // change
  dp: number; // change %age
}
