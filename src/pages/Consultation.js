import React from "react";
import Container from "react-bootstrap/esm/Container";
import Navbars from "../components/Navbar";
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";
import { useQuery } from "react-query";
import { API } from "../config/api";
import moment from "moment";

const Consultation = () => {
  let { data: checkAuth } = useQuery("checkAuthCache", async () => {
    const response = await API.get("/check-auth");
    return response.data.data;
  });

  let { data: consultation } = useQuery("consultationCache", async () => {
    const response = await API.get("/consultations");
    return response.data.data;
  });

  return (
    <>
      <Navbars />
      <Container>
        <h1 style={{ color: "#FF6185" }} className="fw-bold mt-5">
          Consultation
        </h1>
        {consultation?.map((data) => {
          const linked = `https://${data?.link}`;
          return (
            data?.user?.id === checkAuth?.id && (
              <Card className="mt-4">
                <ListGroup>
                  <ListGroup.Item>
                    <div className="d-flex justify-content-between">
                      <div className="lh-1 d-flex">
                        <img
                          style={{
                            width: "80px",
                            height: "80px",
                          }}
                          className="mt-3 me-5 ms-5"
                          src={require("../images/profile/circleProfile.png")}
                          alt="circleProfile"
                        />
                        <div>
                          <h1 className="fw-bold fs-3">{data?.subject}</h1>
                          <p style={{ color: "#6C6C6C" }}>16 April 2020</p>
                          <p style={{ color: "#6C6C6C" }}>
                            Keluhan : <span>{data?.description}</span>
                          </p>
                        </div>
                      </div>
                      <div className="fw-bold">
                        <p>{moment(data?.CreatedAt).format("DD MMM YYYY")}</p>
                      </div>
                    </div>
                    {data?.status === "Waiting Live Consultation" ? (
                      <div className="border-top">
                        <div
                          className="d-flex mt-4 m-auto"
                          style={{ width: "70%" }}
                        >
                          <img
                            style={{
                              width: "80px",
                              height: "80px",
                            }}
                            className="mt-3 me-5 ms-5"
                            src={require("../images/profile/circleProfile.png")}
                            alt="circleProfile"
                          />
                          <div className="lh-1">
                            <h1
                              style={{ fontSize: "24px" }}
                              className="fw-bold text-success"
                            >
                              Approve
                            </h1>
                            <p
                              style={{ color: "#6C6C6C" }}
                              className="mt-4 lh-sm"
                            >
                              <span>{data?.reply}</span>{" "}
                              <a href={linked}>Link</a>
                            </p>
                            <p style={{ color: "#6C6C6C" }}>{data?.doctor}</p>
                          </div>
                        </div>
                      </div>
                    ) : data?.status === "Canced" ? (
                      <div className="border-top">
                        <div
                          className="d-flex mt-4 m-auto"
                          style={{ width: "70%" }}
                        >
                          <img
                            style={{
                              width: "80px",
                              height: "80px",
                            }}
                            className="mt-2 me-5 ms-5"
                            src={require("../images/profile/circleProfile.png")}
                            alt="circleProfile"
                          />
                          <div className="lh-1">
                            <h1
                              style={{ fontSize: "24px" }}
                              className="fw-bold text-danger"
                            >
                              Cancel
                            </h1>
                            <p
                              style={{ color: "#6C6C6C" }}
                              className="mt-2 lh-sm"
                            >
                              Alasan: <span>{data?.reply}</span>
                            </p>
                            <p style={{ color: "#6C6C6C" }}>{data?.doctor}</p>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="d-flex justify-content-center border-top">
                        <p
                          className="mt-5 mb-4 fw-bold"
                          style={{ color: "#6C6C6C", fontSize: "24px" }}
                        >
                          Waiting For Reply
                        </p>
                      </div>
                    )}
                  </ListGroup.Item>
                </ListGroup>
              </Card>
            )
          );
        })}
      </Container>
    </>
  );
};

export default Consultation;
