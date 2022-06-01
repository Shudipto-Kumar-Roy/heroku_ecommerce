import React from 'react';
import {Container,Row,Col} from "react-bootstrap";
import {FaCheckCircle} from "react-icons/fa";
import "./OrderSuccess.css";
const OrderSuccess = () => {
    return (
        <>
           <Container>
               <Row>
                   <Col md={12}>
                    <div className="orderSuccessContainer">
                    <FaCheckCircle className="orderSuccessIcon"/>
                    <h1>Order Placed Successfully</h1>
                    </div>
                   </Col>
               </Row>
           </Container>
            
        </>
    )
}

export default OrderSuccess;
