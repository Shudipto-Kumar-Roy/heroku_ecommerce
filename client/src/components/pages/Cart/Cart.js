import React, { useContext, useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  CartContext,
  CartItemCountContext,
} from "../../../GlobalStates/Context";
import "./Cart.css";
const Cart = () => {
  const { cartproduct, setCartProduct } = useContext(CartContext);
  const { cartitem, setCartItem } = useContext(CartItemCountContext);
  // const [stock, setStock] = useState(1);
  useEffect(() => {
    setCartProduct(JSON.parse(localStorage.getItem("cartItems")));
  }, []);

  const handleDeleteCartItem = (delete_productid) => {
    const newProducts = cartproduct.filter(
      (item) => item.product !== delete_productid
    );
    
    localStorage.setItem("cartItems", JSON.stringify(newProducts));
    localStorage.setItem("cartItemsCount", JSON.stringify(newProducts.length));
    setCartProduct(newProducts);
    setCartItem(newProducts.length);
  };

  const decrementQuantity = (productId, Quantity, Stock, index) => {
    const Findproduct =
      cartproduct && cartproduct.find((product) => product._id === productId);
    if (Quantity < 2) return;
    else {
      Findproduct.quantity = Quantity - 1;
      cartproduct[index] = Findproduct;
      setCartProduct([...cartproduct]);
    }
  };

  const incrementQuantity = (productId, Quantity, Stock, index) => {
    const Findproduct =
      cartproduct && cartproduct.find((product) => product._id === productId);
    if (Quantity >= Stock) return;
    else {
      Findproduct.quantity = Quantity + 1;
      cartproduct[index] = Findproduct;
      setCartProduct([...cartproduct]);
    }
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartproduct));
  }, [cartproduct]);

  return (
    <>
      <Container>
        <Row className="my-5">
          <Col md={12}>
            <h1 className="text-center">All Products</h1>
          </Col>
          <Col md={12}>
            <div className="cart_label">
              <h3 className="cart_label_item">Product Name</h3>
              <h3 className="cart_label_item">Quantity</h3>
              <h3 className="cart_label_item">Subtotal</h3>
            </div>
          </Col>
          {cartproduct &&
            cartproduct.map((product, index) => (
              <Col md={12} key={index}>
                <div className="product_cart">
                  <div className="product_cart_product">
                    <img
                      src={product.image}
                      alt="Show"
                    />
                    <div>
                      <p>Name : {product.name}</p>
                      <p>Price : {product.price} &#2547;</p>
                      <button
                        onClick={() => handleDeleteCartItem(product.product)}
                        className="deletecart"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                  <div className="product_cart_quantity">
                    <button
                      onClick={() =>
                        decrementQuantity(
                          product._id,
                          product.quantity,
                          product.stock,
                          index
                        )
                      }
                    >
                      -
                    </button>
                    <input readOnly type="number" value={product.quantity} />
                    <button
                      onClick={() =>
                        incrementQuantity(
                          product._id,
                          product.quantity,
                          product.stock,
                          index
                        )
                      }
                    >
                      +
                    </button>
                  </div>
                  <h3>{product.price * product.quantity} &#2547; </h3>
                </div>
              </Col>
            ))}
          <Col md={12}>
            <div className="product_total">
              <div className="cart_total_line"></div>
              <div className="cart_total_price">
                <p>Total</p>
                <p>
                  {cartproduct &&
                    cartproduct.reduce(
                      (acc, product) => acc + product.price * product.quantity,
                      0
                    )}
                  &#2547;
                </p>
              </div>
              <Link
                to="/order/shippingdetails"
                className="colorButton checkout_button"
              >
                Checkout
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Cart;
