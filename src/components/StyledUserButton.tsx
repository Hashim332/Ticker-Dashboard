// components/StyledUserButton.tsx
import { UserButton } from "@clerk/clerk-react";

export default function StyledUserButton() {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-3xl px-4 py-3 shadow-lg flex items-center justify-center">
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarImage: {
              width: "48px",
              height: "48px",
            },
            userButtonAvatarBox: {
              width: "48px",
              height: "48px",
            },
            userButtonTrigger:
              "focus:outline-none focus:ring-2 focus:ring-white/30 rounded-full",
          },
        }}
      />
    </div>
  );
}
