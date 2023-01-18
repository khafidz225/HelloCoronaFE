import React, { useContext } from "react";
import { useQuery } from "react-query";
import { Navigate, Outlet } from "react-router-dom";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";

const DoctorPrivateRoute = (props) => {
  // let { data: checkAuth } = useQuery("checkAuthCache", async () => {
  //   const response = await API.get("/check-auth");
  //   return response.data.data;
  // });

  const role = localStorage.getItem("role");

  // const [state, dispatch] = useContext(UserContext);
  return <>{role === "Doctor" ? <Outlet /> : <Navigate to={"/"} />}</>;
};

export default DoctorPrivateRoute;
