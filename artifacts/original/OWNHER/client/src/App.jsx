import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Products from "./pages/Products";
import About from "./pages/About";
import CategoryPage from "./pages/CategoryPage";
import Cart from "./pages/Cart";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import AdminProducts from "./pages/AdminProducts";
import OrderConfirmation from "./pages/OrderConfirmation";
import Footer from "./components/Footer";

function App() {
  const [cartItems, setCartItems] = useState(() => {
    const savedCart = localStorage.getItem("ownher-cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  /*const [orders, setOrders] = useState(() => {
    const savedOrders = localStorage.getItem("ownher-orders");
    return savedOrders ? JSON.parse(savedOrders) : [];
  });*/

  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("ownher-cart", JSON.stringify(cartItems));
  }, [cartItems]);

  /*useEffect(() => {
    localStorage.setItem("ownher-orders", JSON.stringify(orders));
  }, [orders]);*/

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  const addToCart = (product) => {
    const existingProduct = cartItems.find((item) => item.id === product.id);

    if (existingProduct) {
      const updatedCart = cartItems.map((item) =>
        item.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
      setCartItems(updatedCart);
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
    }
  };

  const increaseQuantity = (id) => {
    const updatedCart = cartItems.map((item) =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCartItems(updatedCart);
  };

  const decreaseQuantity = (id) => {
    const updatedCart = cartItems
      .map((item) =>
        item.id === id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);

    setCartItems(updatedCart);
  };

  const removeFromCart = (id) => {
    const updatedCart = cartItems.filter((item) => item.id !== id);
    setCartItems(updatedCart);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  /*const addOrder = (order) => {
    setOrders((prev) => [order, ...prev]);
  };*/

  const handleLogout = async () => {
    try {
      await signOut(auth);
      alert("Logged out successfully");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <BrowserRouter>
      <Navbar
        cartItems={cartItems}
        user={user}
        handleLogout={handleLogout}
      />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route
          path="/category/:categoryName"
          element={<CategoryPage addToCart={addToCart} />}
        />
        <Route path="/about" element={<About />} />
        <Route
          path="/cart"
          element={
            <Cart
              cartItems={cartItems}
              removeFromCart={removeFromCart}
              increaseQuantity={increaseQuantity}
              decreaseQuantity={decreaseQuantity}
              clearCart={clearCart}
            />
          }
        />
        <Route
          path="/checkout"
          element={
            <Checkout
              cartItems={cartItems}
              clearCart={clearCart}
              user={user}
              /*addOrder={addOrder}*/
            />
          }
        />
        <Route
          path="/my-orders"
          element={<MyOrders user={user} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/order-confirmation" element={<OrderConfirmation />} />
        <Route path="/admin-products" element={<AdminProducts user={user} />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;