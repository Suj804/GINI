import { useNavigate } from "react-router-dom";
import { ArrowRight, Check, Layers, Play, ShieldCheck, Sparkles, Zap } from "lucide-react";

const stats = [
  { Icon: Layers, label: "AI tools", value: "10" },
  { Icon: Zap, label: "Credits", value: "Free to start" },
  { Icon: ShieldCheck, label: "Sign-in", value: "Secure" },
];

const Hero = () => {
  const navigate = useNavigate();

  const scrollToTools = () => {
    document.getElementById("tools")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="theme-bg relative overflow-hidden min-h-screen px-4 sm:px-10 xl:px-32 pt-32 pb-16 flex items-center">
      {/* Decorative colour blobs and glass orbs */}
      <div className="blob -left-24 top-40 w-80 h-80 bg-primary/40" />
      <div className="blob right-0 -bottom-20 w-96 h-96 bg-accent/40" />
      <div className="orb float-slow -left-10 top-28 w-28 h-28 max-sm:hidden" />
      <div className="orb float-slow right-[8%] top-24 w-16 h-16" />
      <div className="orb float-slow -right-16 bottom-16 w-52 h-52 max-lg:hidden" />

      <div className="relative z-10 w-full max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">
        {/* Left: copy */}
        <div>
          <span className="glass inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs text-slate-700">
            <Sparkles className="w-3.5 h-3.5 text-primary" />
            New: Idea-to-Content pipeline
          </span>

          <h1 className="mt-6 text-4xl sm:text-5xl 2xl:text-6xl font-semibold leading-tight text-ink">
            Create, edit and polish content in one calm place
          </h1>

          <p className="mt-5 max-w-md text-slate-600">
            GINI brings article writing, image generation, resume scoring and more into
            a single workspace, so you stop switching between apps.
          </p>

          <div className="mt-8 flex flex-col gap-3 max-w-sm">
            <button
              onClick={() => navigate("/ai")}
              className="btn-gradient flex items-center justify-center gap-2 px-8 py-3.5 rounded-full cursor-pointer active:scale-95"
            >
              Start free <ArrowRight className="w-4 h-4" />
            </button>
            <button
              onClick={scrollToTools}
              className="glass flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-slate-700 cursor-pointer active:scale-95"
            >
              <Play className="w-3.5 h-3.5 fill-current" /> Explore the tools
            </button>
          </div>

          <ul className="mt-6 flex flex-wrap gap-x-5 gap-y-2 text-xs text-slate-500">
            {["Free credits to start", "Secure sign-in", "Built for students and creators"].map(
              (t) => (
                <li key={t} className="flex items-center gap-1.5">
                  <Check className="w-3.5 h-3.5 text-primary" /> {t}
                </li>
              )
            )}
          </ul>
        </div>

        {/* Right: glass product preview */}
        <div className="glass rounded-3xl p-5 w-full max-w-md mx-auto lg:ml-auto">
          <div className="rounded-2xl bg-white/80 px-4 py-3 flex items-center justify-between">
            <span className="flex items-center gap-2 text-sm font-medium text-ink">
              <Sparkles className="w-4 h-4 text-primary" /> GINI Chat
            </span>
            <span className="flex items-center gap-1.5 text-xs text-emerald-600">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> Online
            </span>
          </div>

          <div className="mt-3 ml-auto max-w-[85%] rounded-2xl bg-white/85 px-4 py-2.5 text-sm text-slate-700 shadow-sm">
            Turn my idea about remote work into an article with an image
          </div>

          <div className="mt-3 rounded-2xl bg-white/70 p-4 text-sm text-slate-700">
            <p className="flex items-center gap-2 font-medium text-ink">
              <Sparkles className="w-4 h-4 text-primary" /> Here is the plan:
            </p>
            <ul className="mt-2 space-y-1.5 text-[13px] text-slate-600 list-disc pl-5">
              <li>Write a structured article from your idea</li>
              <li>Generate a matching image</li>
              <li>Save the result to your workspace</li>
            </ul>
          </div>

          <div className="mt-3 grid grid-cols-3 gap-3">
            {stats.map(({ Icon, label, value }) => (
              <div key={label} className="rounded-2xl bg-white/70 p-3 text-center">
                <Icon className="w-4 h-4 mx-auto text-primary" />
                <p className="mt-1.5 text-[11px] text-slate-500">{label}</p>
                <p className="text-xs font-medium text-ink">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
