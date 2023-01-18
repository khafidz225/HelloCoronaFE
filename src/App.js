/* eslint-disable react-hooks/exhaustive-deps */
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Detail from "./pages/Detail";
import Profile from "./pages/Profile";
import Reservasi from "./pages/Reservasi";
import Consultation from "./pages/Consultation";
import AddArticle from "./pages/AddArticle";
import ReservasiData from "./pages/ReservasiData";
import UserPrivateRoute from "../src/components/privateRoute/UserPrivateRoute";
import DoctorPrivateRoute from "../src/components/privateRoute/DoctorPrivateRoute";
import { useContext, useEffect } from "react";
import { UserContext } from "./context/userContext";
import { API, setAuthToken } from "./config/api";
import { useQuery } from "react-query";

function App() {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const [state, dispatch] = useContext(UserContext);

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");

      if (response.status === 400) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      let payload = response.data.data;
      console.log(payload);
      payload.token = localStorage.token;

      dispatch({
        type: "USER_SUCCESS",
        payload,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (localStorage.token) {
      checkUser();
    }
  }, []);
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/detail/:id" element={<Detail />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/" element={<Home />} />
          <Route element={<UserPrivateRoute state={state} />} path="/">
            <Route path="/reservasi" element={<Reservasi />} />
            <Route path="/consultation" element={<Consultation />} />
          </Route>
          <Route element={<DoctorPrivateRoute state={state} />}>
            <Route path="/addarticle" element={<AddArticle />} />
            <Route path="/reservasidata" element={<ReservasiData />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
