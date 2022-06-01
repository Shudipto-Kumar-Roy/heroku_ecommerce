import React, { useContext, useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaImages } from "react-icons/fa";
import {
  getSingleProductApi,
  updateProductApi,
} from "../../../api";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateProduct.css";
import { useAlert } from "react-alert";

import Loader from "../../Loader/Loader";
import Metadata from "../../../Metadata";
import { ProductDetailsContext } from "../../../GlobalStates/Context";
import { createProductValidate } from "../../formvalidation/validateform";


const UpdateProduct = () => {
  const alert = useAlert();
  const { id } = useParams();
  const navigate = useNavigate();
  const [imagesList, setImagesList] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
  const [oldImages, setOldImages] = useState([]);
  const { productdetailsState, setProductDetailsState } = useContext(
    ProductDetailsContext
  );

  const [productstate, setProductState] = useState({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    category: "",
    images: []
  });
  const categories = [
    "Electronics",
    "Stationary",
    "Toys",
    "Fashion",
    "Cloth",
    "Bag",
    "Shoe",
    "Food",
    "Toyletrize"
  ];
  const handleInput = (event) => {
    setProductState({
      ...productstate,
      [event.target.name]: event.target.value,
    });
  };
  const handleFile = async (event) => {
    const files = Array.from(event.target.files);
    setImagesList([]);
    setImagesPreview([]);
    setOldImages([]);

    files.forEach((file) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (reader.readyState === 2) {
          setImagesPreview((old) => [...old, reader.result]);
          setImagesList((old) => [...old, reader.result]);
        }
      }
    })
  };

  const handleClick = async (event) => {
    event.preventDefault();
    productstate.images = imagesList;
    const isValid = createProductValidate(productstate, alert);
    if (isValid) {
      const res = await updateProductApi(id, productstate, alert);
      if (res.status === 200) {
        alert.success("Product updated successfully");
      }
      navigate("/admin");
    }

  };


  useEffect(() => {
    const getProduct = async () => {
      const res = await getSingleProductApi(id, alert); //api call
      if (res.status === 200) {
        setProductDetailsState({
          ...productdetailsState,
          product: res.data.product,
          loading: false,
        });
      }
    };
    getProduct();
  }, []);

  useEffect(() => {
    setProductState({
      name: productdetailsState.product.name,
      description: productdetailsState.product.description,
      price: productdetailsState.product.price,
      stock: productdetailsState.product.stock,
      category: productdetailsState.product.category,
    });
    setOldImages(productdetailsState.product.images);

  }, [productdetailsState.product]);


  return (
    <>
      {productdetailsState.loading ? (
        <>
          <Metadata title="Loading.." />
          <Loader />
        </>
      ) :
        <>
          <Container className="createProductContainer">
            <Row>
              <Col md={12}>
                <h1 className="create_product_heading text-center">
                  Update Product
                </h1>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <form action="" className="fromcontainer">
                  <div className="formgroup">
                    <label htmlFor="name">Product Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      className="formcontroller"
                      value={productstate.name}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="formgroup">
                    <label htmlFor="description">Product Description</label>
                    <textarea
                      type="text"
                      id="description"
                      rows={5}
                      name="description"
                      className="formcontroller"
                      value={productstate.description}
                      onChange={handleInput}
                    ></textarea>
                  </div>
                  <div className="formgroup">
                    <label htmlFor="stock">Product Stock</label>
                    <textarea
                      type="number"
                      id="stock"
                      rows={5}
                      name="stock"
                      className="formcontroller"
                      value={productstate.stock}
                      onChange={handleInput}
                    ></textarea>
                  </div>
                  <div className="formgroup">
                    <label htmlFor="price">Product Price</label>
                    <input
                      type="number"
                      id="price"
                      name="price"
                      className="formcontroller"
                      value={productstate.price}
                      onChange={handleInput}
                    />
                  </div>
                  <div className="formgroup">
                    <label htmlFor="images" className="imagelabel">
                      Product Images <FaImages /> (Click to choose)
                    </label>
                    <input
                      type="file"
                      id="images"
                      className="formcontroller"
                      accept="image/*"
                      multiple
                      onChange={handleFile}
                    />
                  </div>
                  <div className="formgroup viewimagegroup">
                    {oldImages && oldImages.map((image, index) => (
                      <img
                        key={index}
                        src={image.url}
                        alt="Show"
                        className="viewImage"
                      />
                    ))}
                  </div>
                  <div className="formgroup viewimagegroup">
                    {imagesPreview.map((image, index) => (
                      <img
                        key={index}
                        src={image}
                        alt="Show"
                        className="viewImage"
                      />
                    ))}
                  </div>
                  <div className="formgroup">
                    <label htmlFor="category">Product Category</label>
                    <select
                      name="category"
                      id="category"
                      className="formcontroller"
                      value={productstate.category}
                      onChange={handleInput}
                    >
                      <option value="">Choose Category</option>
                      {
                        categories.map((item, index) => (
                          <option key={index} value={item}>{item}</option>
                        ))
                      }

                    </select>
                  </div>
                  <div className="formgroup">
                    <button
                      className="formbutton"
                      type="button"
                      onClick={handleClick}
                    >
                      Update Product
                    </button>
                  </div>
                </form>
              </Col>
            </Row>
          </Container>
        </>

      }
    </>

  );
};

export default UpdateProduct;
