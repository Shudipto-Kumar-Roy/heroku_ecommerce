import axios from "axios";

// navbar api
export const navbarChangeApi = async (alert) => {
  try {
    return await axios.get("/api/v1/navbar");
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// create product api
export const createProductApi = async (productstate, alert) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    return await axios.post("/api/v1/admin/product/new", productstate,config);
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// upload images api
export const UploadImageApi = async (data, alert) => {
  try {
    return await axios.post("/api/v1/file/upload", data);
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// get all products admin api
export const getAllProductsAdminApi = async () => {
  try {
    return await axios.get("/api/v1/alladminproducts");
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// get all products api
export const getAllProductsApi = async (
  keyword = "",
  currentPage = 1,
  price = [0, 25000],
  category,
  ratings = 0,
  alert
) => {
  try {
    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;
    if (category) {
      link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`;
    }
    return await axios.get(link);
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// update product api
export const updateProductApi = async (id, productstate, alert) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    return await axios.put(`/api/v1/admin/product/update/${id}`, productstate,config);
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// get single product api
export const getSingleProductApi = async (id, alert) => {
  try {
    return await axios.get(`/api/v1/product/${id}`);
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// delete product api
export const deleteProductApi = async (id, alert) => {
  try {
    return await axios.delete(`/api/v1/admin/product/delete/${id}`);
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// create signup api
export const createSignUpApi = async (signupstate, alert) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    return await axios.post("/api/v1/user/signup", signupstate,config);
  } catch (error) {
    if (error.response.status === 409) {
      alert.info("User already exists with this email");
    } else {
      alert.error(error.response.data.message);
    }
  }
};

// create login api
export const createLoginApi = async (loginstate, alert) => {
  try {
    return await axios.post("/api/v1/user/login", loginstate);
  } catch (error) {
    if (error.response.status === 404) {
      alert.info("User not found");
    } else if (error.response.status === 401) {
      alert.info("Invalid credential");
    } else {
      alert.error(error.response.data.message);
    }
  }
};

// user logout api
export const logoutApi = async (alert) => {
  try {
    return await axios.get("/api/v1/user/logout");
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// user forgot password api
export const forgotPasswordApi = async (email, alert) => {
  try {
    return await axios.post("/api/v1/user/password/forgot", { email });
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// user reset password api
export const createResetPasswordApi = async (state, token, alert) => {
  try {
    return await axios.post(`/api/v1/user/password/reset/${token}`, state);
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// user profile update api
export const updateUserProfileApi = async (profilestate, alert) => {
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    return await axios.put("/api/v1/user/update", profilestate, config);
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// user password update api
export const updatePasswordApi = async (state, alert) => {
  const config = { headers: { "Content-Type": "application/json" } };
  try {
    return await axios.put("/api/v1/user/password/update", state, config);
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// get all users for admin api
export const getAllUsersApi = async (alert) => {
  try {
    return await axios.get("/api/v1/admin/allusers");
  } catch (error) {
    alert.error(error.response.data.message);
  }
}

// delete single user for admin api
export const deleteUserApi = async (id, alert) => {
  try {
    return await axios.delete(`/api/v1/admin/user/delete/${id}`);
  } catch (error) {
    alert.error(error.response.data.message);
  }
}

// get single user for admin api
export const getSingleUserApi = async (id, alert) => {
  try {
    return await axios.get(`/api/v1/admin/user/${id}`);
  } catch (error) {
    alert.error(error.response.data.message);
  }
}

// get single user for admin api
export const updateUserRoleApi = async (formdata,id, alert) => {
  try {
    const config = { headers: { "Content-Type": "multipart/form-data" } };
    return await axios.put(`/api/v1/admin/user/update/userrole/${id}`,formdata,config);
  } catch (error) {
    alert.error(error.response.data.message);
  }
}

// send payment data api
export const sendPaymentInfo = async (paymentDate, alert) => {
  try {
    return await axios.post("/api/v1/payment/process", paymentDate);
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// create new order api
export const placeOrderApi = async (orderstate, alert) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };
  try {
    return await axios.post("/api/v1/order/new", orderstate, config);
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// for getting login user ordered products
export const getMyOrdersApi = async (alert) => {
  try {
    return await axios.get("/api/v1/myorders");
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// for getting login user single order details
export const getSingleOrderApi = async (id, alert) => {
  try {
    return await axios.get(`/api/v1/myorders/order/${id}`);
  } catch (error) {
    alert.error(error.response.data.message);
  }
};

// for getting all orders for admin
export const getAllOrdersApi = async (alert) => {
  try {
    return await axios.get("/api/v1/admin/order/allorders");
  } catch (error) {
    alert.error(error.response.data.message);
  }
}

// for deleting an order for admin
export const deleteOrderApi = async (id, alert) => {
  try {
    return await axios.delete(`/api/v1/admin/order/delete/${id}`);
  } catch (error) {
    alert.error(error.response.data.message);

  }
}

// for update an order status for admin
export const updateOrderStatusApi = async (id, formdata, alert) => {
  try {
    const config = { headers: { "Content-Type": "application/json" } };
    return await axios.put(`/api/v1/admin/order/updatestatus/${id}`, formdata, config);
  } catch (error) {
    alert.error(error.response.data.message);
  }
}

// for review add
export const setReviewApi = async (formdata, alert) => {
  try {
    return await axios.put(`/api/v1/product/review`, formdata);
  } catch (error) {
    alert.error(error.response.data.message);

  }
};

// for get all reviews for admin
export const getAllReviewsApi = async(productId, alert)=> {
try {
  return await axios.get(`/api/v1/admin/product/reviews?productId=${productId}`);
} catch (error) {
  alert.error(error.response.data.message);
}
}

// for delete a review for admin
export const deleteReviewApi = async(id,productId, alert)=> {
try {
  return await axios.delete(`/api/v1/admin/product/review/delete?id=${id}&productId=${productId}`);
} catch (error) {
  alert.error(error.response.data.message);
}
}