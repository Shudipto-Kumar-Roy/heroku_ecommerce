import React, {useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../Authentication/LoginSignup.css";
import { useAlert } from "react-alert";
import { useNavigate } from "react-router-dom";
import { updatePasswordValidation } from "../../formvalidation/validateform";
import { updatePasswordApi } from "../../../api";

const UpdateUserPassword = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [state, setState] = useState({
    oldpassword: "",
    newpassword: "",
    confirmpassword: "",
  });

  const handleUpdate = async (event) => {
    event.preventDefault();

    const isValid = updatePasswordValidation(state, alert);
    if (isValid) {
      const res = await updatePasswordApi(state, alert); // api call
      if (res.status === 200) {
        alert.success("Password Updated Successfully");
        navigate("/");
      }
    }
  };
  const handleInput = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <>
      <Container className="main_container">
        <Row>
          <Col md={12} className="mx-auto">
            <div className="formcontainer">
              <div className="formtogglegroup">
                <button className={`toggleborder`}>Update Password</button>
              </div>
              <form action="" onSubmit={handleUpdate}>
                <div className="formgroup">
                  <input
                    type="password"
                    name="oldpassword"
                    value={state.oldpassword}
                    onChange={handleInput}
                    className="formcontroller"
                    placeholder="Old Password"
                  />
                </div>
                <div className="formgroup">
                  <input
                    type="password"
                    name="newpassword"
                    value={state.newpassword}
                    onChange={handleInput}
                    className="formcontroller"
                    placeholder="New Password"
                  />
                </div>
                <div className="formgroup">
                  <input
                    type="password"
                    name="confirmpassword"
                    value={state.confirmpassword}
                    onChange={handleInput}
                    className="formcontroller"
                    placeholder="Confirm Password"
                  />
                </div>
                <div className="formgroup">
                  <button type="submit" className="whiteButton">
                    Update
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

export default UpdateUserPassword;
