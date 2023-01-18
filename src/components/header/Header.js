import React from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();
  return (
    <>
      <div style={{ backgroundColor: "#FF6185", width: "100%" }}>
        <Container className="d-flex">
          {/* Left Header */}
          <div>
            <div className="d-flex mt-4">
              <img
                style={{ width: "200px" }}
                src={require("../../images/homeImg/iconVirus.png")}
                alt="corona"
              />
              <div
                className="d-flex align-items-center"
                style={{ marginLeft: "-80px" }}
              >
                <div style={{ color: "white" }}>
                  <h1 className="fw-bold" style={{ fontSize: "64px" }}>
                    Cegah Covid-19
                  </h1>
                  <h3 style={{ fontSize: "48px" }} className="mt-2">
                    dengan Melakukan :
                  </h3>
                </div>
              </div>
            </div>
            <div className="d-flex mt-2 mb-5">
              <Link to={"/reservasi"}>
                <Button
                  style={{
                    backgroundColor: "white",
                    color: "#FF6185",
                    fontSize: "24px",
                  }}
                  className="fw-bold m-auto p-2 border-0"
                >
                  <img
                    src={require("../../images/homeImg/iconDoktor.png")}
                    alt="Doktor"
                    className="me-3"
                  />
                  Konsoltasi Dengan Dokter
                </Button>
              </Link>
            </div>
          </div>
          {/* Right Header */}
          <div className="m-auto d-flex justify-content-end">
            <div>
              <img
                src={require("../../images/homeImg/Crowd.png")}
                alt="crowd"
              />
              <img src={require("../../images/homeImg/Hand.png")} alt="Hand" />
              <img src={require("../../images/homeImg/Eyes.png")} alt="Eyes" />
              <img
                src={require("../../images/homeImg/House.png")}
                alt="House"
              />
            </div>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Header;
