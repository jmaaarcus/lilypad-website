import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import "./styles.css";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { Support } from "./pages/Support";
import { Legal } from "./pages/Legal";
import { NotFound } from "./pages/NotFound";

// basename comes from Vite `base` (site.config.ts), without the trailing slash.
const basename = import.meta.env.BASE_URL.replace(/\/$/, "");

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter basename={basename}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="support" element={<Support />} />
          <Route path="privacy" element={<Legal doc="privacy" />} />
          <Route path="terms" element={<Legal doc="terms" />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
