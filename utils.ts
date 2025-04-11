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
