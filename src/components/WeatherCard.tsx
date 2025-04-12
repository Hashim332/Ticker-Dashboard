import { useEffect, useState } from "react";
import { WeatherApiResponse } from "../../utils";

const WeatherCard = () => {
  const [weatherData, setWeatherData] = useState<WeatherApiResponse | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;

          try {
            const res = await fetch(
              `${
                import.meta.env.VITE_API_URL
              }/weather?lat=${latitude}&lon=${longitude}`
            );
            const data = await res.json();
            console.log(data);
            setWeatherData(data);
          } catch (err) {
            setError("❌ Failed to fetch weather");
            console.error(err);
          }
        },
        (err) => {
          setError("📍 Location access denied");
          console.error(err);
        }
      );
    } else {
      setError("🚫 Geolocation not supported");
    }
  }, []);

  // Get background gradient based on weather condition
  const getBackgroundGradient = () => {
    if (!weatherData) return "bg-gradient-to-r from-gray-200 to-gray-300";

    const weatherId = weatherData.weather[0].id;
    const temp = weatherData.main.temp;

    // Thunderstorm: 200-299
    if (weatherId >= 200 && weatherId < 300) {
      return "bg-gradient-to-r from-gray-700 to-blue-700";
    }

    // Drizzle: 300-399
    if (weatherId >= 300 && weatherId < 400) {
      return "bg-gradient-to-r from-gray-400 to-blue-400";
    }

    // Rain: 500-599
    if (weatherId >= 500 && weatherId < 600) {
      return "bg-gradient-to-r from-gray-500 to-blue-500";
    }

    // Snow: 600-699
    if (weatherId >= 600 && weatherId < 700) {
      return "bg-gradient-to-r from-gray-100 to-blue-100";
    }

    // Atmosphere (fog, mist, etc): 700-799
    if (weatherId >= 700 && weatherId < 800) {
      return "bg-gradient-to-r from-gray-300 to-gray-400";
    }

    // Clear: 800
    if (weatherId === 800) {
      return "bg-gradient-to-r from-yellow-500 to-orange-600";
    }

    // Clouds: 801-899
    if (weatherId > 800 && weatherId < 900) {
      return "bg-gradient-to-r from-gray-400 to-gray-600";
    }

    // Default fallback
    return "bg-gradient-to-r from-gray-200 to-gray-300";
  };

  if (error) {
    return (
      <div className="flex items-center p-5 px-7 rounded-4xl backdrop-blur-sm shadow-md bg-gradient-to-r from-red-100 to-red-200">
        <span className="text-lg text-red-500 flex items-center gap-1 font-bold">
          {error}
        </span>
      </div>
    );
  }

  if (!weatherData) {
    return (
      <div className="flex items-center p-5 px-7 rounded-4xl backdrop-blur-sm shadow-md">
        <span className="text-sm text-white flex items-center gap-1">
          ⏳ Loading weather...
        </span>
      </div>
    );
  }

  return (
    <div
      className={`flex items-center p-5 px-7 rounded-4xl backdrop-blur-sm shadow-md ${getBackgroundGradient()}`}
    >
      <div className="flex items-center gap-3">
        <img
          src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
          alt={weatherData.weather[0].description}
          className="w-12 h-12 -ml-2"
        />

        <div className="flex flex-col">
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-semibold">
              {Math.round(weatherData.main.temp)}°C
            </span>
            <span className="text-xs opacity-75">
              feels like {Math.round(weatherData.main.feels_like)}°
            </span>
          </div>

          <div className="flex flex-col text-sm">
            <span className="capitalize">
              {weatherData.weather[0].description}
            </span>
            <span className="text-xs opacity-75">{weatherData.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
