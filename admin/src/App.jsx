import React from "react";
import { Router, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/common/ScrollToTop";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Calendar from "./pages/Calendar";
import AppLayout from "./layouts/AppLayout";

const App = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        {/* Routes sử dụng layout */}
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/calendar" element={<Calendar />} />
        </Route>
      </Routes>
    </>
  );
};

export default App;
