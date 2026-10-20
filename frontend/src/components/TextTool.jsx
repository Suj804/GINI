import { useState } from "react";
import toast from "react-hot-toast";
import ToolLayout from "./ToolLayout";
import ResultView from "./ResultView";
import ChipGroup from "./ChipGroup";
import useTool from "../hooks/useTool";
import { fieldClass } from "../lib/config";

// Generic "paste text + choose an option" tool. Used by Rewrite, Summarize and Tone pages.
const TextTool = ({
  title,
  Icon,
  color,
  gradient,
  chipActive,
  cost,
  endpoint,
  type,
  textPlaceholder,
  optionField,
  optionLabel,
  options,
  defaultOption = "",
  allowCustom = false,
  customPlaceholder = "",
  submitLabel,
  outputTitle,
  emptyText,
}) => {
  const [text, setText] = useState("");
  const [option, setOption] = useState(defaultOption);
  const { loading, result, run } = useTool(cost);

  const onSubmit = (e) => {
    e.preventDefault();
    if (text.trim().length < 20) {
      toast.error("Please enter at least 20 characters of text.");
      return;
    }
    if (!option.trim()) {
      toast.error(`Please choose or enter ${optionLabel.toLowerCase()}.`);
      return;
    }
    run("post", endpoint, { content: text, [optionField]: option }, text.trim().slice(0, 80));
  };

  const words = text.trim() ? text.trim().split(/\s+/).length : 0;

  return (
    <ToolLayout
      title={title}
      Icon={Icon}
      color={color}
      gradient={gradient}
      cost={cost}
      loading={loading}
      onSubmit={onSubmit}
      submitLabel={submitLabel}
      outputTitle={outputTitle}
      emptyText={emptyText}
      output={
        result?.content ? (
          <ResultView content={result.content} type={type} prompt={result.label} />
        ) : null
      }
    >
      <p className="mt-6 text-sm font-semibold">Your text</p>
      <textarea
        onChange={(e) => setText(e.target.value)}
        value={text}
        rows={8}
        className={fieldClass}
        placeholder={textPlaceholder}
        required
      />
      <p className="mt-1 text-xs text-gray-400">{words} words</p>

      <p className="mt-4 text-sm font-medium">{optionLabel}</p>
      <ChipGroup options={options} value={option} onChange={setOption} activeClass={chipActive} />
      {allowCustom && (
        <textarea
          onChange={(e) => setOption(e.target.value)}
          value={option}
          rows={2}
          className={fieldClass}
          placeholder={customPlaceholder}
        />
      )}
    </ToolLayout>
  );
};

export default TextTool;
