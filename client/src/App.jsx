import { Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Dashboard from "./pages/Dashboard";
import WriteArticle from "./pages/WriteArticle";
import BlogTitles from "./pages/BlogTitles";
import GenerateImages from "./pages/GenerateImages";
import RemoveBackground from "./pages/RemoveBackground";
import RemoveObject from "./pages/RemoveObject";
import ReviewResume from "./pages/ReviewResume";
import Rewrite from "./pages/Rewrite";
import Summarize from "./pages/Summarize";
import ToneConvert from "./pages/ToneConvert";
import IdeaToContent from "./pages/IdeaToContent";
import Workspaces from "./pages/Workspaces";
import Favourites from "./pages/Favourites";
import History from "./pages/History";
import Community from "./pages/Community";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <Toaster />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/ai" element={<Layout />}>
          <Route index element={<Dashboard />} />
          <Route path="write-article" element={<WriteArticle />} />
          <Route path="blog-titles" element={<BlogTitles />} />
          <Route path="generate-images" element={<GenerateImages />} />
          <Route path="remove-background" element={<RemoveBackground />} />
          <Route path="remove-object" element={<RemoveObject />} />
          <Route path="review-resume" element={<ReviewResume />} />
          <Route path="rewrite" element={<Rewrite />} />
          <Route path="summarize" element={<Summarize />} />
          <Route path="tone" element={<ToneConvert />} />
          <Route path="idea-to-content" element={<IdeaToContent />} />
          <Route path="workspaces" element={<Workspaces />} />
          <Route path="favourites" element={<Favourites />} />
          <Route path="history" element={<History />} />
          <Route path="community" element={<Community />} />
          <Route path="profile" element={<Profile />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
};

export default App;
