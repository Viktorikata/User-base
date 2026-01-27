import React from "react";
import { Navigate } from "react-router-dom";
import { isAuthed } from "../../shared/lib/auth";

export function RequireAuth({ children }: { children: React.ReactElement }) {
  if (!isAuthed()) return <Navigate to="/login" replace />;
  return children;
}
