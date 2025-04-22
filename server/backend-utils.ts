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
