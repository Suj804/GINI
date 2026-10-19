
import React from "react";
import { AiToolsData } from "../assets/assets";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

const AiTools = () => {
  const navigate = useNavigate();
  const { user } = useUser();

  return (
    <section className="relative my-16 overflow-hidden px-4 py-12 sm:my-20 sm:px-8 md:px-12 lg:px-20 xl:px-32">

      {/* Soft background glow */}
      <div className="pointer-events-none absolute left-0 top-10 -z-10 h-64 w-64 rounded-full bg-purple-200/30 blur-3xl" />
      <div className="pointer-events-none absolute right-0 top-1/3 -z-10 h-72 w-72 rounded-full bg-pink-200/30 blur-3xl" />

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-center"
      >
        <span className="mb-3 inline-flex rounded-full border border-purple-200/70 bg-white/70 px-4 py-1.5 text-xs font-medium tracking-wide text-purple-700 shadow-sm backdrop-blur-md sm:text-sm">
          CREATE SMARTER WITH AI
        </span>

        <h2 className="mx-auto mt-3 text-3xl font-semibold tracking-tight text-slate-800 sm:text-4xl md:text-[42px]">
          Powerful{" "}
          <span className="bg-gradient-to-r from-violet-600 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            AI Tools
          </span>
        </h2>

        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-gray-600 sm:text-base">
          Everything you need to create, enhance, and optimize your content
          using cutting-edge AI technology.
        </p>
      </motion.div>

      {/* Tools Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="relative z-10 mt-10 grid grid-cols-1 justify-items-center gap-5 sm:mt-12 sm:grid-cols-2 sm:gap-6 lg:grid-cols-3 xl:grid-cols-4"
      >
        {AiToolsData.map((tool, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => user && navigate(tool.path)}
            className="group w-full max-w-sm cursor-pointer rounded-2xl border border-white/80 bg-white/65 p-6 shadow-[0_8px_30px_rgba(139,92,246,0.07)] backdrop-blur-xl transition-all duration-300 hover:border-purple-200 hover:bg-white/90 hover:shadow-[0_16px_40px_rgba(168,85,247,0.15)] sm:p-7"
          >
            {/* Icon */}
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl p-3 text-white shadow-lg transition-transform duration-300 group-hover:scale-110"
              style={{
                background: `linear-gradient(to bottom right, ${tool.bg.from}, ${tool.bg.to})`,
                boxShadow: `0 8px 20px ${tool.bg.from}30`,
              }}
            >
              <tool.Icon className="h-full w-full" />
            </div>

            {/* Content */}
            <h3 className="mb-3 mt-5 text-lg font-semibold text-slate-800 transition-colors duration-300 group-hover:text-purple-700">
              {tool.title}
            </h3>

            <p className="max-w-[95%] text-sm leading-relaxed text-gray-500">
              {tool.description}
            </p>

            {/* Subtle card accent */}
            <div className="mt-5 h-1 w-10 rounded-full bg-gradient-to-r from-violet-500 to-pink-400 transition-all duration-300 group-hover:w-16" />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AiTools;
