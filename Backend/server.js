require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mysql = require("mysql2");
const Razorpay = require("razorpay");
const startAutoStatusUpdater = require("./utils/autoStatusUpdater");

const razorpay = new Razorpay({
  key_id: "rzp_test_TBKvEUNJHKl8M9",
  key_secret: "emAGyS2DXvduLShanu8DqDQm",
});

const app = express();

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  ssl: {
    rejectUnauthorized: false
  }
});
db.connect((err) => {
  if (err) throw err;
    console.log("MySQL Connected...");
  startAutoStatusUpdater(db);
  });

app.post("/signup", (req, res) => {
    const { name, email, password } = req.body;

    const sql =
        "INSERT INTO users(name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, password], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                message: "Signup Failed"
            });
        }

        res.json({
            message: "Signup Successful"
        });
    });
});

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql =
        "SELECT * FROM users WHERE email=? AND password=?";

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            console.log(err);
            return res.status(500).json({
                success: false
            });
        }

        if (result.length > 0) {
            res.json({
                success: true,
                message: "Login Successful",
                user: { name: result[0].name, email: result[0].email }
            });
        } else {
            res.json({
                success: false,
                message: "Invalid Credentials"
            });
        }
    });
});

const products = [
  {
    id: 1,
    name: "Amul Milk",
    price: 32,
    image: "/assets/AmulMilk.png",
  },
  {
    id: 2,
    name: "Bread",
    price: 40,
    image: "/assets/Bread.png",
  },
  {
    id: 3,
    name: "Coca Cola",
    price: 45,
    image: "/assets/Coke.png",
  },
  {
    id: 4,
    name: "Banana",
    price: 45,
    image: "/assets/Banana.png",
  }
];
let cart = [];
app.get("/cart", (req, res) => {
  res.json(cart);
});

app.post("/cart", (req, res) => {
  cart.push(req.body);
  res.json({
    message: "Product added to cart",
    cart,
  });
});
app.get("/", (req, res) => {
  res.send("Backend Running 🚀");
});

app.get("/products", (req, res) => {
  db.query("SELECT * FROM products", (err, result) => {
    if (err) return res.status(500).json({ error: "Failed to fetch products" });
    res.json(result);
  });
});

app.post("/products", (req, res) => {
  const { name, price, image, category } = req.body;
  db.query(
    "INSERT INTO products (name, price, image, category) VALUES (?, ?, ?, ?)",
    [name, price, image, category],
    (err, result) => {
      if (err) return res.status(500).json({ error: "Failed to add product" });
      res.json({ message: "Product added", id: result.insertId });
    }
  );
});

app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const { name, price, image, category } = req.body;
  db.query(
    "UPDATE products SET name=?, price=?, image=?, category=? WHERE id=?",
    [name, price, image, category, id],
    (err) => {
      if (err) return res.status(500).json({ error: "Failed to update product" });
      res.json({ message: "Product updated" });
    }
  );
});

app.delete("/products/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM products WHERE id=?", [id], (err) => {
    if (err) return res.status(500).json({ error: "Failed to delete product" });
    res.json({ message: "Product deleted" });
  });
});

app.get("/cart", (req, res) => {
  res.json(cart);
});

app.post("/cart", (req, res) => {
  const { productId, quantity } = req.body;
  const product = products.find((p) => p.id === productId);
  if (!product) {
    return res.status(404).json({ error: "Product not found" });
  }
  cart.push({ ...product, quantity });
  res.json({ message: "Product added to cart" });
});
// Update Quantity
app.put("/cart/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const { action } = req.body;

  if (!cart[index]) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  if (action === "increase") {
    cart[index].quantity =
      (cart[index].quantity || 1) + 1;
  }

  if (action === "decrease") {
    if ((cart[index].quantity || 1) > 1) {
      cart[index].quantity--;
    }
  }

  res.json(cart);
});

// Delete Product
app.delete("/cart/:index", (req, res) => {
  const index = parseInt(req.params.index);

  if (!cart[index]) {
    return res.status(404).json({
      error: "Product not found",
    });
  }

  cart.splice(index, 1);

  res.json(cart);
});
app.put("/cart/:index", (req, res) => {
  const index = parseInt(req.params.index);
  const { action } = req.body;

  if (!cart[index]) {
    return res.status(404).json({
      error: "Product not found"
    });
  }

  if (action === "increase") {
    cart[index].quantity =
      (cart[index].quantity || 1) + 1;
  }

  if (action === "decrease") {
    if ((cart[index].quantity || 1) > 1) {
      cart[index].quantity--;
    }
  }

  res.json(cart);
});
app.post("/orders", (req, res) => {
  const { user_email, items, total_price, address, payment_method } = req.body;
  const sql = "INSERT INTO orders (user_email, items, total_price, address, payment_method) VALUES (?, ?, ?, ?, ?)";
  db.query(sql, [user_email, JSON.stringify(items), total_price, address, payment_method], (err, result) => {
    if (err) {
      console.error("Error inserting order:", err);
      return res.status(500).json({ error: "Failed to create order" });
    }
    res.json({ message: "Order created successfully" });
  });
});
app.get("/orders/:email", (req, res) => {
  const {email} = req.params;
  const sql = "SELECT * FROM orders WHERE user_email = ?";
  db.query(sql, [email], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to fetch orders" });
    }
    res.json(results);
  });
});
app.put("/orders/:id/status", (req, res) => {
  const { id } = req.params;
  const { status } = req.body;
  const sql = "UPDATE orders SET status = ? WHERE id = ?";
  db.query(sql, [status, id], (err, result) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ message: "Failed to update order status" });
    }
    res.json({ message: "Order status updated successfully" });
  });
});
app.post("/create-razorpay-order", async (req, res) => {
  const { amount } = req.body;
  try {
    const order = await razorpay.orders.create({
      amount: amount * 100, // Amount in paise
      currency: "INR",
      receipt: "receipt_" + Date.now(),
    });
    res.json(order);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Failed to create Razorpay order" });
  }
});
app.listen(5000, () => {
  console.log("Server running on port 5000");
});