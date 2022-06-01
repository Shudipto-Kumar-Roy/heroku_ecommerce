import React, { useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./LoginSignup.css";
import { useAlert } from "react-alert";
import { useNavigate, useParams } from "react-router-dom";
import { resetPasswordFormValidation } from "../formvalidation/validateform";
import { createResetPasswordApi } from "../../api";

const ResetPassword = () => {
  const alert = useAlert();
  const { token } = useParams();
  const navigate = useNavigate();
  const [state, setState] = useState({
    password: "",
    confirmPassword: "",
  });

  const handleInput = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    const isValid = resetPasswordFormValidation(state,alert);
    if (isValid) {
      const res = await createResetPasswordApi(state, token, alert); // api call

      if (res.status === 200) {
        alert.success("Password reset successfully");
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
                <h2>Reset Password</h2>
              </div>
              <form action="" onSubmit={handleSubmit}>
                <div className="formgroup">
                  <input
                    type="password"
                    name="password"
                    value={state.password}
                    onChange={handleInput}
                    className="formcontroller"
                    placeholder="New Password"
                  />
                </div>
                <div className="formgroup">
                  <input
                    type="password"
                    name="confirmPassword"
                    value={state.confirmPassword}
                    onChange={handleInput}
                    className="formcontroller"
                    placeholder="Confirm Password"
                  />
                </div>

                <div className="formgroup">
                  <button type="submit" className="custombutton">
                    Reset Password
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

export default ResetPassword;
