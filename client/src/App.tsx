import AdminDashboard from "./pages/Admin/AdminDashboard";
import Login from "./pages/Admin/Login";
import NotFoundPage from "./pages/Public/NotFoundPage";
import PortfolioPage from "./pages/Public/PortfolioPage";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/admin/login") {
    return <Login />;
  }

  if (path === "/admin") {
    return <AdminDashboard />;
  }

  if (path === "/") {
    return <PortfolioPage />;
  }

  return <NotFoundPage />;
}
