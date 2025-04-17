import { useAuth } from "@clerk/clerk-react";
import { useEffect } from "react";

export default function Test() {
  const { getToken } = useAuth();

  useEffect(() => {
    const sendPostRequest = async () => {
      try {
        // Get the token from Clerk
        const token = await getToken();

        const res = await fetch("http://localhost:8000/api/backend/post", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            tickers: ["GOOG", "MSFT", "AAPL"],
          }),
        });

        const data = await res.json();
        console.log(data);
      } catch (err) {
        console.error("frontend error occurred: ", err);
      }
    };

    sendPostRequest();
  }, [getToken]);

  return <div className="">Test component</div>;
}
