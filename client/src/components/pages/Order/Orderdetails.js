import React, { useContext, useEffect } from "react";
import {
  CartContext,
  NavbarContext,
  ShippingInfoContext,
} from "../../../GlobalStates/Context";
import { Container, Row, Col } from "react-bootstrap";
import "./Orderdetails.css";
import { Link, useNavigate } from "react-router-dom";
const Orderdetails = () => {
  const { navbarstate, setNavbarState } = useContext(NavbarContext);
  const { shippingInfo, setShippingInfo } = useContext(ShippingInfoContext);
  const { cartproduct, setCartProduct } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.getItem("shippingInfo") &&
      setShippingInfo(JSON.parse(localStorage.getItem("shippingInfo")));
    localStorage.getItem("cartItems") &&
      setCartProduct(JSON.parse(localStorage.getItem("cartItems")));
  }, []);

  const subtotal =
    cartproduct &&
    cartproduct.reduce(
      (acc, product) => acc + product.price * product.quantity,
      0
    );

  const shippingcost = subtotal > 1000 ? 50 : 100;
  const tax = subtotal * 0.15;
  const total = subtotal + shippingcost + tax;

  const handlePayment = () => {
    const data = {
      subtotal,
      shippingcost,
      tax,
      total,
    };
    sessionStorage.setItem("orderInfo", JSON.stringify(data));
    navigate("/process/payment");
  };
  return (
    <>
      <section>
        <Container>
          <Row className="my-5">
            <h1 className="orderdetailsHeading">Order Details</h1>
            <Col md={10} className="mx-auto orderdetailsContainer">
              <Col md={12} lg={6}>
                <div className="orderdetailsInfo">
                  <h3>Shipping Info</h3>
                  <p>Name : {navbarstate.user.name}</p>
                  <p>Phone : {shippingInfo.phoneNo}</p>
                  <p>
                    Address : {shippingInfo.address}, {shippingInfo.city},{" "}
                    {shippingInfo.state}, {shippingInfo.country}
                  </p>

                  <h3>Cart Items</h3>
                  <div className="order_details">
                    {cartproduct &&
                      cartproduct.map((product, index) => (
                        <div className="product_cart " key={product._id}>
                          <div className="product_cart_product">
                            <img
                              src="https://images.pexels.com/photos/821651/pexels-photo-821651.jpeg?auto=compress&cs=tinysrgb&h=750&w=1260"
                              alt="Show"
                            />
                            <div>
                              <p>Name : {product.name}</p>
                              <p>Price : {product.price} &#2547;</p>
                            </div>
                          </div>
                          <p>
                            {product.price} X {product.quantity} ={" "}
                            {product.price * product.quantity}&#2547;{" "}
                          </p>
                        </div>
                      ))}
                  </div>
                </div>
              </Col>
              <Col md={12} lg={6}>
                <div className="orderdetailsInfo">
                  <h3>Order Summery</h3>
                  <p>Subtotal: {subtotal} &#2547;</p>
                  <p>Shipping Cost: {shippingcost} &#2547;</p>
                  <p>Tax: {tax} &#2547;</p>
                  <p>Total: {total} &#2547;</p>
                  <button onClick={handlePayment} className="whiteButton">Proceed To Payment</button>
                </div>
              </Col>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Orderdetails;
