import { Image } from "lucide-react";
import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import ResultView from "../components/ResultView";
import ChipGroup from "../components/ChipGroup";
import useTool from "../hooks/useTool";
import { CREDIT_COST, fieldClass } from "../lib/config";

const imageStyle = [
  "Realistic",
  "Ghibli style",
  "Anime style",
  "Cartoon style",
  "Fantasy style",
  "3D style",
  "Portrait style",
];

const GenerateImages = () => {
  const [selectedStyle, setSelectedStyle] = useState("Realistic");
  const [input, setInput] = useState("");
  const [publish, setPublish] = useState(false);
  const { loading, result, run } = useTool(CREDIT_COST.image);

  const onSubmit = (e) => {
    e.preventDefault();
    run(
      "post",
      "/api/ai/generate-image",
      { prompt: `Generate a image of ${input} in the style ${selectedStyle}`, publish },
      input
    );
  };

  return (
    <ToolLayout
      title="AI Image Generator"
      Icon={Image}
      color="#00ad25"
      gradient="bg-gradient-to-r from-[#00ad25] to-[#04ff50]"
      cost={CREDIT_COST.image}
      loading={loading}
      onSubmit={onSubmit}
      submitLabel="Generate image"
      outputTitle="Generated image"
      emptyText='Describe an image and click "Generate image" to get started'
      output={
        result?.content ? (
          <ResultView content={result.content} type="image" prompt={result.label} />
        ) : null
      }
    >
      <p className="mt-6 text-sm font-semibold">Describe Your Image</p>
      <textarea
        onChange={(e) => setInput(e.target.value)}
        value={input}
        rows={4}
        className={fieldClass}
        placeholder="Describe what you want to see in your image..."
        required
      />
      <p className="mt-4 text-sm font-medium">Style</p>
      <ChipGroup
        options={imageStyle}
        value={selectedStyle}
        onChange={setSelectedStyle}
        activeClass="bg-green-50 text-green-700 border-green-300"
      />
      <div className="mt-6 flex items-center gap-2">
        <label className="relative cursor-pointer">
          <input
            type="checkbox"
            onChange={(e) => setPublish(e.target.checked)}
            checked={publish}
            className="sr-only peer"
          />
          <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-500 transition"></div>
          <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition peer-checked:translate-x-4"></span>
        </label>
        <p className="text-sm">Make this image public</p>
      </div>
    </ToolLayout>
  );
};

export default GenerateImages;
