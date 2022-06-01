import React, { useState, useEffect } from "react";

import { Container, Row, Col } from "react-bootstrap";
import "../../pages/Order/SingleOrderDetails.css";
import { useParams, useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
import { getSingleOrderApi, updateOrderStatusApi } from "../../../api";
const ProcessOrder = () => {
    const [singleOrder, setSingleOrder] = useState({});
    const [status, setStatus] = useState("Processing");
    const { id } = useParams();
    const navigate = useNavigate();
    const alert = useAlert();
    useEffect(() => {
        const getSingleOrder = async () => {
            const res = await getSingleOrderApi(id, alert); // api call
            if (res.status === 200) {
                setSingleOrder(res.data.order);
            }
        };
        getSingleOrder();
    }, []);


    const handleClick = () => {
        const updateOrderStatus = async () => {
            const formdata = new FormData();
            formdata.set("status", status);
            const res = await updateOrderStatusApi(id, formdata, alert)
            if (res.status === 200) {
                alert.success("Order status updated successfully");
                navigate("/admin/allorders");
            }
        }
        updateOrderStatus();
    }

    return (
        <>
            <Container >
                <Row className="p-5">

                    <Col md={12} lg={6}>
                        <h1 className="singleOrder_heading">Order #{singleOrder._id}</h1>
                        <div className="singleOrderBody">
                            <div className="shippingInfo">
                                <h1 className="singleOrder_heading">Shipping Info</h1>
                                <h4>Name : <span> {singleOrder.user && singleOrder.user.name}</span></h4>

                                <h4>Phone : <span> {singleOrder.shippingInfo && singleOrder.shippingInfo.phoneNo}</span></h4>

                                <h4>Address : <span>
                                    {singleOrder.shippingInfo &&
                                        `${singleOrder.shippingInfo.address}, ${singleOrder.shippingInfo.city}, ${singleOrder.shippingInfo.state}, ${singleOrder.shippingInfo.postCode}, ${singleOrder.shippingInfo.country}`}
                                </span></h4>

                            </div>
                            <div className="paymentInfo">
                                <h1 className="singleOrder_heading">Payment Info</h1>
                                <h4>
                                    {singleOrder.paymentInfo &&
                                        singleOrder.paymentInfo.status === "succeeded"
                                        ? "PAID"
                                        : "NOT PAID"}
                                </h4>
                                <h4>Amount : <span>{singleOrder.totalPrice} &#2547;</span></h4>
                            </div>
                            <div className="orderStatusInfo">
                                <h1 className="singleOrder_heading">Order Info</h1>
                                <h4>Order Status : <span> {singleOrder.orderStatus}</span> </h4>
                                {singleOrder.orderStatus !== "Delivered" && <> <h4>Change Status</h4>
                                    <form>
                                        <div className="formgroup">
                                            <select
                                                name="status"
                                                className="formcontroller"
                                                value={status}
                                                onChange={(e) => setStatus(e.target.value)}
                                            >
                                                {singleOrder.orderStatus === "Processing" && <option value="Shipped">Shipped</option>}
                                                {singleOrder.orderStatus === "Shipped" && <option value="Delivered">Delivered</option>}

                                            </select></div>
                                        <div className="formgroup">
                                            <button className="colorButton" onClick={handleClick}>Update Status</button>
                                        </div>
                                    </form>
                                </>}
                            </div>
                        </div>
                    </Col>
                    <Col md={12} lg={6}>
                        <div className="orderItemsInfo">
                            <h1 className="singleOrder_heading">Order Items</h1>
                            {singleOrder.orderItems &&
                                singleOrder.orderItems.map((item, index) => (
                                    <div className="order_item_body " key={item._id}>
                                        <div className="order_item">
                                            <img src={item.image} alt="Show" />
                                            <div>
                                                <p>Name : {item.name}</p>
                                                <p>Price : {item.price} &#2547;</p>
                                            </div>
                                        </div>
                                        <p>
                                            {item.price} X {item.quantity} =
                                            {item.price * item.quantity}&#2547;
                                        </p>
                                    </div>
                                ))}
                        </div></Col>

                </Row>
            </Container>
        </>
    );
};

export default ProcessOrder;
