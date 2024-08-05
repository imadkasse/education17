"use client";
import { useToggle } from "@/components/context/ToggleContext";

const page = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { toggle } = useToggle();
  return (
    <div
      className={`flex-1 transition-all duration-300 ${
        toggle ? "ml-[250px]" : "ml-[50px]"
      }`}
    >
      dashborad
    </div>
  );
};

export default page;
