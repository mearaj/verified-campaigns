import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider } from "@/context/AuthProvider";
import HomePage from "@/pages/HomePage";
import HowWeVerifyPage from "@/pages/HowWeVerifyPage";
import AdminGuard from "@/pages/admin/AdminGuard";
import AdminLoginPage from "@/pages/admin/AdminLoginPage";
import AdminDashboardPage from "@/pages/admin/AdminDashboardPage";
import AdminCampaignPage from "@/pages/admin/AdminCampaignPage";
import AdminPendingPage from "@/pages/admin/AdminPendingPage";
import AdminHelpPage from "@/pages/admin/AdminHelpPage";

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/how-we-verify" element={<HowWeVerifyPage />} />
          <Route path="/admin/login" element={<AdminLoginPage />} />
          <Route path="/admin/pending" element={<AdminPendingPage />} />
          <Route
            path="/admin"
            element={
              <AdminGuard>
                <AdminDashboardPage />
              </AdminGuard>
            }
          />
          <Route
            path="/admin/help"
            element={
              <AdminGuard>
                <AdminHelpPage />
              </AdminGuard>
            }
          />
          <Route
            path="/admin/campaigns/new"
            element={
              <AdminGuard>
                <AdminCampaignPage />
              </AdminGuard>
            }
          />
          <Route
            path="/admin/campaigns/:id"
            element={
              <AdminGuard>
                <AdminCampaignPage />
              </AdminGuard>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
