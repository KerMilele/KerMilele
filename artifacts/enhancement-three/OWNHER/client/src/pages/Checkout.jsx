import { useState } from "react";
import { useNavigate } from "react-router-dom";


function Checkout({ cartItems, clearCart, user }) {
  const navigate = useNavigate();

  const [paymentMethod, setPaymentMethod] = useState("card");
  const [formData, setFormData] = useState({
    fullName: "",
    email: user?.email || "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    cardName: "",
    cardNumber: "",
    expiry: "",
    cvv: "",
    note: "",
  });

  const [message, setMessage] = useState("");

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      setMessage("Please log in before placing an order.");
      return;
    }

    if (cartItems.length === 0) {
      setMessage("Your cart is empty.");
      return;
    }
    // Final inventory check before placing the order
const unavailableItem = cartItems.find(
  (item) => item.stock <= 0 || item.quantity > item.stock
);

if (unavailableItem) {
  setMessage(
    `${unavailableItem.name} does not have enough stock available.`
  );
  return;
}

    if (paymentMethod === "card") {
      if (
        !formData.cardName ||
        !formData.cardNumber ||
        !formData.expiry ||
        !formData.cvv
      ) {
        setMessage("Please complete your card details.");
        return;
      }
    }
// Send the order to the Express backend.
// The backend checks the current MySQL inventory before saving the order.
const newOrder = {
  customerName: formData.fullName,
  customerEmail: formData.email,
  address: formData.address,
  city: formData.city,
  state: formData.state,
  zipCode: formData.zipCode,
  paymentMethod,
  note: formData.note,

  // Only send the product ID and requested quantity.
  // The backend gets the real price and stock directly from MySQL.
  items: cartItems.map((item) => ({
    id: item.id,
    quantity: item.quantity,
  })),
};

try {
  const response = await fetch("http://localhost:5000/api/orders", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(newOrder),
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Unable to place order.");
  }

  clearCart();

  navigate("/order-confirmation", {
    state: {
      fullName: formData.fullName,
      email: formData.email,
      paymentMethod,
      total: data.total,
      orderId: data.orderId,
    },
  });
} catch (error) {
  console.error("Order error:", error);
  setMessage(error.message || "Failed to place order.");
}
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Checkout</h1>

      <div style={styles.wrapper}>
        <form style={styles.form} onSubmit={handleSubmit}>
          <h2 style={styles.sectionTitle}>Shipping Information</h2>

          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="address"
            placeholder="Address"
            value={formData.address}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="city"
            placeholder="City"
            value={formData.city}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="state"
            placeholder="State"
            value={formData.state}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <input
            type="text"
            name="zipCode"
            placeholder="ZIP Code"
            value={formData.zipCode}
            onChange={handleChange}
            style={styles.input}
            required
          />

          <textarea
            name="note"
            placeholder="Order note (optional)"
            value={formData.note}
            onChange={handleChange}
            style={styles.textarea}
          />

          <h2 style={styles.sectionTitle}>Payment Method</h2>

          <div style={styles.paymentOptions}>
            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="paymentMethod"
                value="card"
                checked={paymentMethod === "card"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Card
            </label>

            <label style={styles.radioLabel}>
              <input
                type="radio"
                name="paymentMethod"
                value="paypal"
                checked={paymentMethod === "paypal"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              PayPal
            </label>
          </div>

          {paymentMethod === "card" ? (
            <div style={styles.paymentBox}>
              <input
                type="text"
                name="cardName"
                placeholder="Name on Card"
                value={formData.cardName}
                onChange={handleChange}
                style={styles.input}
              />
              <input
                type="text"
                name="cardNumber"
                placeholder="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
                style={styles.input}
              />
              <div style={styles.row}>
                <input
                  type="text"
                  name="expiry"
                  placeholder="MM/YY"
                  value={formData.expiry}
                  onChange={handleChange}
                  style={styles.input}
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder="CVV"
                  value={formData.cvv}
                  onChange={handleChange}
                  style={styles.input}
                />
              </div>
            </div>
          ) : (
            <div style={styles.paypalBox}>
              <p style={styles.paypalText}>
                PayPal selected. You can continue with PayPal-style checkout flow.
              </p>
            </div>
          )}

          <button type="submit" style={styles.button}>
            Confirm Order
          </button>

          {message && <p style={styles.message}>{message}</p>}
        </form>

        <div style={styles.summary}>
          <h2 style={styles.sectionTitle}>Order Summary</h2>

          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {cartItems.map((item) => (
                <div key={item.id} style={styles.itemRow}>
                  <span>
                    {item.name} x {item.quantity}
                  </span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </div>
              ))}

              <hr style={styles.line} />

              <div style={styles.totalRow}>
                <strong>Total</strong>
                <strong>${totalPrice.toFixed(2)}</strong>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

//styles

const styles = {
  container: {
    padding: "50px 30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    color: "#9D825D",
    fontSize: "2.5rem",
    marginBottom: "30px",
  },
  wrapper: {
    display: "grid",
    gridTemplateColumns: "1.2fr 0.8fr",
    gap: "30px",
    alignItems: "start",
  },
  form: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  summary: {
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  sectionTitle: {
    color: "#7a284b",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    minHeight: "90px",
  },
  paymentOptions: {
    display: "flex",
    gap: "20px",
    marginBottom: "20px",
  },
  radioLabel: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    color: "#333",
  },
  paymentBox: {
    marginBottom: "10px",
  },
  paypalBox: {
    marginBottom: "20px",
    padding: "16px",
    borderRadius: "10px",
    backgroundColor: "#fff6fa",
    border: "1px solid #f0d6e2",
  },
  paypalText: {
    color: "#555",
    margin: 0,
  },
  row: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
  },
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#9D825D",
    color: "#fff",
    cursor: "pointer",
    fontSize: "1rem",
  },
  message: {
    marginTop: "15px",
    color: "#444",
    textAlign: "center",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "12px",
    color: "#333",
    gap: "15px",
  },
  line: {
    margin: "20px 0",
    border: "none",
    borderTop: "1px solid #ddd",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    color: "#7a284b",
    fontSize: "1.1rem",
  },
};

export default Checkout;