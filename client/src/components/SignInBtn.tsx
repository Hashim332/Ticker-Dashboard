import { ArrowRight } from "lucide-react";
import { SignInButton } from "@clerk/clerk-react";

export default function SignInBtn() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center px-4">
      <h1 className="text-3xl font-semibold mb-6 text-white">
        Welcome! Sign in to view your dashboard.
      </h1>
      <SignInButton>
        <button className="group flex items-center gap-3 px-6 py-3 rounded-full bg-black text-white hover:bg-gray-900 transition-all duration-200 shadow-lg text-lg font-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black">
          <span>Sign in</span>
          <ArrowRight
            size={20}
            className="transition-transform duration-200 group-hover:translate-x-1"
          />
        </button>
      </SignInButton>
    </div>
  );
}
