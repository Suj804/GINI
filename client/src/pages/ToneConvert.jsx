import { Languages } from "lucide-react";
import TextTool from "../components/TextTool";
import { CREDIT_COST } from "../lib/config";

const tones = ["Professional", "Casual", "Formal", "Simple"];

const ToneConvert = () => (
  <TextTool
    title="Tone Converter"
    Icon={Languages}
    color="#ec4899"
    gradient="bg-gradient-to-r from-[#ec4899] to-[#8b5cf6]"
    chipActive="bg-pink-50 text-pink-700 border-pink-300"
    cost={CREDIT_COST.tone}
    endpoint="/api/ai/convert-tone"
    type="tone"
    textPlaceholder="Paste the text whose tone you want to change..."
    optionField="tone"
    optionLabel="Target tone"
    options={tones}
    defaultOption={tones[0]}
    submitLabel="Convert tone"
    outputTitle="Converted text"
    emptyText='Paste your text, pick a tone and click "Convert tone"'
  />
);

export default ToneConvert;
