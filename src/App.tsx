import { useEffect, useState } from "react";
import Dashboard from "./components/Dashboard";
import WeatherCard from "./components/WeatherCard";
import Clock from "./components/Clock";
import { SignedIn, SignedOut } from "@clerk/clerk-react";
import SignInBtn from "./components/SignInBtn";
import StyledUserButton from "./components/StyledUserButton";

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
      <header className="align-center">
        <SignedOut>
          <SignInBtn />
        </SignedOut>
      </header>

      <SignedIn>
        <div className="flex flex-col h-full">
          <div className="flex justify-between items-start mb-8 text-white text-5xl">
            <Clock />
            <div className="flex items-center gap-4">
              <WeatherCard />
              <StyledUserButton />
            </div>
          </div>

          <div className="text-center text-white text-2xl font-extrabold backdrop-blur-sm rounded-3xl mx-auto my-8 py-4 px-4">
            Type a stock ticker and hit "Add" to pin it to your dashboard!
          </div>
          <div className="flex-1 rounded-lg shadow-lg p-6">
            <Dashboard />
          </div>

          <div className="mt-4 text-right">
            <p className="text-white drop-shadow-md">By: {photographer}</p>
          </div>
        </div>
      </SignedIn>
    </div>
  );
}

export default App;
