
import React from "react";
import { PricingTable } from "@clerk/clerk-react";

const Plan = () => {
  return (
    <section className="relative z-10 my-16 overflow-hidden bg-gradient-to-b from-[#fff7fc] via-[#f7f2ff] to-white px-4 py-16 sm:my-20 sm:px-8 sm:py-20 md:px-12 lg:px-20">

      {/* Soft background glow effects */}
      <div className="pointer-events-none absolute -left-20 top-10 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl" />

      <div className="pointer-events-none absolute -right-20 bottom-0 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />

      {/* Header */}
      <div className="relative z-10 mx-auto max-w-3xl text-center">
        <span className="inline-flex rounded-full border border-purple-200/70 bg-white/70 px-4 py-1.5 text-xs font-medium tracking-wide text-purple-700 shadow-sm backdrop-blur-md sm:text-sm">
          SIMPLE & FLEXIBLE PRICING
        </span>

        <h2 className="mx-auto mt-4 text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl md:text-[42px]">
          Choose Your{" "}
          <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Plan
          </span>
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base">
          Start for free and scale up as you grow. Find the perfect plan for
          your content creation needs.
        </p>
      </div>

      {/* Clerk Pricing Table */}
      <div className="relative z-10 mx-auto mt-10 w-full max-w-5xl sm:mt-14">
        <div className="rounded-2xl border border-white/80 bg-white/60 p-2 shadow-[0_12px_40px_rgba(139,92,246,0.08)] backdrop-blur-xl sm:p-4 md:p-6">
          <PricingTable />
        </div>
      </div>
    </section>
  );
};

export default Plan;
