const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const Razorpay = require("razorpay");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const crypto = require("crypto");
const Payment = require("./models/Payment"); // Import the Payment model
const Order = require("./models/Order"); // Import the Order model

dotenv.config(); // Load environment variables from .env file

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Endpoint to create an order and save it to the database
app.post("/api/payment/create-order", async (req, res) => {
  const { amount, email, items } = req.body;

  // Validate required fields
  if (!amount || !email || !items) {
    return res
      .status(400)
      .json({ success: false, message: "Missing required fields" });
  }

  const options = {
    amount: amount, // amount should be in paise
    currency: "INR",
    receipt: "receipt#1",
    payment_capture: 1, // auto-capture payment
  };

  try {
    const order = await razorpay.orders.create(options);
    console.log("Razorpay order response:", order); // Log Razorpay response

    // Save order details to MongoDB
    const newOrder = new Order({
      email: email,
      items: items,
      total: amount / 100, // Convert paise to rupees
    });

    await newOrder.save(); // Save the order to MongoDB

    res.status(200).json(order);
  } catch (error) {
    console.error("Error creating order:", error); // Log detailed error
    res.status(500).json({ success: false, message: "Failed to create order" });
  }
});

// Endpoint to verify payment
app.post("/api/payment/verify", async (req, res) => {
  const { payment_id, order_id, amount, signature } = req.body;

  // Verify payment signature
  const hmac = crypto.createHmac("sha256", process.env.RAZORPAY_SECRET);
  hmac.update(order_id + "|" + payment_id);
  const generatedSignature = hmac.digest("hex");

  if (generatedSignature === signature) {
    // Save payment details to MongoDB
    const payment = new Payment({
      paymentId: payment_id,
      orderId: order_id,
      amount: amount,
      status: "completed",
    });

    try {
      await payment.save();
      res.status(200).json({
        success: true,
        message: "Payment verified and saved",
        payment,
      });
    } catch (err) {
      console.error("Error saving payment details:", err);
      res
        .status(500)
        .json({ success: false, message: "Failed to save payment details" });
    }
  } else {
    res.status(400).json({ success: false, message: "Invalid signature" });
  }
});

// Endpoint to get all payments
app.get("/api/payments", async (req, res) => {
  try {
    const payments = await Payment.find();
    res.status(200).json(payments);
  } catch (err) {
    console.error("Error fetching payments:", err);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch payments" });
  }
});

// Endpoint to get orders by user email
app.get("/api/orders", async (req, res) => {
  const userEmail = req.query.email; // Get email from query parameters
  try {
    const userOrders = await Order.find({ email: userEmail });

    if (userOrders.length > 0) {
      res.status(200).json(userOrders);
    } else {
      res.status(404).json({ success: false, message: "No orders found" });
    }
  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ success: false, message: "Failed to fetch orders" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
