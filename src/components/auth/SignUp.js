import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import React, { useState } from "react";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { API } from "../../config/api";
import Swal from "sweetalert2";

const SignUp = () => {
  const [show, setShow] = useState(false);
  const handleCloseUp = () => setShow(false);
  const handleShowUp = () => setShow(true);
  const [signUp, setSignUp] = useState({});

  const Navigate = useNavigate();

  const onChangeSignUp = (e) => {
    setSignUp({ ...signUp, [e.target.name]: e.target.value });
  };

  const submit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(signUp);

      const response = await API.post("/register", body, config);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully Register",
        showConfirmButton: false,
        timer: 1500,
      });
      Navigate("/");
    } catch (error) {
      alert("gagal Cuk");
    }
  });

  return (
    <>
      <Button
        onClick={handleShowUp}
        className="btn-log"
        style={{
          borderColor: "#FF6185",
          backgroundColor: "#FF6185",
          width: "100px",
          border: "none",
        }}
      >
        SignUp
      </Button>
      <Modal show={show} onHide={handleCloseUp}>
        <Modal.Title
          style={{ marginTop: "20px" }}
          className="text-center fw-bold"
        >
          SignUp
        </Modal.Title>
        <Modal.Body>
          <Form onSubmit={(e) => submit.mutate(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold mt-3">Full Name</Form.Label>
              <Form.Control
                name="fullName"
                onChange={onChangeSignUp}
                type="text"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold mt-3">Email</Form.Label>
              <Form.Control
                name="email"
                onChange={onChangeSignUp}
                type="email"
                autoFocus
              />
            </Form.Group>
            <Form.Group
              className="mb-3"
              controlId="exampleForm.ControlTextarea1"
            >
              <Form.Label className="fw-bold mt-3">Password</Form.Label>
              <Form.Control
                name="password"
                onChange={onChangeSignUp}
                type="password"
                placeholder="Password"
              />
            </Form.Group>
            <Form.Group className="mt-3 fw-bold">
              <Form.Label>Gender</Form.Label>
              <Form.Select name="gender" onChange={onChangeSignUp}>
                <option></option>
                <option>Male</option>
                <option>Female</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold mt-3">Phone</Form.Label>
              <Form.Control
                name="phone"
                onChange={onChangeSignUp}
                type="number"
                autoFocus
              />
            </Form.Group>
            <Form.Group>
              <Form.Label className="fw-bold mt-3">Address</Form.Label>
              <Form.Control
                name="address"
                onChange={onChangeSignUp}
                as="textarea"
                style={{ height: "50px" }}
              />
            </Form.Group>
            <Button
              className="mt-4 m-auto"
              style={{
                backgroundColor: "#FF6185",
                border: "none",
                width: "100%",
              }}
              type="submit"
            >
              SignUp
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default SignUp;
