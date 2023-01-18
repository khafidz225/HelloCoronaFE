import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { Container, Form } from "react-bootstrap";
import { useQuery } from "react-query";
import { API } from "../../config/api";
import moment from "moment";
import { UserContext } from "../../context/userContext";

const ModalInfo = (props) => {
  const [modalInfo, setModalInfo] = useState();
  const [consultan, setConsultan] = useState();

  const [state, dispatch] = useContext(UserContext);

  const approve = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.set("reply", modalInfo);
      formData.set("status", "Waiting Live Consultation");
      formData.set("doctor", state?.user.fullname);

      const response = await API.patch(
        `/consultations/${props.datas.id}`,
        formData
      );

      alert("berhasil");
    } catch (error) {
      alert("gagal");
      console.log(error);
    }
  };

  const canced = async (e) => {
    try {
      e.preventDefault();

      const formData = new FormData();

      formData.set("reply", modalInfo);
      formData.set("status", "Canced");
      formData.set("doctor", state?.user.fullname);

      const response = await API.patch(
        `/consultations/${props.datas.id}`,
        formData
      );

      alert("Berhasil");
    } catch (error) {
      console.log(error);
      alert("gagal");
    }
  };

  const consul = async (e) => {
    try {
      const response = await API.get(`/consultations/${props?.datas?.id}`);

      setConsultan(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    consul();
  }, [props]);

  return (
    <>
      <Modal
        {...props}
        size="xl"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Body>
          <Container
            className="border border-0 rounded-1 p-5"
            style={{ backgroundColor: "white" }}
          >
            <div className="d-flex justify-content-between">
              {/* Title && Country */}
              <div className="text-start">
                <h2 className="fw-bold fs-3">{props.datas?.subject}</h2>
                <p className="mt-4">{props.datas?.description}</p>
              </div>

              {/* image payment */}
              <div className="me-3">
                <div>
                  <h3 style={{ fontSize: "18px" }} className="fw-bold">
                    Date of complaint
                  </h3>
                  <p style={{ fontSize: "14px", color: "#6C6C6C" }}>
                    {moment(props.datas?.CreatedAt).format("DD MMM YYYY")}
                  </p>
                </div>
                <div>
                  {props.datas?.dateconsul == "0001-01-01T00:00:00Z" ? (
                    <div></div>
                  ) : (
                    <div>
                      <h3 style={{ fontSize: "18px" }} className="fw-bold">
                        Live Consultation
                      </h3>
                      <p style={{ fontSize: "14px", color: "#6C6C6C" }}>
                        {moment(props.datas?.dateconsul).format("DD MMM YYYY")}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <table className="table">
              <thead>
                <tr>
                  <th scope="col">No</th>
                  <th scope="col">Full Name</th>
                  <th scope="col">Gender</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Age</th>
                  <th scope="col">Height</th>
                  <th scope="col">Weight</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: "18px", color: "#B1B1B1" }}>
                <tr>
                  <th>1</th>
                  <td>{props.datas?.user.fullname}</td>
                  <td>{props.datas?.user.gender}</td>
                  <td>{props.datas?.user.phone}</td>
                  <td>{props.datas?.age}</td>
                  <td>{props.datas?.height}</td>
                  <td>{props.datas?.weight}</td>
                </tr>
              </tbody>
            </table>

            {/* Give Response */}
            <Form>
              <Form.Group>
                <Form.Label className="fw-bold fs-5 mt-3">
                  Give Response
                </Form.Label>
                {consultan?.reply !== "" ? (
                  <p>{consultan?.reply}</p>
                ) : (
                  <Form.Control
                    name="reply"
                    as="textarea"
                    onChange={(e) => setModalInfo(e.target.value)}
                    style={{ height: "115px" }}
                  />
                )}
              </Form.Group>
              {props.datas?.status === "Waiting Approve Consultation Live" ? (
                <div className="d-flex justify-content-end mt-4">
                  <button
                    className="fw-bold fs-6 text-white p-2 border-0 rounded-2 me-3"
                    style={{ backgroundColor: "#FF0742", width: "100px" }}
                    onClick={canced}
                  >
                    Cancel
                  </button>
                  <button
                    className="fw-bold fs-6 text-white p-2 border-0 rounded-2 me-3"
                    style={{ backgroundColor: "#0ACF83", width: "100px" }}
                    onClick={approve}
                  >
                    Approve
                  </button>
                </div>
              ) : (
                <div></div>
              )}
            </Form>
          </Container>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalInfo;
