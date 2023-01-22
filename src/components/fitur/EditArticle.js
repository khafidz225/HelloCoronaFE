import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Swal from "sweetalert2";
import { API } from "../../config/api";

const EditArticle = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [person, setPerson] = useState({
    title: props?.title,
    image: props?.image,
    description: props?.description,
  });

  const handleTitleChange = (e) => {
    setPerson({ ...person, title: e.target.value });
  };

  const handleDescriptionChange = (e) => {
    setPerson({ ...person, description: e.target.value });
  };

  const edit = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("title", person?.title);
      formData.set("description", person?.description);

      const response = await API.patch(`/article/${props.id}`, formData);
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully Edit Article",
        showConfirmButton: false,
        timer: 1500,
      });
    } catch (error) {
      console.log(error);
      alert("gagal");
    }
  };

  return (
    <>
      <Button
        className="border-0 fw-bold"
        style={{ width: "48%", backgroundColor: "#FF6185" }}
        onClick={handleShow}
      >
        Edit
      </Button>

      <Modal show={show} onHide={handleClose}>
        <h1 className="m-auto mt-4 fw-bold" style={{ color: "#FF6185" }}>
          Edit Article
        </h1>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                onChange={handleTitleChange}
                type="text"
                name="title"
                value={person?.title}
                autoFocus
              />
            </Form.Group>

            {/* <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title</Form.Label>
              <Form.Control
                // onChange={handleImageChange}
                type="file"
                name="image"
                // value={person?.image}
                // autoFocus
              />
            </Form.Group> */}

            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                onChange={handleDescriptionChange}
                as="textarea"
                value={person?.description}
                // placeholder={props?.description}
                rows={3}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="border-0 fw-bold"
            style={{ width: "100px", backgroundColor: "#FF6185" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="border-0 fw-bold"
            style={{ width: "100px", backgroundColor: "#FF6185" }}
            onClick={edit}
          >
            Save Edit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default EditArticle;
