import React from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Home from "./components/home/Home";
import CreateUser from "./components/accounts/CreateUser";
import Login from "./components/accounts/Login";
import CreateProject from "./components/project/CreateProject";
import Navbar from "./components/navbar/Navbar";
import AllUsers from "./components/accounts/AllUser";
import ProtectedRoute from "./utils/ProtectedRoute";
import Unauthorized from "./utils/Unauthorized";
import ProjectEdit from "./components/project/ProjectEdit";
function App() {
  const location = useLocation()

   const hideNavbar = location.pathname === "/login";

  return (
    <>
      {!hideNavbar && <Navbar/>}
      <Routes>
        <Route path="/" element={<ProtectedRoute allowedRoles={["admin", "manager", "user"]}><Home /></ProtectedRoute>} />
        <Route path="/create-user" element={  <ProtectedRoute allowedRoles={["admin"]}><CreateUser /></ProtectedRoute>} />
        <Route path="/login" element={<Login />} />
        <Route path="/create-project" element={ <ProtectedRoute allowedRoles={["admin", "manager"]}><CreateProject /></ProtectedRoute>} />
        <Route path="/all-users" element={ <ProtectedRoute allowedRoles={["admin", "manager"]}><AllUsers /></ProtectedRoute>} />
        <Route path="/edit-product/:id" element={ <ProtectedRoute allowedRoles={["admin", "manager"]}><ProjectEdit /></ProtectedRoute>} />
        <Route path="/unauthorized" element={<Unauthorized/>} />
      </Routes>
    </>
  );
}

export default App;
