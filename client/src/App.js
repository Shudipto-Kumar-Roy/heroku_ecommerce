import "./App.css";
import Navigationbar from "./components/Header/Navigationbar";
import Home from "./components/pages/Home/Home";
import { Routes, Route } from "react-router-dom";
import Adminscreen from "./components/Admin/Adminscreen";
import Dashboard from "./components/Admin/Dashboard";
import AllProducts from "./components/Admin/products/AllProducts";
import CreateProduct from "./components/Admin/products/CreateProduct";
import UpdateProduct from "./components/Admin/products/UpdateProduct";
import LoginSignup from "./components/Authentication/LoginSignup";
import {
  CartContext,
  CartItemCountContext,
  NavbarContext,
  ProductsContext,
  ProductDetailsContext,
  ShippingInfoContext,
  OrderContext
} from "./GlobalStates/Context";
import { useState } from "react";
import ForgotPassword from "./components/Authentication/ForgotPassword";
import ResetPassword from "./components/Authentication/ResetPassword";
import ProductDetails from "./components/pages/Product/ProductDetails";
import Products from "./components/pages/Product/Products";
import Profile from "./components/pages/UserProfile/Profile";
import UpdateProfile from "./components/pages/UserProfile/UpdateProfile";
import UpdateUserPassword from "./components/pages/UserProfile/UpdateUserPassword";
import Cart from "./components/pages/Cart/Cart";
import Checkout from "./components/pages/Cart/Checkout";
import Orderdetails from "./components/pages/Order/Orderdetails";
import Payment from "./components/pages/Order/Payment";
import OrderSuccess from "./components/pages/Order/OrderSuccess";
import Myorder from "./components/pages/Order/Myorder";
import SingleOrderDetails from "./components/pages/Order/SingleOrderDetails";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import AllOrders from "./components/Admin/order/AllOrders";
import ProcessOrder from "./components/Admin/order/ProcessOrder";
import AllUsers from "./components/Admin/users/AllUsers";
import UpdateUserRole from "./components/Admin/users/UpdateUserRole";
import AllReviews from "./components/Admin/reviews/AllReviews";
import Footer from "./components/Footer/Footer";
import AboutUs from "./components/pages/AboutUs/AboutUs";
import ContactUs from "./components/pages/ContactUs/ContactUs";

function App() {
  // for navbar state
  const [navbarstate, setNavbarState] = useState({
    login: false,
    user: "",
    isAuthenticated: false
  });

  // for product state
  const [productstate, setProductState] = useState({
    products: [],
    loading: true,
    productCount: "",
    resultPerPage: "",
  });

  // for productdetails state
  const [productdetailsState, setProductDetailsState] = useState({
    product: {},
    loading: true,
  });

  // for cartproducts state
  const [cartproduct, setCartProduct] = useState([]);

  // for cartitem count state
  const [cartitem, setCartItem] = useState(0);

  // for shipping info state
  const [shippingInfo, setShippingInfo] = useState({
    address: "",
    city: "",
    postCode: null,
    phoneNo: null,
    country: "",
    state: "",
  });

  // for order info state
  const [orderstate, setOrderState] = useState({
    shippingInfo: {},
    orderItems: [],
    paymentInfo: {},
    itemsPrice: "",
    taxPrice: "",
    shippingPrice: "",
    totalPrice: "",
  })


  // const [stripeapikey, setStripeApiKey] = useState("");
  // useEffect(() => {
  //   const getStripeApiKey = async()=> 
  //   {
  //       const { data } = await axios.get("/api/v1/stripeapikey");
  //       setStripeApiKey(data.stripeApikey);
  //   }
  //   getStripeApiKey();
  // }, []);



  const [stripePromise, setStripePromise] = useState(() => loadStripe("pk_test_51KU0JvGmYKYYAht9L91Jaaa9WZxqq6Iui9VOc95RTZa4GQr7yO3V94JGxhpnRMyVYNXgBr1H30TgYzNBCpjvyBZe00JNEkxUep"));

  return (<Elements stripe={stripePromise}>
    <NavbarContext.Provider value={{ navbarstate, setNavbarState }}>
      <ProductsContext.Provider value={{ productstate, setProductState }}>
        <ProductDetailsContext.Provider
          value={{ productdetailsState, setProductDetailsState }}
        >
          <CartContext.Provider value={{ cartproduct, setCartProduct }}>
            <CartItemCountContext.Provider value={{ cartitem, setCartItem }}>
              <ShippingInfoContext.Provider
                value={{ shippingInfo, setShippingInfo }}
              >
                <OrderContext.Provider value={{ orderstate, setOrderState }}>
                  <Navigationbar />

                  <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="admin" element={<Adminscreen />}>
                      <Route path="" element={<Dashboard />} />
                      <Route path="allproducts" element={<AllProducts />} />
                      <Route path="createproduct" element={<CreateProduct />} />
                      <Route
                        path="updateproduct/:id"
                        element={<UpdateProduct />}
                      />
                      <Route path="allorders" element={<AllOrders />} />
                      <Route path="updateorder/:id" element={<ProcessOrder />} />
                      <Route path="allusers" element={<AllUsers />} />
                      <Route path="updateuser/:id" element={<UpdateUserRole />} />
                      <Route path="allreviews" element={<AllReviews />} />

                    </Route>
                    {navbarstate.isAuthenticated && (
                      <Route
                        path="/userprofile"
                        element={<Profile user={navbarstate.user} />}
                      />
                    )}
                    {navbarstate.isAuthenticated && (
                      <Route
                        path="/password/update"
                        element={<UpdateUserPassword />}
                      />
                    )}
                    {navbarstate.isAuthenticated && (
                      <Route
                        path="/userprofile/update"
                        element={<UpdateProfile />}
                      />
                    )}
                    <Route path="/products/*" element={<Products />} />
                    <Route path="/products/:keyword" element={<Products />} />
                    <Route path="/loginsignup" element={<LoginSignup />} />
                    <Route path="/password/forgot" element={<ForgotPassword />} />
                    <Route
                      path="/api/v1/user/password/reset/:token"
                      element={<ResetPassword />}
                    />
                    <Route path="/product/:id" element={<ProductDetails />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/order/shippingdetails" element={<Checkout />} />
                    <Route path="/order/confirm" element={<Orderdetails />} />
                    <Route path="/process/payment" element={<Payment />} />
                    <Route path="/order/success" element={<OrderSuccess />} />
                    <Route path="/order/myorders" element={<Myorder />} />
                    <Route path="/order/:id" element={<SingleOrderDetails />} />
                    <Route path="/aboutus" element={<AboutUs />}/>
                    <Route path="/contactus" element={<ContactUs />}/>
                  </Routes>

                  <Footer />
                </OrderContext.Provider>
              </ShippingInfoContext.Provider>
            </CartItemCountContext.Provider>
          </CartContext.Provider>
        </ProductDetailsContext.Provider>
      </ProductsContext.Provider>
    </NavbarContext.Provider>
  </Elements>
  );
}

export default App;
