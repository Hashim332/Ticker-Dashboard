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
//
// export type Stock = {
//   ticker: string;
//   price: string;
//   change_amount: string;
//   change_percentage: string;
//   volume: string;
// };

export interface UnifiedStock {
  ticker: string;
  currentPrice: number;
  changeAmount: number;
  changePercentage: number;
  dataSource: "alphavantage" | "finnhub"; // Track the source
}

export interface AlphaVantageResponse {
  top_gainers: UnifiedStock[];
  top_losers: UnifiedStock[];
  most_actively_traded: UnifiedStock[];
}

export function alphaVantageToUnified(ticker: string, data: any): UnifiedStock {
  return {
    ticker,
    currentPrice: Number(data.price),
    changeAmount: Number(data.change_amount),
    changePercentage: Number(data.change_percentage),
    dataSource: "alphavantage",
  };
}

export function finnhubToUnified(ticker: string, data: any): UnifiedStock {
  return {
    ticker,
    currentPrice: data.c,
    changeAmount: data.d,
    changePercentage: data.dp,
    dataSource: "finnhub",
  };
}
