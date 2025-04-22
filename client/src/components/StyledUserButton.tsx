import { UserButton } from "@clerk/clerk-react";
import { useMediaQuery } from "react-responsive";

export default function StyledUserButton() {
  const isSmallScreen = useMediaQuery({ maxWidth: 640 });

  const avatarSize = isSmallScreen ? "32px" : "48px";

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-3xl p-2 px-3 sm:p-3 sm:px-4 shadow-lg flex items-center justify-center">
      <UserButton
        appearance={{
          elements: {
            userButtonAvatarImage: {
              width: avatarSize,
              height: avatarSize,
            },
            userButtonAvatarBox: {
              width: avatarSize,
              height: avatarSize,
            },
            userButtonTrigger:
              "focus:outline-none focus:ring-2 focus:ring-white/30 rounded-full",
          },
        }}
      />
    </div>
  );
}
