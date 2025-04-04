import { useEffect, useState } from "react";

function App() {
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [photographer, setPhotographer] = useState<string | null>(null);

  useEffect(() => {
    async function getBackgroundImage() {
      const response = await fetch(
        "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
      );
      const data = await response.json();
      console.log(data);
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
        <div className="flex flex-row justify-between">
          <div>crypto</div>
          <div>weather</div>
        </div>
        <h1 className="m-auto text-5xl">TIME HERE</h1>
        <p>By: {photographer}</p>
      </div>
    </div>
  );
}

export default App;
