"use client";
import { useToggle } from "../context/ToggleContext";

const Sub: React.FC = () => {
  const { toggle } = useToggle();
  return (
    <div
      className={`flex-1 transition-all duration-300 ${
        toggle ? "ml-[250px]" : "ml-0"
      }`}
    >
      Sub
    </div>
  );
};

export default Sub;
