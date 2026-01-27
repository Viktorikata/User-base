import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/login";
import { UsersPage } from "../../pages/users";
import { NotFoundPage } from "../../pages/not-found";
import { RequireAuth } from "./require-auth";
import { isAuthed } from "../../shared/lib/auth";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />

      <Route
        path="/login"
        element={isAuthed() ? <Navigate to="/users" replace /> : <LoginPage />}
      />

      <Route
        path="/users"
        element={
          <RequireAuth>
            <UsersPage />
          </RequireAuth>
        }
      />

      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
