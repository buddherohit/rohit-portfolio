import express from "express";
import crypto from "crypto";
import Razorpay from "razorpay";
import authMiddleware from "../middleware/authMiddleware.js";
import User from "../models/User.js";
import Order from "../models/Order.js";

const router = express.Router();

// Initialize Razorpay
const getRazorpayInstance = () => {
  return new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID || "rzp_test_mockkeyid123",
    key_secret: process.env.RAZORPAY_KEY_SECRET || "mocksecret12345",
  });
};

// Database helper functions supporting mock database fallback
const findUserById = async (id) => {
  if (global.dbMode === "mock") {
    return global.mockUsers.find((u) => u._id === id);
  }
  return await User.findById(id);
};

const updateUserUnlock = async (user) => {
  if (global.dbMode === "mock") {
    user.placementKitUnlocked = true;
    return user;
  }
  user.placementKitUnlocked = true;
  return await user.save();
};

const findPaidOrderForUser = async (userId) => {
  if (global.dbMode === "mock") {
    return global.mockOrders.find((o) => o.userId === userId && o.status === "paid");
  }
  return await Order.findOne({ userId, status: "paid" });
};

const createOrderRecord = async (userId, orderId, amount) => {
  if (global.dbMode === "mock") {
    const newOrder = {
      _id: `mock_order_${Date.now()}`,
      userId,
      razorpayOrderId: orderId,
      amount,
      status: "created",
      createdAt: new Date(),
    };
    global.mockOrders.push(newOrder);
    return newOrder;
  }
  const order = new Order({
    userId,
    razorpayOrderId: orderId,
    amount,
    status: "created",
  });
  return await order.save();
};

const findOrderById = async (orderId) => {
  if (global.dbMode === "mock") {
    return global.mockOrders.find((o) => o.razorpayOrderId === orderId);
  }
  return await Order.findOne({ razorpayOrderId: orderId });
};

const updateOrderPayment = async (order, paymentId, signature) => {
  order.razorpayPaymentId = paymentId;
  order.razorpaySignature = signature;
  order.status = "paid";
  if (global.dbMode === "mock") {
    return order;
  }
  return await order.save();
};

// @route   POST /api/payments/create-order
// @desc    Create a new payment order with Razorpay
router.post("/create-order", authMiddleware, async (req, res) => {
  try {
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.placementKitUnlocked) {
      return res.status(400).json({ message: "Placement Success Kit is already unlocked for this account!" });
    }

    // Check if there's an existing paid transaction for safety
    const existingPaid = await findPaidOrderForUser(user._id);
    if (existingPaid) {
      await updateUserUnlock(user);
      return res.status(400).json({ message: "Purchase already completed. Access unlocked!" });
    }

    const { amount, currency, receipt } = req.body;

    // Validate amount
    if (amount === undefined || amount === null || typeof amount !== "number") {
      return res.status(400).json({ message: "Amount is required and must be a number" });
    }
    if (amount < 100) {
      return res.status(400).json({ message: "Amount must be at least 100 paise (₹1)" });
    }

    const finalCurrency = currency || "INR";
    const finalReceipt = receipt || `receipt_${user._id}_${Date.now()}`;

    const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_mockkeyid123";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "mocksecret12345";
    const isMockRzp = keyId === "rzp_test_mockkeyid123" || keySecret === "mocksecret12345";

    let orderId;

    if (isMockRzp) {
      orderId = `order_mock_${Date.now()}`;
    } else {
      try {
        const rzp = getRazorpayInstance();
        const rzpOrder = await rzp.orders.create({
          amount,
          currency: finalCurrency,
          receipt: finalReceipt,
        });
        orderId = rzpOrder.id;
      } catch (rzpErr) {
        console.error("Razorpay API call failed:", rzpErr);
        return res.status(500).json({ message: rzpErr.message || "Failed to create order via Razorpay API" });
      }
    }

    // Save order in local DB
    await createOrderRecord(user._id, orderId, amount);

    res.json({
      orderId,
      order_id: orderId,
      amount,
      currency: finalCurrency,
      keyId,
    });
  } catch (err) {
    console.error("Create order error:", err);
    res.status(500).json({ message: "Failed to create payment order" });
  }
});

// @route   POST /api/payments/verify-payment
// @desc    Verify payment signature and unlock premium access
router.post("/verify-payment", authMiddleware, async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
    return res.status(400).json({ message: "Missing signature fields" });
  }

  try {
    const keyId = process.env.RAZORPAY_KEY_ID || "rzp_test_mockkeyid123";
    const keySecret = process.env.RAZORPAY_KEY_SECRET || "mocksecret12345";
    const isMock = keyId === "rzp_test_mockkeyid123";

    let signatureValid = false;

    if (isMock || razorpay_order_id.startsWith("order_mock_") || razorpay_signature === "mock_signature") {
      // Auto-approve in mock sandbox settings
      signatureValid = true;
    } else {
      // Verify Razorpay signature
      const hmac = crypto.createHmac("sha256", keySecret);
      hmac.update(razorpay_order_id + "|" + razorpay_payment_id);
      const generated_signature = hmac.digest("hex");
      signatureValid = generated_signature === razorpay_signature;
    }

    if (!signatureValid) {
      return res.status(400).json({ message: "Invalid signature, verification failed" });
    }

    // Find the order in DB
    const order = await findOrderById(razorpay_order_id);
    if (!order) {
      return res.status(404).json({ message: "Order records not found in database" });
    }

    // Update order status
    await updateOrderPayment(order, razorpay_payment_id, razorpay_signature);

    // Unlock Placement Kit for User
    const user = await findUserById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    await updateUserUnlock(user);

    res.json({
      message: "Payment verified successfully, access unlocked permanently!",
      unlocked: true,
    });
  } catch (err) {
    console.error("Payment verification error:", err);
    res.status(500).json({ message: "Server error during payment verification" });
  }
});

export default router;
