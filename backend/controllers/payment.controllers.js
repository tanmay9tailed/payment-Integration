const { createRazorpayInstance } = require("../config/razorpay.config");
const crypto = require("crypto");

const razorpayInstance = createRazorpayInstance();

async function createOrder(req, res) {
  const { name, price } = req.body;

  const options = {
    amount: price * 100,
    currency: "INR",
  };

  try {
    razorpayInstance.orders.create(options, (err, order) => {
      if (err) {
        return res.status(500).json({
          success: false,
          message: "Order not created",
        });
      }
      return res.status(200).json({
        success: true,
        message: order,
      });
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Order not created :" + error,
    });
  }
}

async function verifyPayment(req, res) {
  const { order_id, payment_id, signature } = req.body;
  const secret = process.env.RAZORPAY_KEY_SECRET;

  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(order_id + "|" + payment_id);

  const generateSignature = hmac.digest("hex");

  if (generateSignature === signature) {
    return res.status(200).json({
      success: true,
      message: "Payment Verified",
    });
  } else {
    return res.status(500).json({
      success: false,
      message: "Payment Not Verified",
    });
  }
}

module.exports = {
  createOrder,
  verifyPayment,
};
