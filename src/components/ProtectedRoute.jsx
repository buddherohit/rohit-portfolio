import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function ProtectedRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="w-12 h-12 border-4 border-red-650 border-t-transparent dark:border-amber-500 dark:border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!user || !user.placementKitUnlocked) {
    return <Navigate to="/placement-kit" replace />;
  }

  return children;
}
