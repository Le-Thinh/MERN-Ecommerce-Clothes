import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { AppWrapper } from "./components/common/PageMeta.jsx";
import { ShopContextProvider } from "./contexts/ShopContext.jsx";
import { LoadingProvider } from "./contexts/LoadingContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <LoadingProvider>
        <ThemeProvider>
          <AppWrapper>
            <ShopContextProvider>
              <App />
            </ShopContextProvider>
          </AppWrapper>
        </ThemeProvider>
      </LoadingProvider>
    </BrowserRouter>
  </StrictMode>
);
