import "./App.css";

import Login from "./components/auth/LoginSignUpPage";

import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Nvbar from "./components/Navbar/Nvbar";
import RecentBookings from './components/Booking/RecentBookings';

function AppContent() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/auth" || location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Nvbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/upload" element={<Dashboard />} />
        <Route path="/bookings/recent" element={<RecentBookings />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
