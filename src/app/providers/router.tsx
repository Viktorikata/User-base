import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { LoginPage } from "../../pages/login";
import { UsersPage } from "../../pages/users";
import { NotFoundPage } from "../../pages/not-found";

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/users" element={<UsersPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}
