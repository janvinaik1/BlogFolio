import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import PublicLayout from "../layouts/PublicLayout";
import RegisterPage from "../pages/RegisterPage";
import LoginPage from "../pages/LoginPage";
import HomePage from "../pages/Home";
import CreateBlog from "../pages/CreateBlog";
import BlogDetailPage from "../pages/BlogDetail";
import ProfilePage from "../pages/ProfilePage";
import EditBlogPage from "../pages/EditBlogPage";
import CreatePortfolio from "../pages/CreatePortfolio";
import ViewPortfolio from "../pages/ViewPortfolio"
import ForgotPasswordPage from "../pages/ForgotPassword";
import ResetPasswordPage from "../pages/ResetPassword";
import LandingPage from "../pages/LandingPage";
import PortfolioPage from "../pages/PortfolioManagement";
import EditPortfolioForm from "../pages/EditPortfolio";
// import NotFound from "./pages/NotFound"; // optional

const router = createBrowserRouter([
  {
    path: "/",
    element: <LandingPage />,
  },
  {
    path: "/blog",
    element: <MainLayout />,
    children: [
      { path: "createblog", element: <CreateBlog /> },
      { path: "profile", element: <ProfilePage /> },
      { path: ":id", element: <BlogDetailPage /> },
      { path: "home", element: <HomePage /> },
      { path: "edit/:id", element: <EditBlogPage /> },
      { path: "createportfolio", element: <CreatePortfolio /> },
      { path: "portfolio/:id", element: <PortfolioPage /> },
      { path: "edit/portfolio/:id", element: <EditPortfolioForm /> }
    ],
  },
  {
    path: "/public",
    element: <PublicLayout />,
    children: [
      { path: "view/portfolio/:id", element: <ViewPortfolio /> },
      { path: ":id", element: <BlogDetailPage /> },
      { path: "home", element: <HomePage /> },
    ],
  },
  { path: "/login", element: <LoginPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/forgot-password", element: <ForgotPasswordPage /> },
  { path: "/reset-password", element: <ResetPasswordPage /> },
  { path: "view/portfolio/:id", element: <ViewPortfolio /> },

  // { path: "*", element: <NotFound /> },
]);

export default router;
