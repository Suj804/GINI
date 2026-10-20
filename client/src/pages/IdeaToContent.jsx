import { useState } from "react";
import { Workflow, Check } from "lucide-react";
import toast from "react-hot-toast";
import ToolLayout from "../components/ToolLayout";
import ResultView from "../components/ResultView";
import useApi from "../hooks/useApi";
import { useCredits } from "../context/CreditsContext";
import { getErrorMessage } from "../lib/api";
import { CREDIT_COST, fieldClass } from "../lib/config";

const ORDER = { idle: 0, article: 1, image: 2, done: 3 };

const Step = ({ label, state }) => (
  <div className="flex items-center gap-2 text-xs">
    <span
      className={`w-5 h-5 rounded-full flex items-center justify-center border ${
        state === "done"
          ? "bg-green-500 border-green-500 text-white"
          : state === "active"
          ? "border-primary text-primary"
          : "border-gray-300 text-gray-300"
      }`}
    >
      {state === "done" ? (
        <Check className="w-3 h-3" />
      ) : state === "active" ? (
        <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
      ) : null}
    </span>
    <span className={state === "idle" ? "text-gray-400" : "text-slate-700"}>{label}</span>
  </div>
);

// Idea -> Article -> Related image -> Final content.
// Runs the existing article and image endpoints one after another.
const IdeaToContent = () => {
  const { request } = useApi();
  const { credits } = useCredits();
  const [idea, setIdea] = useState("");
  const [stage, setStage] = useState("idle");
  const [article, setArticle] = useState("");
  const [image, setImage] = useState("");

  const total = CREDIT_COST.article + CREDIT_COST.image;
  const loading = stage === "article" || stage === "image";
  const n = ORDER[stage];

  const onSubmit = async (e) => {
    e.preventDefault();
    if (credits !== null && credits < total) {
      toast.error(`Not enough credits. The pipeline needs ${total} and you have ${credits}.`);
      return;
    }
    setArticle("");
    setImage("");
    try {
      setStage("article");
      const a = await request("post", "/api/ai/generate-article", {
        prompt: `Write an article about ${idea} in Short (500-800 words)`,
        length: 800,
      });
      if (!a.success) {
        toast.error(a.message || "Article generation failed");
        setStage("idle");
        return;
      }
      setArticle(a.content);

      setStage("image");
      try {
        const img = await request("post", "/api/ai/generate-image", {
          prompt: `Generate a image of ${idea} in the style Realistic`,
          publish: false,
        });
        if (img.success) setImage(img.content);
        else toast.error(img.message || "Image generation failed. Showing the article only.");
      } catch (err) {
        toast.error(`${getErrorMessage(err)}. Showing the article only.`);
      }
      setStage("done");
    } catch (err) {
      toast.error(getErrorMessage(err));
      setStage("idle");
    }
  };

  const finalContent = image ? `![${idea}](${image})\n\n${article}` : article;

  return (
    <ToolLayout
      title="Idea to Content"
      Icon={Workflow}
      color="#6366f1"
      gradient="bg-gradient-to-r from-[#6366f1] to-[#06b6d4]"
      cost={total}
      loading={loading}
      onSubmit={onSubmit}
      submitLabel="Create content"
      outputTitle="Final content"
      emptyText='Enter an idea and click "Create content". GINI writes the article and a matching image.'
      output={
        stage === "idle" ? null : (
          <div className="mt-3 flex-1 min-h-0 flex flex-col">
            <div className="flex flex-wrap gap-x-5 gap-y-2">
              <Step label="Article" state={n > 1 ? "done" : "active"} />
              <Step label="Related image" state={n > 2 ? "done" : n === 2 ? "active" : "idle"} />
              <Step label="Final content" state={n === 3 ? "done" : "idle"} />
            </div>
            {stage === "done" ? (
              <ResultView content={finalContent} type="idea-to-content" prompt={idea} />
            ) : (
              <p className="mt-6 text-sm text-gray-400 text-center">
                {stage === "article" ? "Writing your article..." : "Generating a related image..."}
              </p>
            )}
          </div>
        )
      }
    >
      <p className="mt-6 text-sm font-semibold">Your idea</p>
      <textarea
        onChange={(e) => setIdea(e.target.value)}
        value={idea}
        rows={4}
        className={fieldClass}
        placeholder="e.g., How remote work is changing small-town economies"
        required
      />
      <p className="mt-2 text-xs text-gray-400">
        Steps: idea, article, related image, final content you can save to a workspace.
      </p>
    </ToolLayout>
  );
};

export default IdeaToContent;
