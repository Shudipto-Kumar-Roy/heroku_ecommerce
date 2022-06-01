import "./Banner.css";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import bg1 from "../../../images/bg1.jpg";
import bg2 from "../../../images/bg2.jpg";
import bg3 from "../../../images/bg3.jpg";
import Slider from "react-carousel-responsive";
import "react-carousel-responsive/dist/styles.css";

const Banner = () => {
  return (
    <>
      <section id="section_id">
        <Container fluid>
          <Row>
            <Col md={12}>
              <Slider autoplay={true} autoplaySpeed={3000}>
                <img
                  className="caresoulimage"
                  src={bg1}
                  alt="BG1"
                />
                <img
                  className="caresoulimage"
                  src={bg2}
                  alt="BG2"
                />
                <img
                  className="caresoulimage"
                  src={bg3}
                  alt="BG3"
                />
              </Slider>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Banner;
