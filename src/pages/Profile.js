import React from "react";
import Navbars from "../components/Navbar";
import Card from "react-bootstrap/Card";
import { useQuery } from "react-query";
import { API } from "../config/api";

const Profile = () => {
  let { data: checkAuth } = useQuery("checkAuthCache", async () => {
    const response = await API.get("/check-auth");
    return response.data.data;
  });

  return (
    <>
      <Navbars />
      <Card
        className="m-auto p-5 rounded-2 mt-5 mb-5"
        style={{ width: "785px", backgroundColor: "white" }}
      >
        <div className="d-flex justify-content-between">
          {/* Profile Left */}
          <div className="text-start ">
            <h1 className="fw-bold mb-5">Personal Info</h1>
            <div className="d-flex mt-5">
              <img
                style={{ width: "30px", height: "30px", marginTop: "15px" }}
                src={require("../images/profile/name.png")}
                alt=""
              />
              <div className="ms-2">
                <h5 className="fw-bold" style={{ fontSize: "14px" }}>
                  {checkAuth?.fullname}
                </h5>
                <p className="mt-2" style={{ fontSize: "12px" }}>
                  Full Name
                </p>
              </div>
            </div>

            <div className="d-flex mt-2">
              <img
                style={{ width: "30px", height: "30px", marginTop: "15px" }}
                src={require("../images/profile/email.png")}
                alt=""
              />
              <div className="ms-3">
                <h5 className="fw-bold" style={{ fontSize: "14px" }}>
                  {checkAuth?.email}
                </h5>
                <p className="mt-2" style={{ fontSize: "12px" }}>
                  Email
                </p>
              </div>
            </div>

            <div className="d-flex mt-2">
              <img
                style={{ width: "30px", height: "30px", marginTop: "15px" }}
                src={require("../images/profile/status.png")}
                alt="gender"
              />
              <div className="ms-3">
                <h5 className="fw-bold" style={{ fontSize: "14px" }}>
                  {checkAuth?.role}
                </h5>
                <p className="mt-2" style={{ fontSize: "12px" }}>
                  Status
                </p>
              </div>
            </div>

            <div className="d-flex mt-2">
              <img
                style={{ width: "30px", height: "30px", marginTop: "15px" }}
                src={require("../images/profile/gender.png")}
                alt="gender"
              />
              <div className="ms-3">
                <h5 className="fw-bold" style={{ fontSize: "14px" }}>
                  {checkAuth?.gender}
                </h5>
                <p className="mt-2" style={{ fontSize: "12px" }}>
                  Gender
                </p>
              </div>
            </div>

            <div className="d-flex mt-2">
              <img
                style={{ width: "30px", height: "30px", marginTop: "15px" }}
                src={require("../images/profile/phone.png")}
                alt=""
              />
              <div className="ms-3">
                <h5 className="fw-bold" style={{ fontSize: "14px" }}>
                  {checkAuth?.phone}
                </h5>
                <p className="mt-2" style={{ fontSize: "12px" }}>
                  Mobile Phone
                </p>
              </div>
            </div>

            <div className="d-flex mt-2">
              <img
                style={{ width: "30px", height: "30px", marginTop: "15px" }}
                src={require("../images/profile/maps.png")}
                alt=""
              />
              <div className="ms-3">
                <h5 className="fw-bold" style={{ fontSize: "14px" }}>
                  {checkAuth?.address}
                </h5>
                <p className="mt-2" style={{ fontSize: "12px" }}>
                  Address
                </p>
              </div>
            </div>
          </div>

          {/* Profile Right */}
          <div style={{ width: "280px" }} className="mt-4">
            <img
              className="rounded-2"
              src={require("../images/profile/profilepicture.png")}
              alt=""
            />
            <button
              className="mt-3 border-0 p-2 rounded-2"
              style={{
                width: "100%",
                backgroundColor: "#FF6185",
                color: "white",
              }}
            >
              Change Phote Profile
            </button>
          </div>
        </div>
      </Card>
    </>
  );
};

export default Profile;
