import React from "react";
import Container from "react-bootstrap/esm/Container";
import Navbars from "../components/Navbar";
import Card from "react-bootstrap/Card";
import { useQuery } from "react-query";
import { API } from "../config/api";
import { useParams } from "react-router-dom";
import moment from "moment";

const Detail = () => {
  const params = useParams();

  let { data: article } = useQuery("article", async () => {
    const response = await API.get("/article");
    return response.data.data;
  });
  return (
    <>
      <Navbars />
      <Container>
        {article?.map(
          (data) =>
            data?.id == params.id && (
              <div className="mt-4 mb-5">
                <h1 className="fw-bold">{data?.title}</h1>
                <p style={{ color: "#6C6C6C", fontSize: "18px" }}>
                  {moment(data?.CreatedAt).format("DD MMM YYYY")}
                </p>
                <p>
                  Author :{" "}
                  <span style={{ color: "#FF6185" }}>{data.user.fullname}</span>
                </p>
                <Card
                  style={{
                    padding: "63px 95px",
                  }}
                  className="card-shadow"
                >
                  <img
                    src={data?.image}
                    style={{ height: "500px" }}
                    className="img-fluid"
                    alt="peneliti"
                  />
                  <div className="d-flex">
                    <p
                      style={{ color: "#BFBFBF" }}
                      className="p-2 border rounded-3 d-flex justify-content-center mt-4"
                    >
                      Testing
                    </p>
                  </div>
                  <p style={{ fontSize: "18px" }} className="lh-base">
                    {data?.description}
                  </p>
                </Card>
              </div>
            )
        )}
      </Container>
    </>
  );
};

export default Detail;
