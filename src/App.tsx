import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import WeatherCard from "./components/WeatherCard";
import Clock from "./components/Clock";

function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [photographer, setPhotographer] = useState<string | null>(null);

  useEffect(() => {
    async function getBackgroundImage() {
      const response = await fetch(
        "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
      );
      const data = await response.json();
      setImageUrl(data.urls.regular);
      setPhotographer(data.user.name);
    }

    getBackgroundImage();
  }, []);

  return (
    <div
      className="bg-cover bg-center h-screen w-full p-6"
      style={{
        backgroundImage: imageUrl ? `url(${imageUrl})` : undefined,
      }}
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between mb-8 text-5xl text-white">
          <Clock />
          <WeatherCard />
        </div>

        <div className="flex-1 rounded-lg shadow-lg p-6">
          <Dashboard />
        </div>

        <div className="mt-4 text-right">
          <p className="text-white drop-shadow-md">By: {photographer}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
