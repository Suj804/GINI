import { Eraser } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import ToolLayout from "../components/ToolLayout";
import ResultView from "../components/ResultView";
import useTool from "../hooks/useTool";
import { handleFileChange } from "../lib/validate";
import { CREDIT_COST, MAX_FILE_MB, fieldClass } from "../lib/config";

const RemoveBackground = () => {
  const [file, setFile] = useState(null);
  const { loading, result, run } = useTool(CREDIT_COST.removeBackground);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please choose an image first.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    run("post", "/api/ai/remove-image-background", formData, file.name);
  };

  return (
    <ToolLayout
      title="Background Removal"
      Icon={Eraser}
      color="#ff4938"
      gradient="bg-gradient-to-r from-[#f6ab41] to-[#ff4938]"
      cost={CREDIT_COST.removeBackground}
      loading={loading}
      onSubmit={onSubmit}
      submitLabel="Remove background"
      outputTitle="Processed image"
      emptyText='Upload an image and click "Remove background" to get started'
      output={
        result?.content ? (
          <ResultView content={result.content} type="image" prompt={`Background removed: ${result.label}`} />
        ) : null
      }
    >
      <p className="mt-6 text-sm font-semibold">Upload Image</p>
      <input
        onChange={(e) => handleFileChange(e, setFile)}
        type="file"
        accept="image/*"
        className={`${fieldClass} text-gray-600`}
        required
      />
      <p className="text-xs text-gray-500 font-light mt-1">
        Supports JPG, PNG and other image formats, up to {MAX_FILE_MB} MB
      </p>
    </ToolLayout>
  );
};

export default RemoveBackground;
