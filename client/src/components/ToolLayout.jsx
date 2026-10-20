import { Sparkles } from "lucide-react";
import { useCredits } from "../context/CreditsContext";

// Shared two-column layout used by every AI tool page.
// Left: the form (children). Right: the result (output) or an empty state.
const ToolLayout = ({
  title,
  Icon,
  cost = 0,
  loading = false,
  onSubmit,
  submitLabel,
  outputTitle,
  emptyText,
  output = null,
  children,
}) => {
  const { credits } = useCredits();
  const insufficient = cost > 0 && credits !== null && credits < cost;

  return (
    <div className="h-full overflow-y-scroll p-6 flex items-start flex-wrap gap-4 text-slate-700">
      {/* Left col */}
      <form
        onSubmit={onSubmit}
        className="w-full max-w-lg p-4 bg-white rounded-lg border border-violet-100"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <Sparkles className="w-6" style={{ color: "#8b5cf6" }} />
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
          {cost > 0 && (
            <span className="text-xs px-2.5 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200">
              {cost} credit{cost > 1 ? "s" : ""}
            </span>
          )}
        </div>

        {children}

        {insufficient && (
          <p className="mt-4 text-xs text-red-500">
            Not enough credits. This tool needs {cost} and you have {credits}.
          </p>
        )}

        <button
          type="submit"
          disabled={loading || insufficient}
          className={`w-full flex justify-center items-center gap-2 btn-gradient px-4 py-2.5 mt-6 text-sm rounded-lg cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed`}
        >
          {loading ? (
            <span className="w-4 h-4 my-1 rounded-full border-2 border-white border-t-transparent animate-spin"></span>
          ) : (
            <Icon className="w-5" />
          )}
          {submitLabel}
        </button>
      </form>

      {/* Right col */}
      <div className="w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-violet-100 min-h-96 max-h-[600px]">
        <div className="flex items-center gap-3">
          <Icon className="w-5 h-5" style={{ color: "#8b5cf6" }} />
          <h2 className="text-xl font-semibold">{outputTitle}</h2>
        </div>
        {output ? (
          output
        ) : (
          <div className="flex-1 flex justify-center items-center">
            <div className="text-sm flex flex-col items-center gap-5 text-gray-400">
              <Icon className="w-9 h-9" />
              <p className="text-center">{emptyText}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ToolLayout;
