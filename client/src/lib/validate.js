import toast from "react-hot-toast";
import { MAX_FILE_MB } from "./config";

// Use as: <input type="file" onChange={(e) => handleFileChange(e, setFile)} />
export const handleFileChange = (e, setFile, maxMB = MAX_FILE_MB) => {
  const file = e.target.files?.[0];
  if (!file) {
    setFile(null);
    return;
  }
  if (file.size > maxMB * 1024 * 1024) {
    toast.error(`File is too large. Maximum size is ${maxMB} MB.`);
    e.target.value = "";
    setFile(null);
    return;
  }
  setFile(file);
};
