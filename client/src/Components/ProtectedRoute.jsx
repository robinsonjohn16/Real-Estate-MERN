import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

function ProtectedRoute() {
   const { currentUser } = useSelector((state) => state.user);
   console.log(currentUser);
   return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
