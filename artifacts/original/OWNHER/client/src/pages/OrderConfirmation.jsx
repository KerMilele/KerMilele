import { Link, useLocation } from "react-router-dom";

function OrderConfirmation() {
  const location = useLocation();
  const orderData = location.state;

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Thank You for Your Order</h1>
        <p style={styles.text}>
          Your order has been placed successfully.
        </p>

        {orderData && (
          <div style={styles.summary}>
            <p><strong>Name:</strong> {orderData.fullName}</p>
            <p><strong>Email:</strong> {orderData.email}</p>
            <p><strong>Payment:</strong> {orderData.paymentMethod === "card" ? "Card" : "PayPal"}</p>
            <p><strong>Total:</strong> ${orderData.total.toFixed(2)}</p>
          </div>
        )}

        <div style={styles.buttons}>
          <Link to="/my-orders" style={styles.button}>
            View My Orders
          </Link>
          <Link to="/products" style={styles.secondaryButton}>
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "80vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "30px",
  },
  card: {
    maxWidth: "650px",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: "14px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
    padding: "35px",
    textAlign: "center",
  },
  title: {
    color: "#9D825D",
    marginBottom: "15px",
  },
  text: {
    color: "#444",
    marginBottom: "25px",
    lineHeight: "1.8",
  },
  summary: {
    textAlign: "left",
    backgroundColor: "#fff6fa",
    borderRadius: "12px",
    padding: "20px",
    marginBottom: "25px",
    lineHeight: "1.9",
  },
  buttons: {
    display: "flex",
    justifyContent: "center",
    gap: "12px",
    flexWrap: "wrap",
  },
  button: {
    padding: "12px 18px",
    backgroundColor: "#9D825D",
    color: "#fff",
    borderRadius: "8px",
    textDecoration: "none",
  },
  secondaryButton: {
    padding: "12px 18px",
    backgroundColor: "#f8d7da",
    color: "#9D825D",
    borderRadius: "8px",
    textDecoration: "none",
  },
};

export default OrderConfirmation;