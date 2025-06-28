import { useNavigate } from "react-router-dom";

const Infobanner = () => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate("/subscription")}
      className="bg-brand-dark py-1 text-text-inverted text-center text-sm relative z-[20] w-full shadow-sm flex justify-center max-h-8 overflow-hidden gap-1 md:flex-row flex-col cursor-pointer"
    >
      <span className="font-normal whitespace-nowrap animate-[marquee-md_13s_linear_infinite] hover:animate-paused">
        Why spend 99/- on each report when you can enjoy unlimited access with a
        ₹999/- annual subscription?{" "}
      </span>
    </div>
  );
};

export default Infobanner;
