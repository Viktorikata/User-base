import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./providers/router";

export function App() {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>
  );
}
