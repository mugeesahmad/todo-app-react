import { FiPlus } from "react-icons/fi";
import CheckIcon from "../assets/images/icon-check.svg";

interface CircleBoxProps {
  type: "default" | "active" | "searchbox";
  onClick?: () => void;
  isTouch?: boolean;
}

const CircleBox = ({ type, onClick, isTouch }: CircleBoxProps) => {
  switch (type) {
    case "default":
      return (
        <div className="group flex h-12 w-12 shrink-0 items-center justify-center hover:bg-light-grey">
          <div
            className={`h-6 w-6 rounded-full border border-[hsl(233,11%,84%)] ${!isTouch && "group-hover:hidden"}`}
          ></div>
          <div
            className={`hidden h-6 w-6 items-center justify-center rounded-full bg-secondary bg-gradient-to-br from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)] ${!isTouch && "group-hover:flex"}`}
          >
            <div
              className={`h-5 w-5 rounded-full ${isTouch ? "bg-secondary" : "bg-light-grey"}`}
            ></div>
          </div>
        </div>
      );

    case "active":
      return (
        <div className="flex h-12 w-12  shrink-0 items-center justify-center">
          <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)]">
            <img src={CheckIcon} alt="Check mark" />
          </div>
        </div>
      );

    case "searchbox":
      return (
        <div
          className="flex h-12 w-12  items-center justify-center bg-secondary transition-colors duration-150"
          onClick={() => {
            if (onClick) onClick();
          }}
        >
          <div className="flex h-6 w-6 cursor-pointer items-center justify-center rounded-full bg-gradient-to-br from-[hsl(192,100%,67%)] to-[hsl(280,87%,65%)] transition-transform duration-100 hover:scale-105">
            <FiPlus className="text-white" />
          </div>
        </div>
      );
  }
};

export default CircleBox;
