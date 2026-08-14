import { BotMessageSquare, University } from "lucide-react";
import { NavLink } from "react-router-dom";

export default function HeroSection() {

  const handleScrollToCounselling = () => {
    // This matches your LandingPage wrapper ID perfectly now
    const element = document.getElementById("bookcounselling");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative min-h-[calc(100dvh-72px)] w-full bg-bg-hero flex items-center justify-center lg:justify-start overflow-hidden px-6 sm:px-10 lg:px-20 py-12">
      {/* BACKGROUND GRAPHIC LAYER */}
      <div className="absolute top-0 left-0 right-0 -bottom-56 w-full pointer-events-none select-none opacity-30 lg:opacity-50">
        <img
          className="w-full h-full object-cover object-bottom"
          src="building.png"
          alt="Campus building background"
        />
      </div>

      {/* CONTENT LAYER */}
      <div className="w-full flex flex-col gap-6 lg:gap-8 items-center text-center relative z-10">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[4.5rem] font-extrabold font-lexend text-white tracking-tight leading-[1.15]">
          Find Your Perfect <br className="hidden sm:inline" /> College & Career
          Path
        </h1>

        <p className="text-base sm:text-lg lg:text-xl text-white/80 font-light max-w-2xl leading-relaxed">
          Explore universities, compare colleges, discover entrance exams,
          predict admissions, and connect with expert counselors — all in one
          intelligent platform.
        </p>

        {/* Buttons layout preserved from original design */}
        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto mt-2">
          <NavLink
            to={"/find-colleges"}
            className="btn bg-white hover:bg-neutral-100 transition-colors flex flex-row gap-2 items-center justify-center text-[#111111] font-semibold px-6 py-3 rounded-lg shadow-md"
          >
            <University size={20} />
            Explore Institutions
          </NavLink>

          <button
            onClick={handleScrollToCounselling}
            className="btn bg-transparent border border-white hover:bg-white/10 transition-colors flex flex-row gap-2 items-center justify-center text-white font-semibold px-6 py-3 rounded-lg"
          >
            <BotMessageSquare size={20} />
            Book free counselling
          </button>
        </div>
      </div>
    </div>
  );
}
