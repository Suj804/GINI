import { Hash } from "lucide-react";
import { useState } from "react";
import ToolLayout from "../components/ToolLayout";
import ResultView from "../components/ResultView";
import ChipGroup from "../components/ChipGroup";
import useTool from "../hooks/useTool";
import { CREDIT_COST, fieldClass } from "../lib/config";

const blogCategories = [
  "General",
  "Technology",
  "Business",
  "Health",
  "Lifestyle",
  "Education",
  "Travel",
  "Food",
];

const BlogTitles = () => {
  const [selectedCategory, setSelectedCategory] = useState("General");
  const [input, setInput] = useState("");
  const { loading, result, run } = useTool(CREDIT_COST.blogTitle);

  const onSubmit = (e) => {
    e.preventDefault();
    run(
      "post",
      "/api/ai/generate-blog-title",
      { prompt: `Generate a blog title for the keyword ${input} in the category ${selectedCategory}` },
      input
    );
  };

  return (
    <ToolLayout
      title="AI Title Generator"
      Icon={Hash}
      color="#8e37eb"
      gradient="bg-gradient-to-r from-[#c341f6] to-[#8e37eb]"
      cost={CREDIT_COST.blogTitle}
      loading={loading}
      onSubmit={onSubmit}
      submitLabel="Generate title"
      outputTitle="Generated titles"
      emptyText='Enter a keyword and click "Generate title" to get started'
      output={
        result?.content ? (
          <ResultView content={result.content} type="blog-title" prompt={result.label} />
        ) : null
      }
    >
      <p className="mt-6 text-sm font-semibold">Keyword</p>
      <input
        onChange={(e) => setInput(e.target.value)}
        value={input}
        type="text"
        className={fieldClass}
        placeholder="The future of artificial intelligence is..."
        required
      />
      <p className="mt-4 text-sm font-medium">Category</p>
      <ChipGroup
        options={blogCategories}
        value={selectedCategory}
        onChange={setSelectedCategory}
        activeClass="bg-purple-50 text-purple-700 border-purple-300"
      />
    </ToolLayout>
  );
};

export default BlogTitles;
