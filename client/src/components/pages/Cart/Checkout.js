import React, { useContext, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./Checkout.css";
import { Country, State } from "country-state-city";
import { shippingFormValidation } from "../../formvalidation/validateform";
import { ShippingInfoContext } from "../../../GlobalStates/Context";
import { useNavigate } from "react-router-dom";
import { useAlert } from "react-alert";
const Checkout = () => {
  const navigate = useNavigate();
  const alert = useAlert();
  const [shippingState, setShippingState] = useState({
    address: "",
    city: "",
    postCode: "",
    phoneNo: "",
    country: "",
    state: "",
  });
  const { shippingInfo, setShippingInfo } = useContext(ShippingInfoContext);
  const handleSubmit = (event) => {
    event.preventDefault();
    const isValid = shippingFormValidation(shippingState,alert);
    if (isValid) {
      setShippingInfo({ ...shippingState });
      localStorage.setItem("shippingInfo", JSON.stringify(shippingState));
      navigate("/order/confirm");
    }
  };
  const handleInputChange = (event) => {
    setShippingState({
      ...shippingState,
      [event.target.name]: event.target.value,
    });
  };
  return (
    <>
      <Container className="checkout_container">
        <Row>
          <Col md={12} className="mx-auto">
            <div className="checkout_formcontainer">
              <div className="formtogglegroup">
                <button className={`toggleborder`}>Shipping Details</button>
              </div>

              <form action="" onSubmit={handleSubmit}>
                <div className="formgroup">
                  <input
                    type="text"
                    name="address"
                    value={shippingState.address}
                    onChange={handleInputChange}
                    className="formcontroller"
                    placeholder="Address"
                  />
                </div>
                <div className="formgroup">
                  <input
                    name="city"
                    value={shippingState.city}
                    onChange={handleInputChange}
                    className="formcontroller"
                    placeholder="City"
                  >
                  </input>
                </div>
                <div className="formgroup">
                  <input
                    type="number"
                    name="postCode"
                    value={shippingState.postCode}
                    onChange={handleInputChange}
                    className="formcontroller"
                    placeholder="Post Code"
                  />
                </div>
                <div className="formgroup">
                  <input
                    type="number"
                    name="phoneNo"
                    value={shippingState.phoneNo}
                    onChange={handleInputChange}
                    className="formcontroller"
                    placeholder="Phone No"
                  />
                </div>
                <div className="formgroup">
                  <select
                    name="country"
                    value={shippingState.country}
                    onChange={handleInputChange}
                    className="formcontroller"
                  >
                    <option value="">Country</option>
                    {Country &&
                      Country.getAllCountries().map((item) => (
                        <option key={item.isoCode} value={item.isoCode}>
                          {item.name}
                        </option>
                      ))}
                  </select>
                </div>
                {shippingState.country && (
                  <div className="formgroup">
                    <select
                      name="state"
                      value={shippingState.state}
                      onChange={handleInputChange}
                      className="formcontroller"
                    >
                      <option value="">State</option>
                      {Country &&
                        State.getStatesOfCountry(shippingState.country).map(
                          (item) => (
                            <option key={item.isoCode} value={item.isoCode}>
                              {item.name}
                            </option>
                          )
                        )}
                    </select>
                  </div>
                )}
                <div className="formgroup">
                  <button
                    disabled={!shippingState ? true : false}
                    type="submit"
                    className="whiteButton"
                  >
                    Continue
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

export default Checkout;
