import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { StudyProvider } from "./contexts/StudyContext";
import Layout from "./components/Layout/Layout";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import BusinessPlanPage from "./pages/BusinessPlanPage";
import StudyResultsPage from "./pages/StudyResultsPage";
import PricingPage from "./pages/PricingPage";
import AboutPage from "./pages/AboutPage";
import ContactPage from "./pages/ContactPage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ProtectedRoute from "./components/Auth/ProtectedRoute";

function App() {
  return (
    <AuthProvider>
      <StudyProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route path="/pricing" element={<PricingPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route
              path="/business-plan"
              element={
                <ProtectedRoute>
                  <BusinessPlanPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <DashboardPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/study-results/:id"
              element={
                <ProtectedRoute>
                  <StudyResultsPage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </Layout>
      </StudyProvider>
    </AuthProvider>
  );
}

export default App;
