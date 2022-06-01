import React, { useContext } from "react";
import { NavbarContext } from "../../../GlobalStates/Context";
import { Container, Row, Col } from "react-bootstrap";
import "./Profile.css";
import { Link } from "react-router-dom";
const Profile = () => {
  const { navbarstate, setNavbarState } = useContext(NavbarContext);

  return (
    <>
      <section>
        <Container>
          <Row className="my-5">
            <h1 className="profileHeading">My Profile</h1>
            <Col md={10} sm={10} className="mx-auto profileContainer">
              <Col md={6} sm={12} className="profileInfoContainer">
                <div className="profileInfo">
                  <h3>Name</h3>
                  <p>{navbarstate.user.name}</p>
                  <h3>Email</h3>
                  <p>{navbarstate.user.email}</p>
                  <h3>Joined at</h3>
                  <p>
                    {new Date(
                      navbarstate.user.createdAt
                    ).toLocaleDateString()}
                  </p>
                  <button className="whiteButton">
                    <Link to="/order/myorders">My Orders</Link>
                  </button>
                  <button className="whiteButton">
                    <Link to="/password/update">Change Password</Link>
                  </button>
                </div>
              </Col>
              <Col md={6} sm={12} className="profileImageContainer">
                <div className="profileImage">
                  <img src={navbarstate.user.avatar.url} alt="User" />
                  <button>
                    <Link to="/userprofile/update">Edit Profile</Link>
                  </button>
                </div>
              </Col>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Profile;
