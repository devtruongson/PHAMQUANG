import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const isAuthenticated = () => {
  const loggedIn = JSON.parse(localStorage.getItem("user") || "{}");
  return loggedIn.role =="admin" ? true : false;
};

const Permission = ({ element, ...rest }: any) => {
  const navigate = useNavigate();

  return isAuthenticated() ? (
    React.cloneElement(element, { ...rest })
  ) : (
    <Navigate to="/login" replace />
  );
};

export default Permission;
