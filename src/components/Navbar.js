import React, { useContext, useState } from "react";
import { NavDropdown } from "react-bootstrap";
import Container from "react-bootstrap/Container";
import NavbarBrand from "react-bootstrap/esm/NavbarBrand";
import Navbar from "react-bootstrap/Navbar";
import { useQuery } from "react-query";
import { Link, useNavigate } from "react-router-dom";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";
import SignIn from "./auth/SignIn";
import SignUp from "./auth/SignUp";

const Navbars = () => {
  const [state, dispatch] = useContext(UserContext);
  const Navigate = useNavigate();

  let { data: checkAuth } = useQuery("checkAuthCache", async () => {
    const response = await API.get("/check-auth");
    return response.data.data;
  });

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    Navigate("/");
  };

  return (
    <>
      <Navbar className="card-shadow">
        <Container>
          <NavbarBrand
            onClick={() => Navigate("/")}
            style={{ cursor: "pointer" }}
          >
            <Link to={"/"}>
              <img
                src={require("../images/navbarImg/logoNav.png")}
                alt="Logo"
              />
            </Link>
          </NavbarBrand>
          <Navbar.Toggle />
          {state.isLogin == true ? (
            <div>
              <div className="d-flex">
                <p className=" me-3 mt-4 fs-4 fw-bold">
                  Selamat Datang{" "}
                  <span className="text-warning">{state?.user.fullname}</span>
                </p>
                <img src={require("../images/navbarImg/userNav.png")} alt="" />
                <NavDropdown
                  style={{
                    color: "black",
                    fontSize: "30px",
                    marginTop: "20px",
                    // position: "absolute",
                  }}
                  className="me-0"
                  id="navbarScrollingDropdown"
                  align="end"
                >
                  {checkAuth?.role == "Patient" ? (
                    <div>
                      <NavDropdown.Item href="#action3">
                        <Link
                          to="/profile"
                          className="text-decoration-none text-dark"
                        >
                          <div className="d-flex justify-content-between">
                            <img
                              src={require("../images/navbarImg/user.png")}
                              alt=""
                            />
                            Profile
                          </div>
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item>
                        <Link
                          to={"/consultation"}
                          className="text-decoration-none text-dark"
                        >
                          <div className="d-flex justify-content-between">
                            <img
                              src={require("../images/navbarImg/email.png")}
                              alt="consul"
                            />
                            <p>Consultation</p>
                          </div>
                        </Link>
                      </NavDropdown.Item>
                    </div>
                  ) : (
                    <div>
                      <NavDropdown.Item href="#action3">
                        <Link
                          to="/profile"
                          className="text-decoration-none text-dark"
                        >
                          <div className="d-flex justify-content-between">
                            <img
                              src={require("../images/navbarImg/user.png")}
                              alt=""
                            />
                            Profile
                          </div>
                        </Link>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action4">
                        <Link
                          to="/addarticle"
                          className="text-decoration-none text-dark"
                        >
                          <div className="d-flex justify-content-between">
                            <img
                              src={require("../images/navbarImg/consul.png")}
                              alt=""
                            />
                            AddArticle
                          </div>
                        </Link>
                      </NavDropdown.Item>
                    </div>
                  )}
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={logout} href="#action5">
                    <Link to="/" className="text-decoration-none text-dark">
                      <div className="d-flex justify-content-between">
                        <img
                          src={require("../images/navbarImg/logout.png")}
                          alt=""
                        />
                        Logout
                      </div>
                    </Link>
                  </NavDropdown.Item>
                </NavDropdown>
              </div>
            </div>
          ) : (
            <Navbar.Collapse className="justify-content-end">
              <SignIn />
              <SignUp />
            </Navbar.Collapse>
          )}
        </Container>
      </Navbar>
    </>
  );
};

export default Navbars;
