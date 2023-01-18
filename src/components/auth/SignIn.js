/* eslint-disable jsx-a11y/anchor-is-valid */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import { UserContext } from "../../context/userContext";
import { useMutation } from "react-query";
import { API } from "../../config/api";
import Swal from "sweetalert2";

const SignIn = () => {
  const [show, setShow] = useState(false);
  const handleCloseIn = () => setShow(false);
  const handleShowIn = () => setShow(true);

  const [state, dispatch] = useContext(UserContext);

  const [Login, setLogin] = useState({});
  const onChangeSignIn = (e) => {
    setLogin({
      ...Login,
      [e.target.name]: e.target.value,
    });
  };

  const submit = useMutation(async (e) => {
    try {
      e.preventDefault();

      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };

      const body = JSON.stringify(Login);

      const response = await API.post("/login", body, config);

      // Swal.fire({
      //   position: "center",
      //   icon: "success",
      //   title: "Successful Login",
      //   showConfirmButton: false,
      //   timer: 5000,
      // });
      if (response?.status === 200) {
        dispatch({
          type: "LOGIN_SUCCESS",
          payload: response.data.data,
        });
      }
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully Login",
        showConfirmButton: false,
        timer: 5000,
      });
    } catch (error) {
      console.log(error);
      alert("gagal");
    }
  });

  return (
    <>
      <Button
        onClick={handleShowIn}
        variant="outline-light"
        className="button-signin"
      >
        SignIn
      </Button>
      <Modal className="mt-5" show={show} onHide={handleCloseIn}>
        <Modal.Title
          style={{ marginTop: "20px" }}
          className="text-center fw-bold"
        >
          Login
        </Modal.Title>
        <Modal.Body>
          <Form onSubmit={(e) => submit.mutate(e)}>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label className="fw-bold mt-3">Email</Form.Label>
              <Form.Control
                name="email"
                onChange={onChangeSignIn}
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
                type="password"
                onChange={onChangeSignIn}
                placeholder="Password"
              />
            </Form.Group>
            <Button
              className="mt-4 m-auto"
              style={{
                backgroundColor: "#FF6185",
                border: "none",
                width: "100%",
              }}
              variant="primary"
              type="submit"
            >
              Login
            </Button>
          </Form>
        </Modal.Body>
        {/* <p className="text-center p-1 mt-1" style={{ color: "#B1B1B1" }}>
          Don't have an account?
          <a
            className="text-decoration-none"
            style={{ color: "#B1B1B1" }}
            href="#"
          >
            Klik Here
          </a>
        </p> */}
      </Modal>
    </>
  );
};

export default SignIn;
