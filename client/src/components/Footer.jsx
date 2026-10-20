import { useState } from "react";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import Logo from "./Logo";

const Footer = () => {
  const [email, setEmail] = useState("");

  const onSubscribe = (e) => {
    e.preventDefault();
    toast.success("Thanks for subscribing!");
    setEmail("");
  };

  return (
    <footer id="contact" className="w-full bg-white/60 backdrop-blur text-gray-600 px-6 md:px-16 lg:px-24 xl:px-32 pt-14 mt-24 border-t border-violet-100">
      {/* Top Section */}
      <div className="flex flex-col md:flex-row justify-between gap-14 pb-12 border-b border-gray-300">
        {/* Brand */}
        <div className="max-w-md">
          <Logo />
          <p className="mt-6 text-sm leading-relaxed">
            <strong>GINI</strong> brings multiple AI productivity tools into one platform.
            From content writing to image generation and resume analysis, work smarter,
            faster, and more efficiently.
          </p>
        </div>

        {/* Links & Newsletter */}
        <div className="flex flex-col sm:flex-row gap-14 flex-1 justify-end">
          <div>
            <h2 className="text-gray-900 font-semibold mb-4">Quick links</h2>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/" className="hover:text-primary transition">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/ai" className="hover:text-primary transition">
                  Dashboard
                </Link>
              </li>
              <li>
                <Link to="/ai/history" className="hover:text-primary transition">
                  History
                </Link>
              </li>
              <li>
                <Link to="/ai/workspaces" className="hover:text-primary transition">
                  Workspaces
                </Link>
              </li>
            </ul>
          </div>

          <div className="max-w-sm">
            <h2 className="text-gray-900 font-semibold mb-4">Subscribe to our newsletter</h2>
            <p className="text-sm mb-5">
              Get the latest updates, AI insights, and product announcements delivered to
              your inbox.
            </p>
            <form onSubmit={onSubscribe} className="flex items-center gap-2">
              <label htmlFor="email" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="w-full border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <button
                type="submit"
                className="btn-gradient text-sm px-5 py-2 rounded-full transition cursor-pointer"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="text-center text-xs md:text-sm mt-8 pb-6 text-gray-500 space-y-2">
        <p>
          © {new Date().getFullYear()}{" "}
          <a
            href="https://www.linkedin.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary font-medium"
          >
            Nisha Yadav
          </a>{" "}
          &amp; Sujata Santra. All rights reserved.
        </p>
        <p>
          GitHub:{" "}
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            Ynisha
          </a>
        </p>
      </div>
    </footer>
  );
};

export default Footer;
