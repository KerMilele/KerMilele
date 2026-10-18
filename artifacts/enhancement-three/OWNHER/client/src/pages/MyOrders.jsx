import { useEffect, useState } from "react";


function MyOrders({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) {
        setOrders([]);
        setLoading(false);
        return;
      }
  
      try {
        setLoading(true);
  
        const response = await fetch(
          `http://localhost:5000/api/orders?email=${encodeURIComponent(
            user.email
          )}`
        );
  
        if (!response.ok) {
          throw new Error("Unable to retrieve orders.");
        }
  
        const data = await response.json();
  
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOrders();
  }, [user]);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>My Orders</h1>

      {!user ? (
        <p style={styles.empty}>Please log in to view your orders.</p>
      ) : loading ? (
        <p style={styles.empty}>Loading orders...</p>
      ) : orders.length === 0 ? (
        <p style={styles.empty}>You have no orders yet.</p>
      ) : (
        <div style={styles.list}>
          {orders.map((order) => (
            <div key={order.id} style={styles.card}>
              <div style={styles.topRow}>
                <div>
                  <h3 style={styles.orderTitle}>Order #{order.id}</h3>
                  <p style={styles.meta}>{order.createdAt}</p>
                </div>
                <span style={styles.status}>{order.status}</span>
              </div>

              <p style={styles.meta}>
                Payment: {order.paymentMethod === "card" ? "Card" : "PayPal"}
              </p>
              <p style={styles.meta}>
              Ship to: {order.customerName}, {order.address}, {order.city},{" "}
              {order.state} {order.zipCode}
              </p>

              <div style={styles.items}>
                {order.items.map((item, index) => (
                  <div key={index} style={styles.itemRow}>
                    <span>
                      {item.name} x {item.quantity}
                    </span>
                    <span>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div style={styles.totalRow}>
                <strong>Total</strong>
                <strong>${order.total.toFixed(2)}</strong>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

const styles = {
  container: {
    padding: "50px 30px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    color: "#9D825D",
    fontSize: "2.5rem",
    marginBottom: "30px",
  },
  empty: {
    textAlign: "center",
    color: "#555",
  },
  list: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  topRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "12px",
    marginBottom: "12px",
  },
  orderTitle: {
    color: "#9D825D",
    margin: 0,
  },
  status: {
    backgroundColor: "#9D825D",
    color: "#7a284b",
    padding: "6px 12px",
    borderRadius: "999px",
    fontWeight: "bold",
  },
  meta: {
    color: "#555",
    marginBottom: "8px",
  },
  items: {
    marginTop: "16px",
    marginBottom: "16px",
  },
  itemRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "10px",
    gap: "12px",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    borderTop: "1px solid #eee",
    paddingTop: "14px",
    color: "#9D825D",
  },
};

export default MyOrders;