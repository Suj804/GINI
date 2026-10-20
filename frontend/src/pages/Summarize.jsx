import { AlignLeft } from "lucide-react";
import TextTool from "../components/TextTool";
import { CREDIT_COST } from "../lib/config";

const styles = ["Short summary", "Key points", "Detailed summary"];

const Summarize = () => (
  <TextTool
    title="Content Summarizer"
    Icon={AlignLeft}
    color="#0ea5e9"
    gradient="bg-gradient-to-r from-[#0ea5e9] to-[#6366f1]"
    chipActive="bg-sky-50 text-sky-700 border-sky-300"
    cost={CREDIT_COST.summarize}
    endpoint="/api/ai/summarize"
    type="summary"
    textPlaceholder="Paste the article or notes you want summarized..."
    optionField="style"
    optionLabel="Summary style"
    options={styles}
    defaultOption={styles[0]}
    submitLabel="Summarize"
    outputTitle="Summary"
    emptyText='Paste your text and click "Summarize" to get started'
  />
);

export default Summarize;
