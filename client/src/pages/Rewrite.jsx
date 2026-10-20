import { RefreshCw } from "lucide-react";
import TextTool from "../components/TextTool";
import { CREDIT_COST } from "../lib/config";

const presets = [
  "Make it shorter",
  "Expand with more detail",
  "Fix grammar and spelling",
  "Make it more engaging",
];

const Rewrite = () => (
  <TextTool
    title="Content Rewriter"
    Icon={RefreshCw}
    color="#f59e0b"
    gradient="bg-gradient-to-r from-[#f59e0b] to-[#ef4444]"
    chipActive="bg-amber-50 text-amber-700 border-amber-300"
    cost={CREDIT_COST.rewrite}
    endpoint="/api/ai/rewrite"
    type="rewrite"
    textPlaceholder="Paste the content you want to improve..."
    optionField="instruction"
    optionLabel="Instruction"
    options={presets}
    allowCustom
    customPlaceholder="Pick a preset above or write your own instruction"
    submitLabel="Rewrite content"
    outputTitle="Rewritten content"
    emptyText='Paste your text, choose an instruction and click "Rewrite content"'
  />
);

export default Rewrite;
