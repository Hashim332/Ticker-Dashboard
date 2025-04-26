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
      try {
        const response = await fetch(
          "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setImageUrl(data.urls.full);
        setPhotographer(data.user.name);
      } catch (error) {
        console.error("Failed to fetch background image:", error);
        setImageUrl(null);
        setPhotographer(null);
      }
    }

    getBackgroundImage();
  }, []);

  return (
    <div
      className="bg-cover bg-center min-h-screen w-full p-6"
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
          <div className="flex justify-between mb-8 text-white text-lg lg:text-5xl items-center">
            <Clock />
            <div className="flex items-center gap-4">
              <WeatherCard />
              <StyledUserButton />
            </div>
          </div>
          <div className="text-center text-white text-md bg-black/70 rounded-3xl mx-auto my-8 py-4 px-4 lg:text-2xl">
            Type a stock ticker and hit "Add" to pin it to your dashboard!
          </div>
          <div className="flex-1">
            <Dashboard />
          </div>
        </div>
      </SignedIn>

      {photographer && (
        <div className="fixed bottom-0 right-0 p-2 text-right text-white drop-shadow-md z-10 bg-black/70 rounded-xl">
          <p>Photo by: {photographer}</p>
        </div>
      )}
    </div>
  );
}

export default App;
