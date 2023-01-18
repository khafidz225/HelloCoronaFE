import moment from "moment";
import React, { useContext, useEffect, useState } from "react";
import { Container, Table } from "react-bootstrap";
import { useQuery } from "react-query";
import ModalInfo from "../components/approve/ModalInfo";
import Navbars from "../components/Navbar";
import { API } from "../config/api";
import { UserContext } from "../context/userContext";

const ReservasiData = () => {
  const [modalShow, setModalShow] = useState(false);
  const [datas, setDatas] = useState();
  const [indexs, setIndexs] = useState();
  const [number, setNumber] = useState();

  let { data: reservasiData } = useQuery("reservasiDataCache", async () => {
    const response = await API.get("/consultations");
    return response.data.data;
  });

  const [state, dispatch] = useContext(UserContext);

  return (
    <>
      <Navbars />
      <ModalInfo
        show={modalShow}
        datas={datas}
        indexs={indexs}
        onHide={() => setModalShow(false)}
      />
      <Container className="mb-5">
        <h1 style={{ color: "#FF6185" }} className="fw-bold mt-5">
          Reservasi Data
        </h1>

        <Table striped style={{ backgroundColor: "white" }}>
          <thead>
            <th className="p-3">No</th>
            <th className="p-3">Users</th>
            <th className="p-3">Subject</th>
            <th className="p-3">Date of complaint</th>
            <th className="p-3">Status</th>
            <th className="p-3">Action</th>
          </thead>
          {reservasiData?.map(
            (data, index) =>
              data?.selectdoctor === state?.user.fullname && (
                <tbody key={data.id}>
                  <tr>
                    {/* {data(
                      (datase, i) =>
                        datase?.length == 
                    )} */}
                    {/* {for (let i = 0; i < reservasiData?.length ; i++){
                      
                    }} */}

                    <td className="p-3">{index + 1}</td>
                    <td className="p-3">{data?.fullname}</td>
                    <td className="p-3">{data?.subject}</td>
                    <td className="p-3">
                      {moment(data?.CreatedAt).format("DD MMM YYYY")}
                    </td>
                    {data?.status === "Waiting Approve Consultation Live" ? (
                      <td className="p-3 text-warning">{data?.status}</td>
                    ) : data?.status === "Waiting Live Consultation" ? (
                      <td className="p-3 text-success">{data?.status}</td>
                    ) : (
                      <td className="p-3 text-danger">{data?.status}</td>
                    )}
                    <td className="p-3">
                      <img
                        onClick={() => {
                          setModalShow(true);
                          setDatas(data);
                          setIndexs(index);
                        }}
                        style={{ cursor: "pointer" }}
                        src={require("../images/reservasiData/searchAdmin.png")}
                        alt=""
                      />
                    </td>
                  </tr>
                </tbody>
              )
          )}
        </Table>
      </Container>
    </>
  );
};

export default ReservasiData;
