import SunIcon from "../assets/images/icon-sun.svg";
import MoonIcon from "../assets/images/icon-moon.svg";
import { Dispatch, SetStateAction } from "react";

interface ThemeToggleButtonProps {
  isDark: boolean;
  setIsDark: Dispatch<SetStateAction<boolean>>;
}

const ThemeToggleButton = ({ isDark, setIsDark }: ThemeToggleButtonProps) => {
  let imageSource = SunIcon;
  if (isDark) imageSource = MoonIcon;

  return (
    <img
      src={imageSource}
      className="cursor-pointer"
      onClick={() => {
        setIsDark(!isDark);
      }}
    />
  );
};

export default ThemeToggleButton;
