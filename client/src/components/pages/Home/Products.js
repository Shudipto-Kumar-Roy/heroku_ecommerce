import React, { useContext, useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import "../Home/Products.css";
import { ProductsContext } from "../../../GlobalStates/Context";
import Loader from "../../Loader/Loader";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import { getAllProductsApi } from "../../../api";
import Metadata from "../../../Metadata";
import ProductCard from "../component/ProductCard";

const categoris = [
  "Electronics",
  "Stationary",
  "Toys",
  "Fashion",
  "Cloth",
  "Bag",
  "Shoe",
];

const Products = () => {
  const alert = useAlert();
  const [price, setPrice] = useState([0, 25000]);
  const [currentPage, setCurrentPage] = useState(1);
  const { keyword } = useParams();
  const { productstate, setProductState } = useContext(ProductsContext);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);
  useEffect(() => {
    const getProducts = async () => {
      const { data } = await getAllProductsApi(
        keyword,
        currentPage,
        price,
        category,
        ratings,
        alert
      ); // api call
      setProductState({
        ...productstate,
        products: data.products,
        productCount: data.productCount,
        resultPerPage: data.resultPerPage,
        filteredProductCount: data.filteredProductCount,
        loading: false,
      });
    };
    getProducts();
  }, [keyword, currentPage, price, category, ratings]);
  const handlePageChange = (event) => {
    setCurrentPage(event);
  };
  return (
    <>
      {productstate.loading ? (
        <>
          <Metadata title="Loading..." />
          <Loader />
        </>
      ) : (
        <>
          <section id="products_id">
            <Container fluid>
              <Row>
                <Col md={2}>
                  <h3>Price</h3>
                  <div className="filterBox">
                    <Slider
                      value={price}
                      onChange={(e, newValue) => setPrice(newValue)}
                      valueLabelDisplay="on"
                      min={0}
                      max={25000}
                      aria-labelledby="range-slider"
                    />
                  </div>
                  <h3>Category</h3>
                  <div className="categoryBox">
                    <ul className="categoryList">
                      {categoris.map((category) => (
                        <li
                          className="categoryLink"
                          key={category}
                          onClick={() => setCategory(category)}
                        >
                          {category}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <h3>Ratings Above</h3>
                  <div className="ratingsBox">
                    <Slider
                      value={ratings}
                      onChange={(e, newRating) => setRatings(newRating)}
                      valueLabelDisplay="on"
                      step={0.5}
                      min={0}
                      max={5}

                      aria-labelledby="continuous-slider"
                    />
                  </div>
                </Col>
                <Col md={10} sm={12} className="mx-auto">
                  <Row>
                    <Col md={12}>
                      <h1 className="text-center productsheading mb-5">
                        Products
                      </h1>
                    </Col>
                  </Row>
                  <Row>
                    {productstate.products &&
                      productstate.products.map((product, index) => (
                        <Col lg={3} md={4} sm={6} key={index}>
                          <Link
                            to={`/product/${product._id}`}
                            className="productcard_link"
                          >
                            <ProductCard product={product} />
                          </Link>
                        </Col>
                      ))}
                  </Row>
                </Col>
                <Row>
                  <Col md={12} sm={10} className="mx-auto">
                    <div className="pagination_box">
                      {productstate.resultPerPage <
                        productstate.productCount && (
                          <Pagination
                            activePage={currentPage}
                            itemsCountPerPage={productstate.resultPerPage}
                            totalItemsCount={productstate.productCount}
                            onChange={handlePageChange}
                            nextPageText="Next"
                            prevPageText="Previous"
                            firstPageText="First"
                            lastPageText="Last"
                            itemClass="page_item"
                            linkClass="page_link"
                            activeClass="pageItemActive"
                            activeLinkClass="pageLinkActive"
                          />
                        )}
                    </div>
                  </Col>
                </Row>
              </Row>
            </Container>
          </section>
        </>
      )}
    </>
  );
};

export default Products;
