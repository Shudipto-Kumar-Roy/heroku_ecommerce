import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaImages } from "react-icons/fa";
import { createProductApi} from "../../../api";
import { useNavigate } from "react-router-dom";
import "./CreateProduct.css";
import { useAlert } from "react-alert";
import { createProductValidate } from "../../formvalidation/validateform";

const CreateProduct = () => {
  const alert = useAlert();
  const navigate = useNavigate();
  const [imageslist, setImagesList] = useState([]);
  const [imagesPreview, setImagesPreview] = useState([]);
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
    productstate.images = imageslist;

  const isValid = createProductValidate(productstate, alert);
  if(isValid)
  {
    const res = await createProductApi(productstate, alert);
    if (res.status === 201) {
      alert.success("Product created successfully");
      navigate("/admin");
    }
  }
  };


  return (
    <>
      <Container className="createProductContainer">
        <Row>
          <Col md={12}>
            <h1 className="create_product_heading text-center">
              Create Product
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
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  className="formcontroller"
                  value={productstate.stock}
                  onChange={handleInput}
                ></input>
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
                {imagesPreview && imagesPreview.map((image, index) => (
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
                  Create Product
                </button>
              </div>
            </form>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default CreateProduct;
