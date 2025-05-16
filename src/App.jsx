// src/App.jsx
import { Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import PublicLayout from "./layouts/PublicLayout";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/Home";
import CreateBlog from "./pages/CreateBlog";
import BlogDetailPage from "./pages/BlogDetail";
import ProfilePage from "./pages/ProfilePage";
import EditBlogPage from "./pages/EditBlogPage";

const App = () => {
  return (
    <Routes>
      <Route path="/blog" element={<MainLayout />}>
        <Route path="create" element={<CreateBlog />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path=":id" element={<BlogDetailPage />} />
        <Route path="home" element={<HomePage />} />
        <Route path="edit/:id" element={<EditBlogPage />} />
      </Route>
      <Route path="/public" element={<PublicLayout />}>
        <Route path=":id" element={<BlogDetailPage />} />
        <Route path="home" element={<HomePage />} />
      </Route>

      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />

      {/* <Route path="*" element={<NotFound />} /> */}
    </Routes>
  );
};

export default App;
