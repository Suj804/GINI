
import React, { useState } from "react";
import Markdown from "react-markdown";

const CreationItem = ({ item }) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      onClick={() => setExpanded(!expanded)}
      className="w-full max-w-5xl cursor-pointer rounded-2xl border border-purple-100/80 bg-white/75 p-4 shadow-[0_6px_24px_rgba(139,92,246,0.06)] backdrop-blur-xl transition-all duration-300 hover:border-purple-200 hover:shadow-[0_10px_30px_rgba(139,92,246,0.12)] sm:p-5"
    >
      <div className="flex items-center justify-between gap-3 sm:gap-4">

        <div className="min-w-0 flex-1">
          <h2 className="break-words font-medium text-slate-800">
            {item.prompt}
          </h2>

          <p className="mt-1 text-xs text-gray-500 sm:text-sm">
            {item.type} - {new Date(item.created_at).toLocaleDateString()}
          </p>
        </div>

        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            setExpanded(!expanded);
          }}
          className="shrink-0 rounded-full border border-purple-200 bg-gradient-to-r from-purple-50 to-pink-50 px-3 py-1.5 text-xs font-medium capitalize text-purple-700 transition hover:border-purple-300 sm:px-4 sm:text-sm"
        >
          {item.type}
        </button>
      </div>

      {expanded && (
        <div
          onClick={(event) => event.stopPropagation()}
          className="mt-4 border-t border-purple-100 pt-4"
        >
          {item.type === "image" ? (
            <div>
              <img
                src={item.content}
                alt="Generated creation"
                loading="lazy"
                className="mt-1 h-auto w-full max-w-md rounded-xl border border-purple-100 object-contain"
              />
            </div>
          ) : (
            <div className="max-h-96 overflow-y-auto rounded-xl border border-purple-100/80 bg-purple-50/30 p-4 text-sm leading-relaxed text-slate-700">
              <div className="reset-tw">
                <Markdown>{item.content}</Markdown>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CreationItem;
