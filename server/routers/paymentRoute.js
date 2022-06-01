const express = require("express");
const router = express.Router();
const { isAuthenticatedUser } = require("../Auth/auth");
const {
  processPaymentController,
  sendStrpeApiKeyController,
} = require("../controllers/paymentController");

router.post("/payment/process", isAuthenticatedUser, processPaymentController);
router.get("/stripeapikey", isAuthenticatedUser, sendStrpeApiKeyController);
module.exports = router;
