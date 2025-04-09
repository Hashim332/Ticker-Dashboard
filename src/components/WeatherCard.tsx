import { useEffect } from "react";

export default function WeatherCard() {
  useEffect(() => {
    const windsorCoords = { lat: 37.043594, lon: -95.658791};
    try {
        const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${windsorCoords.lat}&lon=${windsorCoords.lon}&appid=${APIkey}`)
    }
  }, []);

  return (
    <div>
      <div>weather</div>
    </div>
  );
}
