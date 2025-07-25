import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./redux/store.js";
import { ShopContextProvider } from "./contexts/shopContext.jsx";

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Provider store={store}>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </Provider>
  </BrowserRouter>
);
