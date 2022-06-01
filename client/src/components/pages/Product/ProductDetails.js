import React, { useContext, useEffect, useState } from "react";
import "./ProductDetails.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Container, Row, Col, Modal, Button } from "react-bootstrap";
import { Rating } from "@material-ui/lab";
import {
  ProductDetailsContext,
  CartContext,
  CartItemCountContext,
  NavbarContext,
} from "../../../GlobalStates/Context";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { getSingleProductApi, setReviewApi } from "../../../api";
import ReviewCard from "./ReviewCard";
import Loader from "../../Loader/Loader";
import Metadata from "../../../Metadata";

const ProductDetails = () => {
  const { id } = useParams();
  const alert = useAlert();
  const navigate = useNavigate();
  const settings = {
    dots: true,
    autoplay: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover: true,
  };
  const { productdetailsState, setProductDetailsState } = useContext(
    ProductDetailsContext
  );
  const { navbarstate, setNavbarState } = useContext(NavbarContext);
  const { cartproduct, setCartProduct } = useContext(CartContext);
  const { cartitem, setCartItem } = useContext(CartItemCountContext);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const getProduct = async () => {
      const {data} = await getSingleProductApi(id, alert); // api call
        setProductDetailsState({
          ...productdetailsState,
          product: data.product,
          loading: false,
        });
      }
    getProduct();
  }, []);

  const decrementQuantity = () => {
    if (quantity < 2) return;
    else {
      setQuantity(quantity - 1);
    }
  };
  const incrementQuantity = () => {
    if (quantity >= productdetailsState.product.stock) return;
    else {
      setQuantity(quantity + 1);
    }
  };

  const addToCartHandeler = () => {
    if (navbarstate.login === false) {
      navigate("/loginsignup");
    } else {
      let currentProduct = { ...productdetailsState.product };
      currentProduct.quantity = quantity;
      const productExistInCart = cartproduct.find(
        (product) => product._id === currentProduct._id
      );
      if (productExistInCart) {
        return;
      } else {
        setCartProduct([
          ...cartproduct,
          {
            product: currentProduct._id,
            name: currentProduct.name,
            price: currentProduct.price,
            image: currentProduct.images[0].url,
            stock: currentProduct.stock,
            quantity: currentProduct.quantity,
          },
        ]);
        alert.success("Product added to cart successfully");
      }
    }
  };

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartproduct));
    localStorage.setItem("cartItemsCount", JSON.stringify(cartproduct.length));
    setCartItem(cartproduct.length);
  }, [cartproduct]);

  const [show, setShow] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formdata = new FormData();
    formdata.set("comment", comment);
    formdata.set("rating", rating);
    formdata.set("productId", id);
    const res = await setReviewApi(formdata, alert); //api call
    if (res.status === 200) {
      alert.success("Review added successfully");
      handleClose();
    }
  };
  const handleClose = () => setShow(false);

  const handleShow = () => setShow(true);

  return (
    <>
      {productdetailsState.loading ? (
        <>
          <Metadata title="Loading.." />
          <Loader />
        </>
      ) : (
        <>
          <Metadata title={`${productdetailsState.product.name}-- Ecommerce`} />
          <Container className="productdetails">
            <Row className="my-5">
              <Col md={5}>
                <div className="product_images">
                  <Slider {...settings} className="product_image_slider">
                    {productdetailsState.product.images &&
                      productdetailsState.product.images.map((image, index) => (
                        <img key={index} src={image.url} alt="Product" />
                      ))}
                  </Slider>
                </div>
              </Col>
              <Col md={7}>
                <div className="product_info">
                  <div className="product_name">
                    <h2>{productdetailsState.product.name}</h2>
                    <p>product # {productdetailsState.product._id}</p>
                  </div>
                  <div className="product_rating">
                    <Rating
                      readOnly={true}
                      size="large"
                      precision={0.5}
                      value={productdetailsState.product.ratings}
                    />
                    <span>
                      ({productdetailsState.product.numOfReviews} reviews)
                    </span>
                  </div>
                  <h1 className="product_price">
                    <span>&#2547;</span>
                    {productdetailsState.product.price}
                  </h1>
                  <div className="product_quantity">
                    <button onClick={decrementQuantity}>-</button>
                    <input readOnly type="number" value={quantity} />
                    <button onClick={incrementQuantity}>+</button>
                  </div>
                  <button
                    onClick={addToCartHandeler}
                    disabled={
                      productdetailsState.product.stock < 1 ? true : false
                    }
                    className="colorButton"
                  >
                    Add to Cart
                  </button>
                  <h4 className="product_stock_status">
                    Status:
                    <span
                      style={
                        productdetailsState.product.stock < 1
                          ? { color: "#c71e00" }
                          : { color: "#036e11" }
                      }
                    >
                      {productdetailsState.product.stock < 1
                        ? " Out of Stock"
                        : " In Stock"}
                    </span>
                  </h4>
                  <div className="product_description">
                    <h5>Description: </h5>
                    <p>{productdetailsState.product.description}</p>
                  </div>
                  <button onClick={handleShow} className="colorButton">
                    Submit Review
                  </button>
                </div>
              </Col>
            </Row>
            <Row className="my-5">
              <h2 className="product_review_heading">Product Reviews</h2>
              <Col md={12}>
                <div className="productreviews">
                  {productdetailsState.product.reviews &&
                  productdetailsState.product.reviews[0] ? (
                    productdetailsState.product.reviews.map((review, index) => (
                      <ReviewCard key={index} review={review} />
                    ))
                  ) : (
                    <p className="no_reviws">No reviews yet</p>
                  )}
                </div>
              </Col>
            </Row>
          </Container>

          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Modal heading</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <form action="">
                <div className="submitRating">
                  <Rating
                    size="large"
                    name="rating"
                    readOnly={false}
                    precision={0.5}
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  />
                </div>
                <textarea
                  className="submitComment"
                  name="comment"
                  cols="30"
                  vlaue={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="comment"
                ></textarea>
              </form>
            </Modal.Body>
            <Modal.Footer>
              <button className="colorButton" onClick={handleSubmit}>
                Submit
              </button>
            </Modal.Footer>
          </Modal>
        </>
      )}
    </>
  );
};

export default ProductDetails;
