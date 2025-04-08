const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const Razorpay = require("razorpay");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const router = express.Router();
const crypto = require('crypto');
require("dotenv").config(); // Load environment variables
const Users = require("./models/user");
const Product = require("./models/product");

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(cors());

// Database connection with MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected successfully"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.get("/", (req, res) => res.send("Express App is running"));

// Image storage engine
const storage = multer.diskStorage({
  destination: "./upload/images",
  filename: (req, file, cb) => {
    return cb(
      null,
      `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`
    );
  },
});

const upload = multer({ storage: storage });

// Upload endpoint for images
app.use("/images", express.static("upload/images"));

app.post("/upload", upload.single("product"), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`,
  });
});

// API for adding products
app.post("/addproduct", async (req, res) => {
  let products = await Product.find({}); //return array of products
  let id = products.length + 1;
  const product = new Product({
    id: id,
    name: req.body.name,
    image: req.body.image,
    category: req.body.category,
    new_price: req.body.new_price,
    old_price: req.body.old_price,
  });
  await product.save();
  console.log(product);
  res.json({
    success: true,
    name: req.body.name,
  });
});

// API for deleting products
app.post("/removeproduct", async (req, res) => {
  await Product.findOneAndDelete({ id: req.body.id });
  res.json({
    success: true,
    name: req.body.name,
  });
});

// API for getting all products
app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  res.json(products);
});

// API for new collections
app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let newcollection = products.slice(Math.max(products.length - 8, 0));
  res.send(newcollection);
});

// API for popular products in women's category
app.get("/popularinwomen", async (req, res) => {
  let products = await Product.find({ category: "women" });
  let popular_women = products.slice(0, 4);
  res.send(popular_women);
});

// API for popular products in men's category
app.get("/popularinmen", async (req, res) => {
  let products = await Product.find({ category: "men" });
  let popular_men = products.slice(0, 4);
  res.send(popular_men);
});

// Middleware to fetch user and convert auth token to user id
const fetchUser = async (req, res, next) => {
  const token = req.header("auth-token");

  if (!token) {
    return res
      .status(401)
      .send({ errors: "Please authenticate using a valid token" });
  } else {
    try {
      const data = jwt.verify(token, "secret_ecom");
      req.user = data.user;
      next();
    } catch (error) {
      res
        .status(401)
        .send({ errors: "Please authenticate using a valid token" });
    }
  }
};

// API for user signup
app.post("/signup", async (req, res) => {
  let check = await Users.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).json({
      success: false,
      errors: "existing user with same email id ",
    });
  }
  let cart = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
  }
  const user = new Users({
    //instance of users model
    name: req.body.username,
    email: req.body.email,
    password: req.body.password,
    cartData: cart,
  });
  await user.save();
  const data = {
    user: {
      id: user.id, //id generated by mongo db
    },
  };
  const token = jwt.sign(data, "secret_ecom");
  res.json({
    success: true,
    token,
  });
});

// API for user login
app.post("/login", async (req, res) => {
  let user = await Users.findOne({ email: req.body.email });
  if (user) {
    const passCompare = req.body.password === user.password;
    if (passCompare) {
      const data = {
        user: {
          id: user.id,
        },
      };
      const token = jwt.sign(data, "secret_ecom");
      res.json({ success: true, token });
    } else {
      res.json({ success: false, errors: "wrong password" });
    }
  } else {
    res.json({ success: false, error: "Wrong Email Id" });
  }
});

// API for adding items to cart
app.post("/addtocart", fetchUser, async (req, res) => {
  try {
    const itemId = req.body.itemId;
    const result = await Users.findOneAndUpdate(
      { _id: req.user.id },
      { $inc: { [`cartData.${itemId}`]: 1 } },
      { new: true }
    );
    res.json({ success: true, cartData: result.cartData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API for removing items from cart
app.post("/removefromcart", fetchUser, async (req, res) => {
  try {
    const itemId = req.body.itemId;

    const result = await Users.findOneAndUpdate(
      { _id: req.user.id },
      { $inc: { [`cartData.${itemId}`]: -1 } },
      { new: true }
    );
    res.json({ success: true, cartData: result.cartData });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// API for getting cart items
app.post("/getcart", fetchUser, async (req, res) => {
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

//app.listen(port, () => console.log(`Server running on port ${port}`));

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_API_KEY,
  key_secret: process.env.RAZORPAY_API_SECRET,
});

// Payment Routes
app.post("/payment/process", async (req, res) => {
  try {
    const options = {
      amount: Number(req.body.amount), // Convert to paise
      currency: "INR",
      receipt: `receipt_${Date.now()}`,
    };
    
    const order = await razorpay.orders.create(options);
    
    res.status(200).json({
      success: true,
      order,
    });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create payment order",
      error: error.message,
    });
  }
});

app.post("/payment/verify", async (req, res) => {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = req.body;

  try {
    // Create the expected signature
    const generated_signature = crypto
      .createHmac("sha256", process.env.RAZORPAY_API_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    // Verify the signature
    if (generated_signature !== razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Payment verification failed: Invalid signature",
      });
    }

    // Here you would typically:
    // 1. Save the payment details to your database
    // 2. Update order status
    // 3. Send confirmation email, etc.

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    res.status(500).json({
      success: false,
      message: "Payment verification failed",
      error: error.message,
    });
  }
});

app.get("/payment/getkey", (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: "Internal server error",
    error: err.message,
  });
});

app.listen(port, (error) => {
  if (!error) {
    console.log("Server running on port" + port);
  } else {
    console.log("Error :" + error);
  }
});
