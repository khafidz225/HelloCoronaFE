import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Navigate, Outlet } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

const UserPrivateRoute = (props) => {
  const role = localStorage.getItem("role");

  return (
    <>{role === "Patient" ? <Outlet /> : <Navigate to={"/reservasidata"} />}</>
  );
};

export default UserPrivateRoute;
