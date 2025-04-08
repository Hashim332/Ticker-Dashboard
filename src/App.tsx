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
        <div className="flex justify-between mb-8">
          <div className="text-white">
            <h2 className="text-5xl font-light ">TIME HERE</h2>
          </div>

          <div className="bg-white bg-opacity-50 backdrop-blur-sm p-3 rounded-lg">
            Weather here
          </div>
        </div>

        <div className="flex-1 rounded-lg shadow-lg p-6">
          <div className="flex-1">
            <StockInfo />
          </div>
        </div>

        <div className="mt-4 text-right">
          <p className="text-white drop-shadow-md">By: {photographer}</p>
        </div>
      </div>
    </div>
  );
}

export default App;
