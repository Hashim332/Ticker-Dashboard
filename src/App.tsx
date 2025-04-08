import { useEffect, useState } from "react";
import StockInfo from "./components/Dashboard";

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
        {/* Top section with time (left) and weather (right) */}
        <div className="flex justify-between mb-8">
          {/* Time on the left */}
          <div className="text-white">
            <h2 className="text-5xl font-bold drop-shadow-lg">TIME HERE</h2>
          </div>

          {/* Weather on the top right, outside dashboard */}
          <div className="bg-white bg-opacity-50 backdrop-blur-sm p-3 rounded-lg">
            Weather component goes here
          </div>
        </div>

        {/* Main Dashboard with frosted glass effect */}
        <div className="flex-1 bg-white/80 rounded-lg shadow-lg p-6">
          {/* Stock Dashboard - main component */}
          <div className="flex-1">
            <StockInfo />
          </div>
        </div>

        {/* Photo Credit */}
        <div className="mt-4 text-right">
          <p className="text-white drop-shadow-md">By: {photographer}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
