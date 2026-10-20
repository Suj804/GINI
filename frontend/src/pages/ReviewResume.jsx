import { FileText } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";
import ToolLayout from "../components/ToolLayout";
import ResultView from "../components/ResultView";
import useTool from "../hooks/useTool";
import { handleFileChange } from "../lib/validate";
import { CREDIT_COST, MAX_FILE_MB, fieldClass } from "../lib/config";

const KeywordList = ({ title, list, className }) =>
  Array.isArray(list) && list.length > 0 ? (
    <div className="mt-3">
      <p className="text-xs font-semibold text-slate-700">{title}</p>
      <div className="mt-1.5 flex flex-wrap gap-1.5">
        {list.map((word) => (
          <span key={word} className={`text-xs px-2.5 py-0.5 rounded-full border ${className}`}>
            {word}
          </span>
        ))}
      </div>
    </div>
  ) : null;

// Shown only when the backend returns an `ats` object
const AtsReport = ({ ats }) => {
  const score = Math.max(0, Math.min(100, Number(ats.score) || 0));
  const bar = score >= 75 ? "bg-green-500" : score >= 50 ? "bg-amber-500" : "bg-red-500";

  return (
    <div className="mb-4 p-3 rounded-lg bg-gray-50 border border-gray-200">
      <div className="flex items-center justify-between">
        <p className="text-sm font-semibold text-slate-700">ATS score</p>
        <p className="text-lg font-semibold text-slate-800">{score}/100</p>
      </div>
      <div className="mt-2 h-2 rounded-full bg-gray-200 overflow-hidden">
        <div className={`h-full ${bar}`} style={{ width: `${score}%` }} />
      </div>
      <KeywordList
        title="Matched keywords"
        list={ats.matched_keywords}
        className="bg-green-50 text-green-700 border-green-200"
      />
      <KeywordList
        title="Missing keywords"
        list={ats.missing_keywords}
        className="bg-red-50 text-red-700 border-red-200"
      />
      {Array.isArray(ats.suggestions) && ats.suggestions.length > 0 && (
        <div className="mt-3">
          <p className="text-xs font-semibold text-slate-700">Suggestions</p>
          <ul className="mt-1 list-disc pl-5 text-xs text-slate-600 space-y-1">
            {ats.suggestions.map((s) => (
              <li key={s}>{s}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const ReviewResume = () => {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");
  const { loading, result, run } = useTool(CREDIT_COST.resume);

  const onSubmit = (e) => {
    e.preventDefault();
    if (!file) {
      toast.error("Please upload your resume as a PDF.");
      return;
    }
    const formData = new FormData();
    formData.append("resume", file);
    if (jobDescription.trim()) formData.append("jobDescription", jobDescription.trim());
    run("post", "/api/ai/resume-review", formData, `Resume review: ${file.name}`);
  };

  return (
    <ToolLayout
      title="Resume Review & ATS Score"
      Icon={FileText}
      color="#00da83"
      gradient="bg-gradient-to-r from-[#00da83] to-[#009bb3]"
      cost={CREDIT_COST.resume}
      loading={loading}
      onSubmit={onSubmit}
      submitLabel="Review resume"
      outputTitle="Analysis results"
      emptyText='Upload a resume and click "Review resume" to get started'
      output={
        result?.content ? (
          <ResultView
            content={result.content}
            type="resume-review"
            prompt={result.label}
            header={result.ats ? <AtsReport ats={result.ats} /> : null}
          />
        ) : null
      }
    >
      <p className="mt-6 text-sm font-semibold">Upload Resume</p>
      <input
        onChange={(e) => handleFileChange(e, setFile)}
        type="file"
        accept="application/pdf"
        className={`${fieldClass} text-gray-600`}
        required
      />
      <p className="text-xs text-gray-500 font-light mt-1">
        PDF resumes only, up to {MAX_FILE_MB} MB
      </p>

      <p className="mt-5 text-sm font-semibold">
        Job description <span className="font-normal text-gray-400">(optional)</span>
      </p>
      <textarea
        onChange={(e) => setJobDescription(e.target.value)}
        value={jobDescription}
        rows={5}
        className={fieldClass}
        placeholder="Paste the job description to get an ATS score and missing keywords for this role"
      />
    </ToolLayout>
  );
};

export default ReviewResume;
