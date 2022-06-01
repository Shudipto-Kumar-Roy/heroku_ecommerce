import React, { useEffect, useState } from "react";
import { deleteOrderApi, getAllOrdersApi } from "../../../api";
import { useAlert } from "react-alert";
import { Container, Row, Col } from "react-bootstrap";
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./AllOrders.css";
const AllOrders = () => {
    const alert = useAlert();
    const [orders, setOrders] = useState([]);
    const [deletestate, setDeleteState] = useState(false);

    useEffect(() => {
        const getAllOrders = async () => {
            const res = await getAllOrdersApi(alert) // api call
            if (res.status === 200) {
                alert.success("Orders gets success");
                setOrders(res.data.orders);
            }
        }
        getAllOrders();
    }, [deletestate])

    const handleDelete = async (id) => {
        const isOk = window.confirm("Do you really want to delete ?");
        if (isOk) {
            const res = await deleteOrderApi(id, alert);
            if (res.status === 200) {
                alert.success("Order deleted successfully");
                setDeleteState(true);
            }
        }
    };
    return (<>
        <div>
            <Container>
                <Row className="my-5 p-5">
                    <Col md={12}>
                        <div className="orders_label">
                            <h3 className="orders_label_item">Order Id</h3>
                            <h3 className="orders_label_item">Status</h3>
                            <h3 className="orders_label_item">Items Quantity</h3>
                            <h3 className="orders_label_item">Amount</h3>
                            <h3 className="orders_label_item">Actions</h3>
                        </div>
                    </Col>
                    {orders &&
                        orders.map((order, index) => (
                            <Col md={12} key={index}>
                                <div className="orders_body">
                                    <h3 className="orders_body_item">..{(order._id).slice(16, order._id.length)}</h3>
                                    <h3 className={`orders_body_item ${order.orderStatus === "Delivered" ? "delivered" : "processing"}`}>{order.orderStatus}</h3>
                                    <h3 className="orders_body_item">{order.orderItems.length}</h3>
                                    <h3 className="orders_body_item">{order.totalPrice} &#2547;</h3>
                                    <h3 className="orders_body_item">
                                        {order.orderStatus === "Delivered" || <Link to={`/admin/updateorder/${order._id}`}><AiFillEdit className="editProduct" /></Link>}
                                        <AiFillDelete className="deleteProduct" onClick={() => handleDelete(order._id)} />
                                    </h3>
                                </div>
                                <div className="orders_body_responsive">
                                    <div> <h3 className="orders_label_item">Order Id</h3>
                                        <h3 className="orders_label_item">Status</h3>
                                        <h3 className="orders_label_item">Items Quantity</h3>
                                        <h3 className="orders_label_item">Amount</h3>
                                        <h3 className="orders_label_item">Actions</h3></div>
                                    <div><h3 className="orders_body_item">..{(order._id).slice(16, order._id.length)}</h3>
                                        <h3 className={`orders_body_item ${order.orderStatus === "Delivered" ? "delivered" : "processing"}`}>{order.orderStatus}</h3>
                                        <h3 className="orders_body_item">{order.orderItems.length}</h3>
                                        <h3 className="orders_body_item">{order.totalPrice} &#2547;</h3>
                                        <h3 className="orders_body_item">
                                            {order.orderStatus === "Delivered" || <Link to={`/admin/updateorder/${order._id}`}><AiFillEdit className="editOrder" /></Link>}
                                            <AiFillDelete className="deleteOrder" onClick={() => handleDelete(order._id)} />
                                        </h3></div>

                                </div>
                            </Col>
                        ))}
                </Row>
            </Container>
        </div>
    </>);
}

export default AllOrders;