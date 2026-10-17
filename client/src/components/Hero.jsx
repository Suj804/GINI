import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <section className="px-4 sm:px-20 xl:px-32 relative flex flex-col w-full justify-center bg-[url(/gradientBackground.png)] bg-cover bg-no-repeat min-h-screen">
      
      {/* Heading */}
      <div className="text-center mb-8">
        <h1 className="text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-semibold mx-auto leading-tight text-slate-800">
          Create high-impact content <br />
          with <span className="text-primary">AI-powered tools</span>
        </h1>

        <p className="mt-5 max-w-xs sm:max-w-lg 2xl:max-w-xl mx-auto text-gray-600 max-sm:text-xs">
          Accelerate your content creation using our premium AI solutions.
          Write compelling articles, generate visuals, and streamline your
          workflow with confidence.
        </p>
      </div>

      {/* Call to Action */}
      <div className="flex flex-wrap justify-center gap-4 text-sm max-sm:text-xs">
        <button
          onClick={() => navigate("/ai")}
          className="bg-primary text-white px-10 py-3 rounded-lg hover:scale-105 active:scale-95 transition"
        >
          Get Started for Free
        </button>

        <button
          className="bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-105 active:scale-95 transition"
        >
          Watch Product Demo
        </button>
      </div>

      {/* Social Proof */}
      <div className="flex items-center gap-3 mt-10 mx-auto text-gray-600 text-sm">
        <img
          src={assets.user_group}
          alt="Trusted users"
          className="h-8"
        />
        Trusted by over <span className="font-medium">10,000+</span> creators worldwide
      </div>
    </section>
  );
};

export default Hero;