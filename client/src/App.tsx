import AdminDashboard from "./pages/Admin/AdminDashboard";
import Login from "./pages/Admin/Login";
import PortfolioPage from "./pages/Public/PortfolioPage";

export default function App() {
  const path = window.location.pathname.replace(/\/+$/, "") || "/";

  if (path === "/admin/login") {
    return <Login />;
  }

  if (path === "/admin") {
    return <AdminDashboard />;
  }

  return <PortfolioPage />;
}
