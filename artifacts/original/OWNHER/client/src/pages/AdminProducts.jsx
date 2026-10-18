import { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase";

function AdminProducts({ user }) {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    category: "",
    image: "",
    description: "",
  });

  const ownerEmail = "kerenmilele17@gmail.com";

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "products"));
        const fetchedProducts = querySnapshot.docs.map((item) => ({
          id: item.id,
          ...item.data(),
        }));
        setProducts(fetchedProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    loadProducts();
  }, []);

  const reloadProducts = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "products"));
      const fetchedProducts = querySnapshot.docs.map((item) => ({
        id: item.id,
        ...item.data(),
      }));
      setProducts(fetchedProducts);
    } catch (error) {
      console.error("Error reloading products:", error);
    }
  };

  if (!user || user.email !== ownerEmail) {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Admin Products</h1>
        <p>You are not authorized to access this page.</p>
      </div>
    );
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleAddProduct = async (e) => {
    e.preventDefault();

    try {
      await addDoc(collection(db, "products"), {
        ...formData,
        price: Number(formData.price),
      });

      setMessage("Product added successfully.");
      setFormData({
        name: "",
        price: "",
        category: "",
        image: "",
        description: "",
      });

      await reloadProducts();
    } catch (error) {
      console.error("Error adding product:", error);
      setMessage("Failed to add product.");
    }
  };

  const handleDeleteProduct = async (id) => {
    try {
      await deleteDoc(doc(db, "products", id));
      await reloadProducts();
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Admin Products</h1>

      <form style={styles.form} onSubmit={handleAddProduct}>
        <input
          type="text"
          name="name"
          placeholder="Product name"
          value={formData.name}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={formData.price}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="category"
          placeholder="Category"
          value={formData.category}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={formData.image}
          onChange={handleChange}
          style={styles.input}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          value={formData.description}
          onChange={handleChange}
          style={styles.textarea}
          required
        />
        <button type="submit" style={styles.button}>
          Add Product
        </button>
        {message && <p style={styles.message}>{message}</p>}
      </form>

      <div style={styles.list}>
        {products.map((product) => (
          <div key={product.id} style={styles.card}>
            <img src={product.image} alt={product.name} style={styles.image} />
            <h3>{product.name}</h3>
            <p>{product.category}</p>
            <p>${product.price}</p>
            <button
              style={styles.deleteButton}
              onClick={() => handleDeleteProduct(product.id)}
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "50px 30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  title: {
    textAlign: "center",
    color: "#7a284b",
    marginBottom: "30px",
  },
  form: {
    backgroundColor: "#fff",
    padding: "25px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    marginBottom: "40px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  textarea: {
    width: "100%",
    padding: "12px",
    marginBottom: "12px",
    border: "1px solid #ccc",
    borderRadius: "8px",
    minHeight: "100px",
  },
  button: {
    padding: "12px 18px",
    border: "none",
    backgroundColor: "#7a284b",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },
  message: {
    marginTop: "12px",
  },
  list: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
    textAlign: "center",
  },
  image: {
    width: "100%",
    height: "250px",
    objectFit: "contain",
    marginBottom: "12px",
  },
  deleteButton: {
    marginTop: "10px",
    padding: "10px 14px",
    border: "none",
    backgroundColor: "#b04a6f",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default AdminProducts;