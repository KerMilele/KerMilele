import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";

function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setMessage("Account created successfully.");
      setEmail("");
      setPassword("");

      setTimeout(() => {
        navigate("/");
      }, 1000);
    } catch (error) {
      setMessage(error.message);
    }
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleRegister}>
        <h1 style={styles.title}>Create Account</h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={styles.input}
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />

        <button type="submit" style={styles.button}>
          Sign Up
        </button>

        {message && <p style={styles.message}>{message}</p>}
      </form>
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
  form: {
    width: "100%",
    maxWidth: "420px",
    backgroundColor: "#fff",
    padding: "30px",
    borderRadius: "12px",
    boxShadow: "0 2px 10px rgba(0,0,0,0.08)",
  },
  title: {
    textAlign: "center",
    color: "#9D825D",
    marginBottom: "20px",
  },
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  button: {
    width: "100%",
    padding: "12px",
    border: "none",
    borderRadius: "8px",
    backgroundColor: "#9D825D",
    color: "#fff",
    cursor: "pointer",
  },
  message: {
    marginTop: "15px",
    textAlign: "center",
    color: "#444",
  },
};

export default Register;