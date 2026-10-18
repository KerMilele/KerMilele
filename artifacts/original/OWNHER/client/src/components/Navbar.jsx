import { Link } from "react-router-dom";
import { useState } from "react";

function Navbar({ cartItems, user, handleLogout }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <nav style={styles.nav}>
      <div style={styles.left}>
        <Link to="/" style={styles.brand}>
          OWNHER
        </Link>
      </div>

      <button
        style={styles.menuButton}
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>

      <div
        style={{
          ...styles.center,
          ...(menuOpen ? styles.mobileOpen : {}),
        }}
      >
        <Link to="/" style={styles.link} onClick={() => setMenuOpen(false)}>Home</Link>
        <Link to="/products" style={styles.link} onClick={() => setMenuOpen(false)}>Products</Link>
        <Link to="/about" style={styles.link} onClick={() => setMenuOpen(false)}>About</Link>
        <Link to="/cart" style={styles.link} onClick={() => setMenuOpen(false)}>Cart ({totalItems})</Link>
        {user && (
          <Link to="/my-orders" style={styles.link} onClick={() => setMenuOpen(false)}>
            My Orders
          </Link>
        )}
      </div>

      <div
        style={{
          ...styles.right,
          ...(menuOpen ? styles.mobileOpenRight : {}),
        }}
      >
        {user ? (
          <>
            <span style={styles.userText}>{user.email}</span>
            <button
              style={styles.logoutButton}
              onClick={() => {
                handleLogout();
                setMenuOpen(false);
              }}
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={styles.link} onClick={() => setMenuOpen(false)}>Login</Link>
            <Link to="/register" style={styles.link} onClick={() => setMenuOpen(false)}>Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
}

const styles = {
  nav: {
    display: "grid",
    gridTemplateColumns: "1fr auto 1fr",
    alignItems: "center",
    padding: "20px 28px",
    backgroundColor: "#ffffff",
    borderBottom: "1px solid #e9dfd2",
    position: "sticky",
    top: 0,
    zIndex: 1000,
    gap: "20px",
  },
  left: {
    justifySelf: "start",
  },
  brand: {
    fontFamily: "'Cormorant Garamond', serif",
    fontSize: "2.1rem",
    fontWeight: "700",
    color: "#9D825D",
    letterSpacing: "1px",
    textDecoration: "none",
  },
  center: {
    display: "flex",
    justifyContent: "center",
    gap: "24px",
    alignItems: "center",
    flexWrap: "wrap",
  },
  right: {
    display: "flex",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: "14px",
    flexWrap: "wrap",
  },
  link: {
    color: "#9D825D",
    fontWeight: "500",
    fontSize: "1rem",
    textDecoration: "none",
  },
  userText: {
    color: "#7e6442",
    fontWeight: "500",
    fontSize: "0.95rem",
    wordBreak: "break-word",
  },
  logoutButton: {
    padding: "8px 14px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#9D825D",
    color: "#fff",
    cursor: "pointer",
  },
  menuButton: {
    display: "none",
    backgroundColor: "#9D825D",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    padding: "8px 12px",
    fontSize: "1.1rem",
    cursor: "pointer",
  },
};

export default Navbar;