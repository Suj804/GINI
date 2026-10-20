import Markdown from "react-markdown";
import OutputActions from "./OutputActions";

const ResultView = ({ content, type = "article", prompt = "", header = null }) => (
  <div className="mt-1 flex-1 min-h-0 flex flex-col">
    <OutputActions content={content} type={type} prompt={prompt} />
    <div className="mt-3 flex-1 overflow-y-auto text-sm text-slate-600">
      {header}
      {type === "image" ? (
        <img src={content} alt="Generated result" className="w-full rounded-lg" />
      ) : (
        <div className="reset-tw">
          <Markdown>{content}</Markdown>
        </div>
      )}
    </div>
  </div>
);

export default ResultView;
