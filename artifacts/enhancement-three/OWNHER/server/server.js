const express = require("express");
const cors = require("cors");
require("dotenv").config();
const db = require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("OWNHER backend is running");
});

// Retrieve all OWNHER products from the MySQL database.
app.get("/api/products", async (req, res) => {
  try {
    const [products] = await db.query(
      `
  SELECT
    product_id AS id,
    name,
    category,
    CAST(price AS DOUBLE) AS price,
    shade,
    stock,
    description,
    image
  FROM products
  ORDER BY product_id
`
    );

    res.json(products);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({
      message: "Unable to retrieve products.",
    });
  }
});

// Create an order and update inventory using a MySQL transaction.
app.post("/api/orders", async (req, res) => {
  const {
    customerName,
    customerEmail,
    address,
    city,
    state,
    zipCode,
    paymentMethod,
    note,
    items,
  } = req.body;

  // Basic validation before accessing the database.
  if (
    !customerName ||
    !customerEmail ||
    !address ||
    !city ||
    !state ||
    !zipCode ||
    !paymentMethod ||
    !Array.isArray(items) ||
    items.length === 0
  ) {
    return res.status(400).json({
      message: "Missing required order information.",
    });
  }

  let connection;

  try {
    connection = await db.getConnection();

    // All database changes must succeed together.
    await connection.beginTransaction();

    let orderTotal = 0;
    const validatedItems = [];

    // Check every product against the current MySQL inventory.
    for (const item of items) {
      const quantity = Number(item.quantity);

      if (!Number.isInteger(quantity) || quantity <= 0) {
        throw new Error("Invalid product quantity.");
      }

      const [rows] = await connection.query(
        `
        SELECT
          product_id,
          name,
          CAST(price AS DOUBLE) AS price,
          stock
        FROM products
        WHERE product_id = ?
        FOR UPDATE
        `,
        [item.id]
      );

      if (rows.length === 0) {
        throw new Error("A product in your cart no longer exists.");
      }

      const product = rows[0];

      if (product.stock < quantity) {
        throw new Error(
          `${product.name} only has ${product.stock} item(s) available.`
        );
      }

      // Use the database price instead of trusting the browser.
      orderTotal += product.price * quantity;

      validatedItems.push({
        id: product.product_id,
        name: product.name,
        price: product.price,
        quantity,
      });
    }

    // Creation of the main order record.
    const [orderResult] = await connection.query(
      `
      INSERT INTO orders
      (
        customer_name,
        customer_email,
        address,
        city,
        state,
        zip_code,
        payment_method,
        note,
        status,
        total
      )
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `,
      [
        customerName,
        customerEmail,
        address,
        city,
        state,
        zipCode,
        paymentMethod,
        note || null,
        "Confirmed",
        orderTotal,
      ]
    );

    const orderId = orderResult.insertId;

    // Save each item and permanently reduce its inventory.
    for (const item of validatedItems) {
      await connection.query(
        `
        INSERT INTO order_items
        (order_id, product_id, quantity, price)
        VALUES (?, ?, ?, ?)
        `,
        [orderId, item.id, item.quantity, item.price]
      );

      await connection.query(
        `
        UPDATE products
        SET stock = stock - ?
        WHERE product_id = ?
        `,
        [item.quantity, item.id]
      );
    }

    // Make all order and inventory changes permanent.
    await connection.commit();

    res.status(201).json({
      message: "Order placed successfully.",
      orderId,
      total: orderTotal,
    });
  } catch (error) {
    // Undo every database change if any part of the order fails.
    if (connection) {
      await connection.rollback();
    }

    console.error("Error creating order:", error);

    res.status(400).json({
      message: error.message || "Unable to place order.",
    });
  } finally {
    if (connection) {
      connection.release();
    }
  }
});

// Retrieve a customer's orders and order items from MySQL.
app.get("/api/orders", async (req, res) => {
  const { email } = req.query;

  if (!email) {
    return res.status(400).json({
      message: "Customer email is required.",
    });
  }

  try {
    const [rows] = await db.query(
      `
      SELECT
        o.order_id,
        o.customer_name,
        o.customer_email,
        o.address,
        o.city,
        o.state,
        o.zip_code,
        o.payment_method,
        o.order_date,
        o.status,
        CAST(o.total AS DOUBLE) AS total,
        oi.order_item_id,
        oi.product_id,
        oi.quantity,
        CAST(oi.price AS DOUBLE) AS price,
        p.name AS product_name
      FROM orders o
      LEFT JOIN order_items oi
        ON o.order_id = oi.order_id
      LEFT JOIN products p
        ON oi.product_id = p.product_id
      WHERE o.customer_email = ?
      ORDER BY o.order_date DESC, oi.order_item_id
      `,
      [email]
    );

    const orders = [];

    for (const row of rows) {
      let order = orders.find(
        (existingOrder) => existingOrder.id === row.order_id
      );

      if (!order) {
        order = {
          id: row.order_id,
          customerName: row.customer_name,
          customerEmail: row.customer_email,
          address: row.address,
          city: row.city,
          state: row.state,
          zipCode: row.zip_code,
          paymentMethod: row.payment_method,
          createdAt: row.order_date,
          status: row.status,
          total: row.total,
          items: [],
        };

        orders.push(order);
      }

      if (row.order_item_id) {
        order.items.push({
          id: row.product_id,
          name: row.product_name,
          quantity: row.quantity,
          price: row.price,
        });
      }
    }

    res.json(orders);
  } catch (error) {
    console.error("Error retrieving orders:", error);

    res.status(500).json({
      message: "Unable to retrieve orders.",
    });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});