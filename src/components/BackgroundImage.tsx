import DesktopLightBackground from "../assets/images/bg-desktop-light.jpg";
import DesktopDarkBackground from "../assets/images/bg-desktop-dark.jpg";
import MobileLightBackground from "../assets/images/bg-mobile-light.jpg";
import MobileDarkBackground from "../assets/images/bg-mobile-dark.jpg";
interface BackgroundImage {
  isDark: boolean;
}

const BackgroundImage = ({ isDark }: BackgroundImage) => {
  let backgroundImage = DesktopLightBackground;

  const isSmallScreen = document.body.clientWidth <= 440;

  if (isSmallScreen) {
    if (isDark) backgroundImage = MobileDarkBackground;
    else backgroundImage = MobileLightBackground;
  } else {
    if (isDark) backgroundImage = DesktopDarkBackground;
  }

  return (
    <img
      src={backgroundImage}
      alt=""
      className=" fixed top-0 z-10 min-h-60 w-full object-cover"
    />
  );
};

export default BackgroundImage;
