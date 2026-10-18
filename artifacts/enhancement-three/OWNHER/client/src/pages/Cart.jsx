import { useNavigate } from "react-router-dom";
import productImages from "../data/productImages";

function Cart({
  cartItems,
  removeFromCart,
  increaseQuantity,
  decreaseQuantity,
  clearCart,
}) {
  const navigate = useNavigate();

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Your Cart</h1>

      {cartItems.length === 0 ? (
        <p style={styles.empty}>Your cart is empty.</p>
      ) : (
        <>
          <div style={styles.cartList}>
            {cartItems.map((item) => (
              <div key={item.id} style={styles.card}>
                <img src={productImages[item.image]} alt={item.name} style={styles.image} />

                <div style={styles.info}>
                  <h3>{item.name}</h3>
                  <p>Price: ${item.price}</p>
                  <p>Available stock: {item.stock}</p>
                  <p>Total: ${(item.price * item.quantity).toFixed(2)}</p>

                  <div style={styles.quantityBox}>
                    <button
                      style={styles.qtyButton}
                      onClick={() => decreaseQuantity(item.id)}
                    >
                      -
                    </button>
                    <span style={styles.quantity}>{item.quantity}</span>
                    {/* Disable the increase button when the available stock is reached. */}
                    <button
                       style={{
                        ...styles.qtyButton,
                        ...(item.quantity >= item.stock ? styles.disabledQtyButton : {}),
                      }}
                      onClick={() => increaseQuantity(item.id)}
                      disabled={item.quantity >= item.stock}
                    >
                      +
                    </button>
                  </div>
                  {/* Let the customer know why the quantity cannot be increased. */}
                  {item.quantity >= item.stock && (
              <p style={styles.stockMessage}>Maximum stock reached</p>
                   )}

                  <button
                    style={styles.removeButton}
                    onClick={() => removeFromCart(item.id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div style={styles.summary}>
            <h2 style={styles.total}>Grand Total: ${totalPrice.toFixed(2)}</h2>

            <div style={styles.actions}>
              <button style={styles.clearButton} onClick={clearCart}>
                Clear Cart
              </button>
              <button
                style={styles.checkoutButton}
                onClick={() => navigate("/checkout")}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

//styles

const styles = {
  container: {
    padding: "50px 30px",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  title: {
    color: "#9D825D",
    marginBottom: "30px",
    textAlign: "center",
    fontSize: "2.5rem",
  },
  empty: {
    textAlign: "center",
    color: "#555",
    fontSize: "1.1rem",
  },
  cartList: {
    display: "flex",
    flexDirection: "column",
    gap: "20px",
  },
  card: {
    display: "flex",
    gap: "20px",
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    alignItems: "center",
    flexWrap: "wrap",
  },
  image: {
    width: "140px",
    height: "180px",
    objectFit: "contain",
    borderRadius: "10px",
  },
  info: {
    flex: 1,
  },
  quantityBox: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginTop: "12px",
    marginBottom: "12px",
  },
  qtyButton: {
    width: "34px",
    height: "34px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#9D825D",
    color: "#fff",
    fontSize: "1.1rem",
    cursor: "pointer",
  },
  disabledQtyButton: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  
  stockMessage: {
    fontSize: "0.9rem",
    fontWeight: "bold",
    marginBottom: "12px",
  },
  quantity: {
    fontWeight: "bold",
    minWidth: "20px",
    textAlign: "center",
  },
  removeButton: {
    padding: "10px 16px",
    border: "none",
    backgroundColor: "#9D825D",
    color: "#fff",
    borderRadius: "6px",
    cursor: "pointer",
  },
  summary: {
    marginTop: "35px",
    textAlign: "right",
  },
  total: {
    color: "#9D825D",
    marginBottom: "20px",
  },
  actions: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    flexWrap: "wrap",
  },
  clearButton: {
    padding: "12px 18px",
    border: "1px solid #9D825D",
    backgroundColor: "#fff",
    color: "#7a284b",
    borderRadius: "8px",
    cursor: "pointer",
  },
  checkoutButton: {
    padding: "12px 18px",
    border: "none",
    backgroundColor: "#9D825D",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Cart;