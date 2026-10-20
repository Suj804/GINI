import { Scissors } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import ToolLayout from "../components/ToolLayout";
import ResultView from "../components/ResultView";
import useTool from "../hooks/useTool";
import { handleFileChange } from "../lib/validate";
import { CREDIT_COST, MAX_FILE_MB, fieldClass } from "../lib/config";

const RemoveObject = () => {
  const [file, setFile] = useState(null);
  const [object, setObject] = useState("");
  const { loading, result, run } = useTool(CREDIT_COST.removeObject);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please choose an image first.");
      return;
    }
    if (object.trim().split(/\s+/).length > 1) {
      toast.error("Please enter only one object name.");
      return;
    }
    const formData = new FormData();
    formData.append("image", file);
    formData.append("object", object.trim());
    run("post", "/api/ai/remove-image-object", formData, `Removed ${object.trim()} from ${file.name}`);
  };

  return (
    <ToolLayout
      title="Object Removal"
      Icon={Scissors}
      color="#4a7aff"
      gradient="bg-gradient-to-r from-[#417df6] to-[#8e37eb]"
      cost={CREDIT_COST.removeObject}
      loading={loading}
      onSubmit={onSubmit}
      submitLabel="Remove object"
      outputTitle="Processed image"
      emptyText='Upload an image and click "Remove object" to get started'
      output={
        result?.content ? (
          <ResultView content={result.content} type="image" prompt={result.label} />
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
      <p className="text-xs text-gray-500 font-light mt-1">Up to {MAX_FILE_MB} MB</p>

      <p className="mt-6 text-sm font-semibold">Object to remove</p>
      <input
        onChange={(e) => setObject(e.target.value)}
        value={object}
        type="text"
        className={fieldClass}
        placeholder="e.g., watch or spoon (a single object name)"
        required
      />
    </ToolLayout>
  );
};

export default RemoveObject;
