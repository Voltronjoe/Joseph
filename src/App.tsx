/// <reference types="vite/client" />
import { useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { Shell } from "./components/layout/Shell";
import { AdminShell } from "./components/layout/AdminShell";
import { Home } from "./pages/Home";
import { Chat } from "./pages/Chat";
import { Nearby } from "./pages/Nearby";
import { Verify } from "./pages/Verify";
import { Categories } from "./pages/Categories";
import { About } from "./pages/About";
import { Profile } from "./pages/Profile";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { AdminLogin } from "./pages/AdminLogin";
import { AdminDashboard } from "./pages/admin/Dashboard";
import { useAppStore } from "./store/store";

function App() {
  const { isDarkMode } = useAppStore();

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [isDarkMode]);

  // Provide a fallback client ID if env var is missing, purely for UI demonstration in preview
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID || "123456789-mock-client-id.apps.googleusercontent.com";

  return (
    <GoogleOAuthProvider clientId={clientId}>
      <div className={isDarkMode ? "dark" : ""}>
        <BrowserRouter>
          <Routes>
            {/* Public Routes */}
            <Route element={<Shell />}>
              <Route path="/" element={<Home />} />
              <Route path="/chat" element={<Chat />} />
              <Route path="/nearby" element={<Nearby />} />
              <Route path="/verify" element={<Verify />} />
              <Route path="/categories" element={<Categories />} />
              <Route path="/about" element={<About />} />
              <Route path="/profile" element={<Profile />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
            </Route>

            {/* Admin Auth Route */}
            <Route path="/admin/login" element={<AdminLogin />} />

            {/* Admin Protected Routes */}
            <Route path="/admin" element={<AdminShell />}>
              <Route index element={<Navigate to="/admin/dashboard" replace />} />
              <Route path="dashboard" element={<AdminDashboard />} />
              <Route path="*" element={<div className="text-slate-400 p-8">Section under construction (MVP)</div>} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </BrowserRouter>
      </div>
    </GoogleOAuthProvider>
  );
}

export default App;
