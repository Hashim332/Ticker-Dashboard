import { useEffect, useState } from "react";

interface WeatherData {
  weather: {
    description: string;
    icon: string;
  }[];
  main: {
    temp: number;
  };
  name: string;
}

export default function WeatherCard() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const apiKey = import.meta.env.VITE_OPENWEATHER_API_KEY;

  useEffect(() => {
    const windsorCoords = { lat: 51.4837886, lon: -0.6040419 };
    async function getWeatherData() {
      try {
        const res = await fetch(
          `https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${windsorCoords.lat}&lon=${windsorCoords.lon}&units=metric`
        );
        const data = await res.json();
        setWeatherData(data);
      } catch (err) {
        console.error("Error encountered : ", err);
      }
    }
    getWeatherData();
  }, [apiKey]);

  if (!weatherData) {
    return null;
  }
  return (
    <div className="flex items-center p-5 px-7 rounded-4xl backdrop-blur-sm shadow-md">
      <div className="flex flex-col">
        <span className="">{Math.round(weatherData.main.temp)}°C</span>
        <span className="text-sm capitalize">
          {weatherData.weather[0].description}
        </span>
      </div>
    </div>
  );
}
