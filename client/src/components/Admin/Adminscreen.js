import "./Adminscreen.css";
import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { Outlet } from "react-router-dom";
import axios from "axios";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";

const Adminscreen = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  useEffect(() => {
    const callAdminScreen = async () => {
      try {
        const res = await axios.get("/api/v1/admin");
        if (res.data.rootUser.userRole !== "admin") {
          navigate("/");
        }
      } catch (error) {
        alert.info(error.response.data.message);
        navigate("/");
      }
    };
    callAdminScreen();
  }, []);
  return (
    <>
      <section id="App">
        <Sidebar pageWrapId={"page-wrap"} outerContainerId={"App"} />
        <Container id="page-wrap">
          <Row>
            <Col md={12}>
              <h1 className="admin_heading text-center my-5">Admin Panel</h1>
            </Col>
          </Row>
          <Row>
            <Col md={12}>
              <div className="admincontent">
                <Outlet />
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Adminscreen;
