// models/Payment.js
const mongoose = require("mongoose");

const PaymentSchema = new mongoose.Schema({
  paymentId: { type: String, required: true },
  orderId: { type: String, required: true },
  amount: { type: Number, required: true },
  status: { type: String, required: true, default: "pending" },
});

const Payment = mongoose.model("Payment", PaymentSchema);
module.exports = Payment;
