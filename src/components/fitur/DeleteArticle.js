/* eslint-disable no-obj-calls */
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { API } from "../../config/api";

const DeleteArticle = (props) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const Navigate = useNavigate();

  return (
    <>
      <Button
        className="border-0 fw-bold"
        style={{ width: "48%", backgroundColor: "#FF6185" }}
        onClick={handleShow}
      >
        Delete
      </Button>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        className="m-auto"
      >
        <img
          style={{ width: "100px" }}
          className="m-auto mt-3"
          src={require("../../images/reservasiData/warning.png")}
          alt="warning"
        />
        <Modal.Body>
          <p className="text-center mt-4">
            Apakah Anda ingin Menghapus Article Ini
          </p>
        </Modal.Body>

        <div className="d-flex justify-content-end mt-4 mb-3">
          <Button
            className="border-0 fw-bold me-3"
            style={{ width: "100px", backgroundColor: "#FF6185" }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            className="border-0 fw-bold me-3"
            style={{ width: "100px", backgroundColor: "#FF6185" }}
            onClick={async (e) => {
              try {
                e.preventDefault();
                await API.delete(`/article/${props.id}`);
                setShow(false);
                Swal.fire({
                  position: "center",
                  icon: "success",
                  title: "Successfully Delete",
                  showConfirmButton: false,
                  timer: 1500,
                });
                Reflect();
              } catch (error) {
                console.log(error);
                // alert("gagal");
              }
            }}
          >
            Delete
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default DeleteArticle;
