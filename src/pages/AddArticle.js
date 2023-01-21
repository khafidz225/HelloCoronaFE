import React, { useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useMutation } from "react-query";
import Navbars from "../components/Navbar";
import { API } from "../config/api";
import Swal from "sweetalert2";

const AddArticle = () => {
  const [AddArticle, SetAddArticle] = useState();

  const onChangeArticle = (e) => {
    SetAddArticle({
      ...AddArticle,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const submit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      const formData = new FormData();
      formData.set("title", AddArticle.title);
      formData.set("image", AddArticle.image[0], AddArticle.image[0].name);
      formData.set("description", AddArticle.description);

      const response = await API.post("/articles", formData, config);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully Added the Article",
        showConfirmButton: false,
        timer: 5000,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to Add Article",
        showConfirmButton: false,
        timer: 5000,
      });
    }
  });

  return (
    <>
      <Navbars />
      <Container className="mb-5">
        <h1 style={{ color: "#FF6185" }} className="fw-bold mt-5">
          Add Article
        </h1>
        <Form className="fw-bold fs-5 mt-5" onSubmit={(e) => submit.mutate(e)}>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control onChange={onChangeArticle} name="title" type="text" />
          </Form.Group>
          {/* <Form.Control
            id="image"
            name="image"
            style={{ width: "400px" }}
            type="file"
          /> */}
          <Form.Group className="mt-3">
            <Form.Control
              id="upload"
              onChange={onChangeArticle}
              name="image"
              type="file"
              style={{ width: "90px" }}
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              name="description"
              onChange={onChangeArticle}
              as="textarea"
              style={{ height: "350px" }}
            />
          </Form.Group>

          <div className="text-center mt-5">
            <Button
              style={{
                backgroundColor: "#FF6185",
                width: "250px",
                border: "none",
              }}
              className="p-2 fw-bold fs-5"
              variant="primary"
              type="submit"
            >
              Send
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddArticle;
