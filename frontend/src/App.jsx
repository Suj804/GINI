import{Routes,Route,Navigate}from'react-router-dom';
import Layout from'./components/Layout.jsx';import ProtectedRoute from'./components/ProtectedRoute.jsx';
import Login from'./pages/Login.jsx';import Register from'./pages/Register.jsx';import Dashboard from'./pages/Dashboard.jsx';
import TextTool from'./pages/TextTool.jsx';import ImageGen from'./pages/ImageGen.jsx';import Pipeline from'./pages/Pipeline.jsx';
import Resume from'./pages/Resume.jsx';import BackgroundRemoval from'./pages/BackgroundRemoval.jsx';import ObjectRemoval from'./pages/ObjectRemoval.jsx';
import Library from'./pages/Library.jsx';import Profile from'./pages/Profile.jsx';import Admin from'./pages/Admin.jsx';
export default function App(){return<Routes>
  <Route path="/login" element={<Login/>}/><Route path="/register" element={<Register/>}/>
  <Route element={<ProtectedRoute><Layout/></ProtectedRoute>}>
    <Route index element={<Dashboard/>}/><Route path="tools/:id" element={<TextTool/>}/>
    <Route path="image" element={<ImageGen/>}/><Route path="pipeline" element={<Pipeline/>}/><Route path="resume" element={<Resume/>}/>
    <Route path="background-removal" element={<BackgroundRemoval/>}/><Route path="object-removal" element={<ObjectRemoval/>}/>
    <Route path="library" element={<Library/>}/><Route path="profile" element={<Profile/>}/>
    <Route path="admin" element={<ProtectedRoute admin><Admin/></ProtectedRoute>}/></Route>
  <Route path="*" element={<Navigate to="/"/>}/></Routes>}
