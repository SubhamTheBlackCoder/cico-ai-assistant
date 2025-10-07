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
import SearchBar from "./components/Agent-cico/food/FoodAgent";

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
        <Route path="/kitchen/menu" element={<SearchBar />} />
        <Route path="/upload" element={<Dashboard />} />
        <Route path="/account" element={<AdminPanel />} />
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
