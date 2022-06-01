import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./LoginSignup.css";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { forgotPasswordApi } from "../../api";
import { forgotFormValidation } from "../formvalidation/validateform";

const ForgotPassword = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [email, setEmail] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = forgotFormValidation(email,alert);
    if (isValid) {
      const res = await forgotPasswordApi(email,alert); // api call
      if (res.status === 200) {
        alert.success(`Email sent to ${email} successfully`);
        navigate("/");
      }
    }
  };

  return (
    <>
      <Container className="loginsignup_container">
        <Row>
          <Col md={12} className="mx-auto">
            <div className="loginsignup_formcontainer">
              <div className="formgroup">
                <h2>Password Recovery</h2>
              </div>
              <form action="" onSubmit={handleSubmit}>
                <div className="formgroup">
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                    className="formcontroller"
                    placeholder="Enter email to reset password"
                  />
                </div>

                <div className="formgroup">
                  <button type="submit" className="custombutton">
                    Send Email
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default ForgotPassword;
