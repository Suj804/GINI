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
    <section className="px-4 sm:px-20 xl:px-32 my-24">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-center"
      >
        <h2 className="text-slate-700 text-[42px] font-semibold">
          Powerful AI Tools
        </h2>
        <p className="text-gray-500 max-w-lg mx-auto mt-2">
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
        className="flex flex-wrap mt-12 justify-center"
      >
        {AiToolsData.map((tool, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            whileHover={{ y: -6, scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => user && navigate(tool.path)}
            className="p-8 m-4 max-w-xs rounded-xl bg-[#FDFDFE] shadow-md border border-gray-100 cursor-pointer transition"
          >
            {/* Icon */}
            <div
              className="w-12 h-12 p-3 rounded-xl text-white flex items-center justify-center"
              style={{
                background: `linear-gradient(to bottom, ${tool.bg.from}, ${tool.bg.to})`,
              }}
            >
              <tool.Icon className="w-full h-full" />
            </div>

            {/* Content */}
            <h3 className="mt-6 mb-3 text-lg font-semibold text-gray-800">
              {tool.title}
            </h3>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[95%]">
              {tool.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default AiTools;