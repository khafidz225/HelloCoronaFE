import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/esm/Button";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import { useMutation, useQuery } from "react-query";
import Swal from "sweetalert2";
import Navbars from "../components/Navbar";
import { API } from "../config/api";

const Reservasi = () => {
  const [Reservasi, SetRevervasi] = useState();

  const onChangeReservasi = (e) => {
    SetRevervasi({
      ...Reservasi,
      [e.target.name]: e.target.value,
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
      formData.set("fullname", Reservasi.fullname);
      formData.set("phone", Reservasi.phone);
      formData.set("borndate", Reservasi.borndate);
      formData.set("age", Reservasi.age);
      formData.set("height", Reservasi.height);
      formData.set("weight", Reservasi.weight);
      formData.set("gender", Reservasi.gender);
      formData.set("subject", Reservasi.subject);
      formData.set("selectdoctor", Reservasi.selectdoctor);
      formData.set("dateconsul", Reservasi.dateconsul);
      formData.set("description", Reservasi.description);

      const response = await API.post("/consultations", formData, config);

      Swal.fire({
        position: "center",
        icon: "success",
        title: "Successfully Added the Consultation",
        showConfirmButton: false,
        timer: 5000,
      });
    } catch (error) {
      console.log(error);
      Swal.fire({
        position: "center",
        icon: "error",
        title: "Failed to Add Consultation",
        showConfirmButton: false,
        timer: 5000,
      });
    }
  });

  let { data: dataDoctor } = useQuery("dataDoctorCache", async () => {
    const response = await API.get("/users");
    return response.data.data;
  });

  return (
    <>
      <Navbars />
      <Container className="">
        <h1 style={{ color: "#FF6185" }} className="fw-bold mt-5">
          Reservasi Consultation
        </h1>
        <Form className="mt-5 fs-5 fw-bold" onSubmit={(e) => submit.mutate(e)}>
          <Form.Group className="mt-3">
            <Form.Label>Full Name</Form.Label>
            <Form.Control
              //   style={{ backgroundColor: "#B1B1B1" }}
              onChange={onChangeReservasi}
              name="fullname"
              type="text"
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              onChange={onChangeReservasi}
              name="phone"
              type="number"
            />
          </Form.Group>

          <Form.Group className="mt-3 d-flex justify-content-between">
            <div style={{ width: "500px" }}>
              <Form.Label>Born Date</Form.Label>
              <Form.Control
                onChange={onChangeReservasi}
                name="borndate"
                type="date"
              />
            </div>
            <div>
              <Form.Label>Age</Form.Label>
              <Form.Control
                onChange={onChangeReservasi}
                name="age"
                type="number"
              />
            </div>
            <div>
              <Form.Label>Height</Form.Label>
              <Form.Control
                onChange={onChangeReservasi}
                name="height"
                type="number"
              />
            </div>
            <div>
              <Form.Label>Weight</Form.Label>
              <Form.Control
                onChange={onChangeReservasi}
                name="weight"
                type="number"
              />
            </div>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Gender</Form.Label>
            <Form.Select name="gender" onChange={onChangeReservasi}>
              <option>Male</option>
              <option>Female</option>
            </Form.Select>
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Subject</Form.Label>
            <Form.Control
              onChange={onChangeReservasi}
              name="subject"
              type="text"
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Select Doctor</Form.Label>
            <Form.Select name="selectdoctor" onChange={onChangeReservasi}>
              {dataDoctor?.map(
                (data) =>
                  data?.role === "Doctor" && <option>{data?.fullname}</option>
              )}
            </Form.Select>
          </Form.Group>
          {/* <Form.Group className="mt-3">
            <Form.Label>Select Doctor</Form.Label>
            <Form.Select
              name="selectdoctor"
              onChange={onChangeReservasi}
            ></Form.Select>
          </Form.Group> */}

          {/* {dataDoctor?.map((data) => {
            data?.role === "Doctor" && <p>{data?.fullname}</p>;
          })} */}

          <Form.Group className="mt-3">
            <Form.Label>Live Consultation Date</Form.Label>
            <Form.Control
              onChange={onChangeReservasi}
              name="dateconsul"
              type="date"
            />
          </Form.Group>

          <Form.Group className="mt-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              onChange={onChangeReservasi}
              name="description"
              as="textarea"
              style={{ height: "100px" }}
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

export default Reservasi;
