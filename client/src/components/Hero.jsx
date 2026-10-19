
import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="relative flex min-h-screen w-full flex-col justify-center overflow-hidden bg-gradient-to-br from-[#fdf4ff] via-[#f5f0ff] to-[#fff0f6] bg-cover bg-no-repeat px-4 pt-24 pb-16 sm:px-8 md:px-12 lg:px-20 xl:px-32">

      {/* Soft background glow effects */}
      <div className="pointer-events-none absolute -top-24 -left-20 h-64 w-64 rounded-full bg-purple-300/30 blur-3xl sm:h-80 sm:w-80" />

      <div className="pointer-events-none absolute top-1/3 -right-20 h-72 w-72 rounded-full bg-pink-300/30 blur-3xl sm:h-96 sm:w-96" />

      <div className="pointer-events-none absolute bottom-0 left-1/3 h-56 w-56 rounded-full bg-violet-200/40 blur-3xl" />

      {/* Heading */}
      <div className="relative z-10 mb-8 text-center">
        <h1 className="mx-auto text-3xl font-semibold leading-tight tracking-tight text-slate-800 sm:text-5xl md:text-6xl 2xl:text-7xl">
          Create high-impact content
          <br />
          with{" "}
          <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI-powered tools
          </span>
        </h1>

        <p className="mx-auto mt-5 max-w-xs text-gray-600 sm:max-w-lg sm:text-base max-sm:text-xs 2xl:max-w-xl">
          Accelerate your content creation using our premium AI solutions.
          Write compelling articles, generate visuals, and streamline your
          workflow with confidence.
        </p>
      </div>

      {/* Call to Action */}
      <div className="relative z-10 flex flex-wrap justify-center gap-3 text-sm max-sm:text-xs sm:gap-4">
        <button
          onClick={() => navigate("/ai")}
          className="rounded-xl bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 px-6 py-3 text-white shadow-lg shadow-purple-500/20 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-pink-500/25 active:scale-95 sm:px-10"
        >
          Get Started for Free
        </button>

        <button
          className="rounded-xl border border-purple-200/80 bg-white/70 px-6 py-3 text-slate-700 shadow-sm backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-purple-300 hover:bg-white hover:shadow-lg active:scale-95 sm:px-10"
        >
          Watch Product Demo
        </button>
      </div>

      {/* Social Proof */}
      <div className="relative z-10 mx-auto mt-10 flex max-w-full flex-wrap items-center justify-center gap-3 text-center text-xs text-gray-600 sm:text-sm">
        <img
          src={assets.user_group}
          alt="Trusted users"
          className="h-8 w-auto shrink-0"
        />
        <span>
          Trusted by over{" "}
          <span className="font-semibold text-purple-700">10,000+</span>{" "}
          creators worldwide
        </span>
      </div>
    </section>
  );
};

export default Hero;
