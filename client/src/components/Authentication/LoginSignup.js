import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { createLoginApi, createSignUpApi } from "../../api";
import "./LoginSignup.css";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import {
  createLoginValidation,
  createSignupValidation,
} from "../formvalidation/validateform";
import { NavbarContext } from "../../GlobalStates/Context";

const LoginSignup = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const { navbarstate, setNavbarState } = useContext(NavbarContext);
  const [toggleform, setToggleForm] = useState({
    login: true,
    signup: false,
  });
  const [loginstate, setLoginState] = useState({
    loginemail: "",
    loginpassword: "",
  });
  const [signupstate, setSignUpState] = useState({
    name: "",
    email: "",
    password: "",
    confirmpassword: "",
    avatar : ""
  });
  const [avatarImage, setAvatarImage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleSignup = async (event) => {
    event.preventDefault();
    signupstate.avatar = avatarImage;
    const isValid = createSignupValidation(signupstate, avatarImage, alert);
    if (isValid) {
      const res = await createSignUpApi(signupstate, alert); // api call
      if (res.status === 201) {
        alert.success("User Registered Successfully");
        navigate("/");
      }
    }
  };
  const handleLogin = async (event) => {
    event.preventDefault();
    const isValid = createLoginValidation(loginstate, alert);
    if (isValid) {
      const res = await createLoginApi(loginstate, alert); // api call
      if (res.status === 200) {
        setNavbarState({ ...navbarstate, login: true });
        alert.success("User login successfully");
        navigate("/");
      }
    }
  };
  const handleSingnupInput = (event) => {
    if (event.target.name === "avatar") {
      const reader = new FileReader();
      reader.readAsDataURL(event.target.files[0]);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatarImage(reader.result);
        }
      };
    } else {
      setSignUpState({
        ...signupstate,
        [event.target.name]: event.target.value,
      });
    }
  };
  const handleLoginInput = (event) => {
    setLoginState({ ...loginstate, [event.target.name]: event.target.value });
  };
  return (
    <>
      <Container className="loginsignup_container">
        <Row>
          <Col md={12} className="mx-auto">
            <div className="loginsignup_formcontainer">
              <div className="formtogglegroup">
                <button
                  className={toggleform.login && `toggleborder`}
                  onClick={() =>
                    setToggleForm({ ...toggleform, login: true, signup: false })
                  }
                >
                  Login
                </button>
                <button
                  className={toggleform.signup && `toggleborder`}
                  onClick={() =>
                    setToggleForm({ ...toggleform, signup: true, login: false })
                  }
                >
                  SignUp
                </button>
              </div>
              {toggleform.signup && (
                <form action="" onSubmit={handleSignup}>
                  <div className="formgroup">
                    <input
                      type="text"
                      name="name"
                      value={signupstate.name}
                      onChange={handleSingnupInput}
                      className="formcontroller"
                      placeholder="Name"
                    />
                  </div>
                  <div className="formgroup">
                    <input
                      type="email"
                      name="email"
                      value={signupstate.email}
                      onChange={handleSingnupInput}
                      className="formcontroller"
                      placeholder="Email"
                    />
                  </div>
                  <div className="formgroup">
                    <input
                      type="password"
                      name="password"
                      value={signupstate.password}
                      onChange={handleSingnupInput}
                      className="formcontroller"
                      placeholder="Password"
                    />
                  </div>
                  <div className="formgroup">
                    <input
                      type="password"
                      name="confirmpassword"
                      value={signupstate.confirmpassword}
                      onChange={handleSingnupInput}
                      className="formcontroller"
                      placeholder="Confirm Password"
                    />
                  </div>
                  <div className="formgroup profile_image_upload">
                    <label htmlFor="avatar_file_id">Choose Profile Image</label>
                    <input
                      id="avatar_file_id"
                      type="file"
                      name="avatar"
                      accept="image/*"
                      onChange={handleSingnupInput}
                    />
                    <span>
                      {avatarImage ? (
                        <img
                          src={avatarPreview}
                          alt="Avatar"
                          className="userPreviewImage"
                        />
                      ) : (
                        <FaUserCircle className="avatar_icon" />
                      )}
                    </span>
                  </div>
                  <div className="formgroup">
                    <button type="submit" className="custombutton">
                      SignUp
                    </button>
                  </div>
                </form>
              )}
              {toggleform.login && (
                <form action="" onSubmit={handleLogin}>
                  <div className="formgroup">
                    <input
                      type="email"
                      name="loginemail"
                      value={loginstate.loginemail}
                      onChange={handleLoginInput}
                      className="formcontroller"
                      placeholder="Email"
                    />
                  </div>
                  <div className="formgroup">
                    <input
                      type="password"
                      name="loginpassword"
                      value={loginstate.loginpassword}
                      onChange={handleLoginInput}
                      className="formcontroller"
                      placeholder="Password"
                    />
                  </div>

                  <div className="formgroup loginformbuttongroup">
                    <button type="submit" className="custombutton">
                      Login
                    </button>
                    <Link
                      to={"/password/forgot"}
                      className="forgotpasswordlink"
                    >
                      Forgot Password ?
                    </Link>
                  </div>
                </form>
              )}
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default LoginSignup;
