import React, { useEffect, useState } from "react";
import { useAlert } from "react-alert";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteProductApi, getAllProductsAdminApi } from "../../../api";
import { AiFillEdit, AiFillDelete } from "react-icons/ai"
import "./AllProducts.css";

const AllProducts = () => {
  const alert = useAlert();
  const [deletestate, setDeleteState] = useState(false);
  const [productsData, setProductsData] = useState([]);
  useEffect(() => {
    const getProducts = async () => {
      const res = await getAllProductsAdminApi(alert); // api call
      if (res.status === 200) {
        alert.success("Product getting successfully");
        setProductsData(res.data.products);
      }
    };
    getProducts();
  }, [deletestate]);

  const handleDelete = async (id) => {
    const isOk = window.confirm("Do you really want to delete ?");
    if (isOk) {
      const res = await deleteProductApi(id, alert);
      if (res.status === 200) {
        alert.success("Product deleted successfully");
        setDeleteState(true);
      }
    }
  };
  return (
    <>
      <Container>
        <Row className="my-5 p-5">
          <Col md={12}>
            <div className="products_label">
              <h3 className="products_label_item">Product</h3>
              {(window.innerWidth > 768) && <h3 className="products_label_item">Image</h3>}
              <h3 className="products_label_item">Actions</h3>
            </div>
          </Col>
          {productsData &&
            productsData.map((product, index) => (
              <Col md={12} key={index}>
                <div className="products_body">
                  <h3 className="products_body_item">{`${product._id} [${product.name}]`}</h3>
                  {(window.innerWidth > 768) && <h3 className="products_body_item"><img src={product.images[0].url} alt="product_img" /></h3>}
                  <h3 className="products_body_item">
                    <Link className="editProduct" to={`/admin/updateproduct/${product._id}`}><AiFillEdit /></Link>
                    <AiFillDelete  onClick={() => handleDelete(product._id)} className="deleteProduct"/>
                  </h3>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </>
  );
};

export default AllProducts;
