import { Edit } from "lucide-react";
import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import ResultView from "../components/ResultView";
import ChipGroup from "../components/ChipGroup";
import useTool from "../hooks/useTool";
import { CREDIT_COST, fieldClass } from "../lib/config";

const articleLength = [
  { length: 800, text: "Short (500-800 words)" },
  { length: 1200, text: "Medium (800-1200 words)" },
  { length: 1600, text: "Long (1200+)" },
];

const WriteArticle = () => {
  const [selectedLength, setSelectedLength] = useState(articleLength[0]);
  const [input, setInput] = useState("");
  const { loading, result, run } = useTool(CREDIT_COST.article);

  const onSubmit = (e) => {
    e.preventDefault();
    run(
      "post",
      "/api/ai/generate-article",
      {
        prompt: `Write an article about ${input} in ${selectedLength.text}`,
        length: selectedLength.length,
      },
      input
    );
  };

  return (
    <ToolLayout
      title="Article Configuration"
      Icon={Edit}
      color="#4A7AFF"
      gradient="bg-gradient-to-r from-[#226BFF] to-[#65ADFF]"
      cost={CREDIT_COST.article}
      loading={loading}
      onSubmit={onSubmit}
      submitLabel="Generate article"
      outputTitle="Generated article"
      emptyText='Enter a topic and click "Generate article" to get started'
      output={
        result?.content ? (
          <ResultView content={result.content} type="article" prompt={result.label} />
        ) : null
      }
    >
      <p className="mt-6 text-sm font-semibold">Article Topic</p>
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        className={fieldClass}
        placeholder="The future of artificial intelligence is..."
        required
      />
      <p className="mt-4 text-sm font-medium">Article Length</p>
      <ChipGroup
        options={articleLength.map((l) => l.text)}
        value={selectedLength.text}
        onChange={(text) => setSelectedLength(articleLength.find((l) => l.text === text))}
      />
    </ToolLayout>
  );
};

export default WriteArticle;
