import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { LoginUserForm } from "./auth/LoginUserForm";
import { Register } from "./auth/Register";

export const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route  path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginUserForm />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </Router>
    </>
  );
};
