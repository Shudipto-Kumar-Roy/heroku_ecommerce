import React,{useContext, useEffect} from "react";
import Metadata from "../../../Metadata";
import {
  useStripe,
  useElements,
  CardNumberElement,
  CardCvcElement,
  CardExpiryElement
} from "@stripe/react-stripe-js";
import { FaCreditCard } from "react-icons/fa";
import { Container, Row, Col } from "react-bootstrap";
import {sendPaymentInfo, placeOrderApi} from "../../../api";
import {useAlert} from "react-alert";
import { NavbarContext,ShippingInfoContext, CartContext, OrderContext } from "../../../GlobalStates/Context";
import { useNavigate } from "react-router-dom";


const Payment = () => {
  const alert = useAlert();
  const stripe = useStripe();
  const elements = useElements();
  const navigate = useNavigate();
  const { navbarstate, setNavbarState } = useContext(NavbarContext);
  const { shippingInfo, setShippingInfo } = useContext(ShippingInfoContext);
  const { cartproduct, setCartProduct } = useContext(CartContext);
  const {orderstate,setOrderState} = useContext(OrderContext);
  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const paymentData =  {
    amount : Math.round(orderInfo.total * 100)
  }

  const order = {
        shippingInfo : shippingInfo,
        orderItems : cartproduct,
        paymentInfo:"",
        itemsPrice : orderInfo.subtotal,
        taxPrice : orderInfo.tax,
        shippingPrice : orderInfo.shippingcost,
        totalPrice : orderInfo.total 
    };


  const submitHandeler = async (event) => {
    event.preventDefault();
    
    const res = await sendPaymentInfo(paymentData,alert); //api call
    const client_secret = res.data.client_secret;
    if(!stripe || !elements) return;

    const result = await stripe.confirmCardPayment(client_secret,{
      payment_method : {
        card : elements.getElement(CardNumberElement),
        billing_details : {
          name : navbarstate.user.name,
          email : navbarstate.user.email,
          address : {
            line1 : shippingInfo.address,
            city : shippingInfo.country,
            state : shippingInfo.state,
            postal_code : shippingInfo.postCode,
            country : shippingInfo.country
          }
        }
      }
    })
    if(result.error)
    {
      alert.error(result.error.message);
    }
    else{
      if(result.paymentIntent.status === "succeeded")
      {
      order.paymentInfo = {
        id : result.paymentIntent.id,
        status : result.paymentIntent.status,
      };
      await placeOrderApi(order,alert);
      navigate("/order/success");
      }
      else{
     alert.error("There are some issue while processing payment");
      }
    }
  }
  return (
    <>
      <Metadata title="Payment" />
      <Container className="main_container">
        <Row>
          <Col md={12} className="mx-auto">
            <div className="formcontainer">
              <div className="formtogglegroup">
                <button className={`toggleborder`}>Card Info</button>
              </div>
              <form action="" onSubmit={submitHandeler}>
                <div className="formgroup">
                  <CardNumberElement className="formcontroller"/>
                </div>
                <div className="formgroup">
                  <CardExpiryElement className="formcontroller"/>
                </div>
                <div className="formgroup">
                  <CardCvcElement className="formcontroller"/>
                </div>
               
                <div className="formgroup">
                  <button type="submit" className="whiteButton" disabled={!stripe || !elements}>
                    {`Pay - ${orderInfo && orderInfo.total }`}&#2547;
                  </button>
                </div>
              </form>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Payment;
