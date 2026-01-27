import React from "react";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./providers/router";
import { QueryProvider } from "./providers/query-client";

export function App() {
  return (
    <QueryProvider>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </QueryProvider>
  );
}
