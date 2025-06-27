// import { NavLink } from "react-router-dom";

const Infobanner = () => {
  return (
    <div className=" text-black text-center text-sm relative z-[20] w-full shadow-sm flex rounded-md justify-center max-h-8 overflow-hidden gap-1  md:flex-row flex-col">
      <span className="font-normal whitespace-nowrap md:animate-[marquee-md_13s_linear_infinite] hover:animate-paused">
        Why spend 99/- on each report when you can enjoy unlimited access with a
        499/- annual subscription?{" "}
      </span>
      {/* <span>
        <NavLink to="/subscribe" className="underline text-white">
          Click here
        </NavLink>
      </span> */}
    </div>
  );
};

export default Infobanner;
