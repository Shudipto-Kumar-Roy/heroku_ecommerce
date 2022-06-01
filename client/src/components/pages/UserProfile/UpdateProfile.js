import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "../../Authentication/LoginSignup.css";
import { useAlert } from "react-alert";
import { Link, useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { NavbarContext } from "../../../GlobalStates/Context";
import { updateProfileValidation } from "../../formvalidation/validateform";
import { updateUserProfileApi } from "../../../api";

const UpdateProfile = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const { navbarstate, setNavbarState } = useContext(NavbarContext);
  const [profilestate, setProfileState] = useState({
    name: "",
    email: "",
    avatar : ""
  });
  const [avatarImage, setAvatarImage] = useState("");
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleUpdate = async (event) => {
    event.preventDefault();
    profilestate.avatar = avatarImage;
    const isValid = updateProfileValidation(profilestate, avatarImage, alert);
    if (isValid) {
      const res = await updateUserProfileApi(profilestate, alert); // api call
      if (res.status === 200) {
        alert.success("User Updated Successfully");
        navigate("/");
      }
    }
  };
  const handleProfileInput = (event) => {
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
      setProfileState({
        ...profilestate,
        [event.target.name]: event.target.value,
      });
    }
  };

  useEffect(() => {
    setProfileState({
      ...profilestate,
      name: navbarstate.user.name,
      email: navbarstate.user.email,
    });
    setAvatarPreview(navbarstate.user.avatar.url);
  }, []);
  return (
    <>
      <Container className="loginsignup_container">
        <Row>
          <Col md={12} className="mx-auto">
            <div className="loginsignup_formcontainer">
              <div className="formtogglegroup">
                <button className={`toggleborder`}>Update Profile</button>
              </div>
              <form action="" onSubmit={handleUpdate}>
                <div className="formgroup">
                  <input
                    type="text"
                    name="name"
                    value={profilestate.name}
                    onChange={handleProfileInput}
                    className="formcontroller"
                    placeholder="Name"
                  />
                </div>
                <div className="formgroup">
                  <input
                    type="email"
                    name="email"
                    value={profilestate.email}
                    onChange={handleProfileInput}
                    className="formcontroller"
                    placeholder="Email"
                  />
                </div>
                <div className="formgroup profile_image_upload">
                  <label htmlFor="avatar_file_id">Choose Profile Image</label>
                  <input
                    id="avatar_file_id"
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={handleProfileInput}
                  />
                  <span>
                    {avatarPreview  ? (
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

export default UpdateProfile;
