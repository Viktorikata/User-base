import React from "react";
import { HashRouter  } from "react-router-dom";
import { AppRouter } from "./providers/router";
import { QueryProvider } from "./providers/query-client";

export function App() {
  return (
    <QueryProvider>
      <HashRouter >
        <AppRouter />
      </HashRouter >
    </QueryProvider>
  );
}
