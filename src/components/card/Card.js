import React, { useContext, useState } from "react";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import { UserContext } from "../../context/userContext";
import { Button } from "react-bootstrap";
import Swal from "sweetalert2";
import DeleteArticle from "../fitur/DeleteArticle";
import EditArticle from "../fitur/EditArticle";

const Cards = () => {
  const Navigate = useNavigate();

  let { data: article } = useQuery("article", async () => {
    const response = await API.get("/article");
    return response.data.data;
  });

  const [state, dispatch] = useContext(UserContext);

  const edits = (e) => {
    e.preventDefault();

    Swal.fire({
      position: "center",
      icon: "warning",
      title: "Cooming Soon",
      showConfirmButton: false,
      timer: 5000,
    });
  };

  console.log(article);

  return (
    <>
      <Container>
        <h1
          style={{ color: "#FF6185", fontSize: "48px" }}
          className="d-flex justify-content-center mt-5 mb-5 fw-bold"
        >
          Artikel Hari ini
        </h1>
        <div className="container-card">
          {article?.map((data) => (
            <Card style={{ width: "18rem" }}>
              <Card.Img
                onClick={() => Navigate(`/detail/${data?.id}`)}
                // variant="top"
                style={{ height: "200px" }}
                className="rounded-2"
                src={data?.image}
              />
              <Card.Body>
                <div style={{ height: "80%" }}>
                  <Card.Title className="fw-bold">
                    {data?.title.slice(0, 30) + data?.title.slice(0, 30) <
                    data?.title.slice(0, 31)
                      ? data?.title.slice(0, 30) + "..."
                      : data?.title.slice(0, 30)}
                  </Card.Title>
                  <Card.Text className="mt-1">
                    {data?.description.slice(0, 80) <
                    data?.description.slice(0, 81)
                      ? data?.description.slice(0, 80) + "..."
                      : data?.description.slice(0, 80)}
                  </Card.Text>
                </div>

                {state?.user.role === "Doctor" && (
                  <div
                    // style={{ backgroundColor: "blue" }}
                    className="d-flex justify-content-between mt-2"
                  >
                    {/* <Button
                      className="border-0 fw-bold"
                      style={{ width: "48%", backgroundColor: "#FF6185" }}
                      onClick={edits}
                    >
                      Edit
                    </Button> */}
                    <EditArticle
                      id={data?.id}
                      title={data?.title}
                      description={data?.description}
                      image={data?.image}
                    />
                    {/* <Button
                      className="border-0 fw-bold"
                      style={{ width: "48%", backgroundColor: "#FF6185" }}
                      onClick={async (e) => {
                        try {
                          e.preventDefault();

                          await API.delete(`/article/${data?.id}`);
                          Navigate("/");
                        } catch (error) {
                          console.log(error);
                        }
                      }}
                    >
                      Delete
                    </Button> */}
                    <DeleteArticle id={data?.id} />
                  </div>
                )}

                {/* <div className="d-flex">
                  <p
                    style={{ color: "#BFBFBF" }}
                    className="p-2 border rounded-3 d-flex justify-content-center"
                  >
                    Testing
                  </p>
                </div> */}
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
};

export default Cards;
