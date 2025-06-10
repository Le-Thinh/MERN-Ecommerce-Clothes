import React from "react";
import { Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";

const App = () => {
  return (
    <div>
      <div className="min-h-screen xl:flex dark:bg-gray-900">
        <ScrollToTop />
        <Sidebar />
        <div className="flex-1 transition-all duration-300 ease-in-out lg:ml-[290px] ">
          <Header />
          <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">
            <Routes>
              <Route path="/" element={<Dashboard />} />

              {/* Other Page */}
              <Route path="/profile" element={<Profile />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
