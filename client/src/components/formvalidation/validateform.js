import validator from "email-validator";

// create product validate
export const createProductValidate = (productstate, alert) => {
  if (
    productstate.name === "" ||
    productstate.description === "" ||
    productstate.price === 0 ||
    productstate.stock === 0 ||
    productstate.category === ""
  ) {
    alert.info("Please fill the field first");
    return false;
  } else if (productstate.images.length === 0) {
    alert.info("Please select images");
    return false;
  } else if (productstate.price.length > 8) {
    alert.info("Price should not exceen 8 character");
    return false;
  } else {
    return true;
  }
};

// create signup validate
export const createSignupValidation = (signupstate, avatar, alert) => {
  if (
    signupstate.name === "" ||
    signupstate.email === "" ||
    signupstate.password === "" ||
    signupstate.confirmpassword === ""
  ) {
    alert.info("Please fill the form properly");
    return false;
  } else if (!validator.validate(signupstate.email)) {
    alert.info("Invalid Email");
    return false;
  } else if (signupstate.password !== signupstate.confirmpassword) {
    alert.info("Password does not match");
    return false;
  } else if (signupstate.password.length < 8) {
    alert.info("Password at least 8 character must");
    return false;
  } else if (avatar === "") {
    alert.info("Please select a profile image");
    return false;
  } else {
    return true;
  }
};

// update user profile validate
export const updateProfileValidation = (signupstate, avatar, alert) => {
  if (signupstate.name === "" || signupstate.email === "") {
    alert.info("Please fill the form properly");
    return false;
  } else if (!validator.validate(signupstate.email)) {
    alert.info("Invalid Email");
    return false;
  } else if (avatar === "") {
    alert.info("Please select a profile image");
    return false;
  } else {
    return true;
  }
};

// update user password validation
export const updatePasswordValidation = (state, alert) => {
  if (
    state.oldpassword === "" ||
    state.newpassword === "" ||
    state.confirmpassword === ""
  ) {
    alert.info("Please fill the form properly");
    return false;
  } else if (state.newpassword.length < 8) {
    alert.info("Password at least 8 character must");
    return false;
  } else if (state.newpassword !== state.confirmpassword) {
    alert.info("Password does not match");
    return false;
  } else {
    return true;
  }
};

// create login validate
export const createLoginValidation = (loginstate, alert) => {
  if (loginstate.loginemail === "" || loginstate.loginpassword === "") {
    alert.info("Please fill the form properly");
    return false;
  } else if (!validator.validate(loginstate.loginemail)) {
    alert.info("Invalid Email");
    return false;
  } else if (loginstate.loginpassword.length < 8) {
    alert.info("Password at least 8 character must");
    return false;
  } else {
    return true;
  }
};

// forgot password form validation
export const forgotFormValidation = (email, alert) => {
  if (email === "") {
    alert.info("Please enter email value");
    return false;
  } else if (!validator.validate(email)) {
    alert.info("Invlid email");
    return false;
  } else {
    return true;
  }
};

// reset password form validation
export const resetPasswordFormValidation = (state, alert) => {
  if (state.password === "" || state.confirmPassword === "") {
    alert.info("Please fill the form first");
    return false;
  } else if (state.password !== state.confirmPassword) {
    alert.info("Password does not match");
    return false;
  } else if (state.password.length < 8) {
    alert.info("Password should be at least 8 character");
    return false;
  } else {
    return true;
  }
};

// shipping info form validation
export const shippingFormValidation = (shippingState, alert) => {
  if (
    shippingState.address === "" ||
    shippingState.city === "" ||
    shippingState.postCode === "" ||
    shippingState.phoneNo === "" ||
    shippingState.country === "" ||
    shippingState.state === ""
  ) {
    alert.info("Please fill the form first");
    return false;
  }
  else if(shippingState.phoneNo < 11)
  {
    alert.info("Phone number must be 11 digits");
    return false;
  }
  else {
    return true;
  }
};
