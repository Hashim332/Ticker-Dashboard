import { useEffect } from "react";

export default function Test() {
  useEffect(() => {
    const sendPostRequest = async () => {
      try {
        const res = await fetch("http://localhost:8000/api/backend/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: "testuser",
            tickers: ["GOOG", "MSFT"],
          }),
        });

        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.error(" frontend error occurred: ", err);
      }
    };

    sendPostRequest();
  }, []);

  return <div className="">Test component</div>;
}
