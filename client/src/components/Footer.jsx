
import React from "react";
import { assets } from "../assets/assets";

const Footer = () => {
  return (
    <footer className="relative mt-16 w-full overflow-hidden border-t border-purple-100 bg-gradient-to-br from-[#fbf7ff] via-white to-[#fff3f9] px-5 pt-12 text-gray-600 sm:mt-20 sm:px-8 sm:pt-14 md:px-16 lg:px-24 xl:px-32">

      {/* Background glow */}
      <div className="pointer-events-none absolute -right-20 top-0 h-64 w-64 rounded-full bg-pink-200/30 blur-3xl" />
      <div className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl" />

      {/* Top Section */}
      <div className="relative z-10 flex flex-col justify-between gap-10 border-b border-purple-100 pb-10 md:flex-row md:gap-12 md:pb-12">

        {/* Brand */}
        <div className="w-full max-w-md">
          <img
            src={assets.logo}
            alt="GINI-AI logo"
            className="h-10 w-auto object-contain"
          />

          <p className="mt-5 text-sm leading-relaxed text-gray-600">
            <strong className="text-purple-700">GINI-AI</strong> empowers
            creators and businesses with intelligent AI-driven tools. From
            content writing to image generation, our platform helps you work
            smarter, faster, and more efficiently.
          </p>
        </div>

        {/* Links & Newsletter */}
        <div className="flex flex-col gap-10 sm:flex-row sm:gap-12 md:justify-end">

          {/* Company Links */}
          <div className="shrink-0">
            <h2 className="mb-4 font-semibold text-slate-800">
              Company
            </h2>

            <ul className="space-y-3 text-sm">
              {["Home", "About Us", "Contact Us", "Privacy Policy"].map(
                (link) => (
                  <li key={link}>
                    <a
                      href="#"
                      className="transition-colors duration-200 hover:text-purple-700"
                    >
                      {link}
                    </a>
                  </li>
                )
              )}
            </ul>
          </div>

          {/* Newsletter */}
          <div className="w-full max-w-sm">
            <h2 className="mb-4 font-semibold text-slate-800">
              Subscribe to our newsletter
            </h2>

            <p className="mb-5 text-sm leading-relaxed text-gray-600">
              Get the latest updates, AI insights, and product announcements
              delivered straight to your inbox.
            </p>

            <form className="flex flex-col gap-3 min-[420px]:flex-row">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>

              <input
                id="email"
                type="email"
                required
                placeholder="Enter your email"
                className="min-w-0 flex-1 rounded-xl border border-purple-100 bg-white/80 px-4 py-3 text-sm outline-none transition placeholder:text-gray-400 focus:border-purple-300 focus:ring-2 focus:ring-purple-200/70"
              />

              <button
                type="submit"
                className="rounded-xl bg-gradient-to-r from-violet-600 to-pink-500 px-5 py-3 text-sm font-medium text-white shadow-md shadow-purple-500/15 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg active:scale-95"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="relative z-10 space-y-3 py-6 text-center text-xs text-gray-500 sm:text-sm">
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-purple-700 transition hover:text-pink-600"
          >
            Nisha Yadav
          </a>
          . All rights reserved.
        </p>

        <p>
          GitHub:{" "}
          <a
            href="https://github.com/Ynisha"
            target="_blank"
            rel="noopener noreferrer"
            className="transition hover:text-purple-700"
          >
            Ynisha
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
