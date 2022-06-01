import React, { useEffect, useState } from "react";
import "./Myorder.css";
import { getMyOrdersApi } from "../../../api";
import { useAlert } from "react-alert";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AiFillEdit } from "react-icons/ai";

const Myorder = () => {
  const alert = useAlert();
  const [myorders, setMyorders] = useState([]);

  useEffect(() => {
    const getMyOrders = async () => {
      const res = await getMyOrdersApi(alert) // api call
      if (res.status === 200) {
        alert.success("Order gets success");
        setMyorders(res.data.orders);
      }
    }
    getMyOrders();
  }, [])


  return (<>
    <div>
      <Container>
        <Row className="my-5 p-5">
          <Col md={12}>
            <h1 className="text-center">My Orders</h1>
          </Col>
          <Col md={12}>
            <div className="myorder_label">
              <h3 className="myorder_label_item">Order Id</h3>
              <h3 className="myorder_label_item">Status</h3>
              <h3 className="myorder_label_item">Items Quantity</h3>
              <h3 className="myorder_label_item">Amount</h3>
              <h3 className="myorder_label_item">Actions</h3>
            </div>
          </Col>
          {myorders &&
            myorders.map((order, index) => (
              <Col md={12} key={index}>
                <div className="myorder_body">
                  <h3 className="myorder_body_item">..{(order._id).slice(16, order._id.length)}</h3>
                  <h3 className={`orders_body_item ${order.orderStatus === "Delivered" ? "delivered" : "processing"}`}>{order.orderStatus}</h3>
                  <h3 className="myorder_body_item">{order.orderItems.length}</h3>
                  <h3 className="myorder_body_item">{order.totalPrice}</h3>
                  <h3 className="myorder_body_item">
                    <Link to={`/order/${order._id}`}><AiFillEdit className="editOrder" /></Link>
                  </h3>
                </div>
                <div className="myorder_body_responsive">
                  <div>
                    <h3 className="myorder_label_item">Order Id</h3>
                    <h3 className="myorder_label_item">Status</h3>
                    <h3 className="myorder_label_item">Items Quantity</h3>
                    <h3 className="myorder_label_item">Amount</h3>
                    <h3 className="myorder_label_item">Actions</h3>
                  </div>
                  <div>
                    <h3 className="myorder_body_item">..{(order._id).slice(16, order._id.length)}</h3>
                    <h3 className={`orders_body_item ${order.orderStatus === "Delivered" ? "delivered" : "processing"}`}>{order.orderStatus}</h3>
                    <h3 className="myorder_body_item">{order.orderItems.length}</h3>
                    <h3 className="myorder_body_item">{order.totalPrice}</h3>
                    <h3 className="myorder_body_item">
                      <Link to={`/order/${order._id}`}><AiFillEdit className="editOrder" /></Link>
                    </h3>
                  </div>
                </div>
              </Col>
            ))}
        </Row>
      </Container>
    </div>
  </>);
}

export default Myorder;