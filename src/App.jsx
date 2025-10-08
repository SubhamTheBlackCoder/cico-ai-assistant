import "./App.css";

import Login from "./components/auth/LoginSignUpPage";

import Dashboard from "./components/Dashboard/Dashboard";
import Home from "./components/Home/home";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Nvbar from "./components/Navbar/Nvbar";
import AdminPanel from "./components/Account/AccountPanel";

import RolesPage from "./components/roles/Assignment";
import ActiveUsersPage from "./components/users/ActiveUser";
import AgentsPage from "./components/Dashboard/Agents/Agent";
// import SearchBar from "./components/Agent-cico/food/FoodAgent";
import RoomAssistant from "./components/Agent-cico/Room/RoomAgent";
import RecentBookings from "./components/Booking/RecentBookings";
<<<<<<< HEAD
import FoodAssistant from "./components/Agent-cico/food/FoodAgent";
=======

>>>>>>> 6cfee243f34ec2656aa865af9a5d68be5dbada80
function AppContent() {
  const location = useLocation();

  const hideNavbar = location.pathname === "/auth" || location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Nvbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Login />} />
        <Route path="/active" element={<ActiveUsersPage />} />
        <Route path="/agents" element={<AgentsPage />} />
        <Route path="/roles/assignments" element={<RolesPage />} />
        <Route path="/room-service/requests" element={<RoomAssistant />} />
        <Route path="/upload" element={<Dashboard />} />
        <Route path="/account" element={<AdminPanel />} />
        <Route path="/bookings/recent" element={<RecentBookings />} />
<<<<<<< HEAD
        <Route path="/kitchen/menu" element={<FoodAssistant />} />
=======
>>>>>>> 6cfee243f34ec2656aa865af9a5d68be5dbada80
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
