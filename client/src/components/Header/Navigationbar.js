import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import {
  Navbar,
  NavDropdown,
  Container,
  Nav,
  Form,
  Button,
} from "react-bootstrap";
import { AiOutlineSearch, AiOutlineShoppingCart } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { logoutApi, navbarChangeApi } from "../../api";
import {
  CartItemCountContext,
  NavbarContext,
} from "../../GlobalStates/Context";
import "./Navigationbar.css";
const Navigationbar = () => {
  const { navbarstate, setNavbarState } = useContext(NavbarContext);
  const { cartitem, setCartItem } = useContext(CartItemCountContext);

  useEffect(() => {
    setCartItem(JSON.parse(localStorage.getItem("cartItemsCount")));
  }, []);

  const alert = useAlert();
  const navigate = useNavigate();
  const handleLogout = async () => {
    const res = await logoutApi(alert);
    if (res.status === 200) {
      alert.success("Logged Out");
      setNavbarState({ ...navbarstate, login: false });
      navigate("/");
    }
  };

  useEffect(() => {
    const callNavbar = async () => {
      const res = await navbarChangeApi(alert);
      if (res.status === 200) {
        setNavbarState({
          ...navbarstate,
          login: true,
          user: res.data.rootUser,
          isAuthenticated: res.data.isAuthenticated,
        });
      }
    };
    callNavbar();
  }, [navbarstate.login, cartitem]);

  const [keyword, setKeyword] = useState();
  const handleSearch = (event) => {
    event.preventDefault();
    if (keyword.trim()) {
      navigate(`/products/${keyword}`);
    } else if (keyword === "") {
      navigate(`/products`);
    }
  };
  return (
    <>
      <header>
        <Navbar variant="dark" expand="lg" className="mainnavbar">
          <Container className="navbarcontainer">
            <Navbar.Brand as={Link} to={"/"} className="navbarlogo">
              <h2>ECOMMERCE</h2>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="navbarScroll" />
            <Navbar.Collapse id="navbarScroll" className="navbarcollapse">
              <Nav
                className=" ms-auto my-lg-0"
                style={{ maxHeight: "100px" }}
                navbarScroll
              >
                <Form className="d-flex">
                  <div className="navbarsearchgroup">
                    <input
                      type="text"
                      placeholder="Search your products, brands and more..."
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      className="me-2 navbarsearch"
                    />
                    <AiOutlineSearch
                      className="navbarsearchicon"
                      style={{ cursor: "pointer" }}
                      onClick={handleSearch}
                    />
                  </div>
                </Form>
                <Link to={"/aboutus"} className="nav_link">About Us</Link>
                <Link to={"/contactus"} className="nav_link">Contact Us</Link>
                <NavDropdown
                  title="More"
                  id="navbarScrollingDropdown"
                  className="dropdownlink"
                >
                  <NavDropdown.Item
                    as={Link}
                    to="/products"
                    className="dropdownlinkitem"
                  >
                    Products
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item
                    as={Link}
                    to="/admin"
                    className="dropdownlinkitem"
                  >
                    Admin
                  </NavDropdown.Item>
                </NavDropdown>
                {navbarstate.login ? (
                  <>

                    <Link to="/userprofile" className="customImage">
                      <img
                        src={navbarstate.user.avatar.url}
                        alt="User"
                        className="userImage"
                      />
                    </Link>

                    <button onClick={handleLogout} className="custombutton">
                      Logout
                    </button>
                  </>
                ) : (
                  <Link to="/loginsignup" className="custombutton">
                    Login
                  </Link>
                )}
                <div className="carticonbox">
                  <Link to="/cart" className="">
                    <AiOutlineShoppingCart className="carticon" />
                    <span className="badges">{cartitem}</span>
                  </Link>
                </div>
              </Nav>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Navigationbar;
