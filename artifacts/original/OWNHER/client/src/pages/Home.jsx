import { useNavigate } from "react-router-dom";
import { useState } from "react";
import browsImg from "../assets/Home4.png";
import lashesImg from "../assets/Home3.png";
import lipsImg from "../assets/Home1.png";
import paletteImg from "../assets/Home2.png";
import missionImg from "../assets/us.jpg";
import heroImg from "../assets/hero.jpg";
import glossBest from "../assets/pre.png";
import lashesBest from "../assets/pre2.jpeg";
import browBest from "../assets/pre5.jpg";

function Home() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSuccess("Thank you for staying in touch with OWNHER.");
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  return (
    <div>
      <section style={styles.hero}>
        <div style={styles.overlay}>
          <h1 style={styles.title}>OWNHER</h1>
          <p style={styles.subtitle}>Your Beauty. Your Rules.</p>
          <p style={styles.text}>
            Makeup made simple. OWNHER is designed for women who want to feel
            confident doing their own makeup—no stress, no complexity.
          </p>
          <button style={styles.button} onClick={() => navigate("/products")}>
            Shop Now
          </button>
        </div>
      </section>

      <section style={styles.bestSection}>
  <p style={styles.bestLabel}>Customer Favorites</p>
  <h2 style={styles.heading}>Best Sellers</h2>
  <p style={styles.paragraph}>
    A few of our most-loved essentials for easy, everyday beauty.
  </p>

  <div style={styles.bestGrid}>
    <div style={styles.bestCard}>
      <div style={styles.badge}>Best Seller</div>
      <img src={glossBest} alt="Best selling lip gloss" style={styles.bestImage} />
      <h3 style={styles.bestTitle}>Soft Nude Gloss</h3>
      <p style={styles.bestText}>Glossy, lightweight, and easy for everyday wear.</p>
      <p style={styles.bestPrice}>$9.99</p>
    </div>

    <div style={styles.bestCard}>
      <div style={styles.badge}>Most Loved</div>
      <img src={lashesBest} alt="Best selling lashes" style={styles.bestImage} />
      <h3 style={styles.bestTitle}>Glow Lashes</h3>
      <p style={styles.bestText}>Soft volume and easy application for beginners.</p>
      <p style={styles.bestPrice}>$12.99</p>
    </div>

    <div style={styles.bestCard}>
      <div style={styles.badge}>Top Pick</div>
      <img src={browBest} alt="Best selling brow gel" style={styles.bestImage} />
      <h3 style={styles.bestTitle}>Dark Brown Brow Gel</h3>
      <p style={styles.bestText}>Long-lasting brow tint with a clean defined finish.</p>
      <p style={styles.bestPrice}>$18.99</p>
    </div>
  </div>
</section>

      <section style={styles.section}>
        <h2 style={styles.heading}>Why OWNHER?</h2>
        <p style={styles.paragraph}>
          We believe beauty should be simple, empowering, and accessible. Our
          products are created to help you build your look in minutes.
        </p>
        <ul style={styles.list}>
          <li>Beginner-friendly</li>
          <li>Quick and easy routines</li>
          <li>Long-lasting results</li>
          <li>Designed for real life</li>
        </ul>
      </section>

      <div className="promo-bar">
  Free shipping on orders over $50
</div>

<section style={styles.section}>
  <h2 style={styles.heading}>Shop the Essentials</h2>

  <div className="essentials-slider">
    <div className="essentials-track">
      <div className="zoom-card">
        <div className="zoom-image-wrap">
          <img src={lipsImg} alt="Lip Gloss" className="zoom-image" />
        </div>
        <p>Lip Gloss</p>
      </div>

      <div className="zoom-card">
        <div className="zoom-image-wrap">
          <img src={lashesImg} alt="Eyelashes" className="zoom-image" />
        </div>
        <p>Eyelashes</p>
      </div>

      <div className="zoom-card">
        <div className="zoom-image-wrap">
          <img src={paletteImg} alt="Eyeshadow Palettes" className="zoom-image" />
        </div>
        <p>Eyeshadow Palettes</p>
      </div>

      <div className="zoom-card">
        <div className="zoom-image-wrap">
          <img src={browsImg} alt="Tattoo Brow Gel" className="zoom-image" />
        </div>
        <p>Tattoo Brow Gel</p>
      </div>

      <div className="zoom-card">
        <div className="zoom-image-wrap">
          <img src={lipsImg} alt="Lip Gloss" className="zoom-image" />
        </div>
        <p>Lip Gloss</p>
      </div>

      <div className="zoom-card">
        <div className="zoom-image-wrap">
          <img src={lashesImg} alt="Eyelashes" className="zoom-image" />
        </div>
        <p>Eyelashes</p>
      </div>

      <div className="zoom-card">
        <div className="zoom-image-wrap">
          <img src={paletteImg} alt="Eyeshadow Palettes" className="zoom-image" />
        </div>
        <p>Eyeshadow Palettes</p>
      </div>

      <div className="zoom-card">
        <div className="zoom-image-wrap">
          <img src={browsImg} alt="Tattoo Brow Gel" className="zoom-image" />
        </div>
        <p>Tattoo Brow Gel</p>
      </div>
    </div>
  </div>
</section>


      <section style={styles.missionSection}>
        <div style={styles.missionText}>
          <h2 style={styles.heading}>Our Mission</h2>
          <p style={styles.paragraphLeft}>
            OWNHER is more than makeup. It’s about independence, confidence,
            and owning your look—your way. You don’t need a makeup artist.
            You already have what it takes.
          </p>
        </div>

        <div style={styles.missionImageBox}>
          <img src={missionImg} alt="Mission of independence" style={styles.missionImage} />
        </div>
      </section>

      <section style={styles.contactSection}>
        <div style={styles.contactCard}>
          <h2 style={styles.heading}>Stay in Touch</h2>
          <p style={styles.paragraph}>
            Have a question, idea, or just want to hear from us? Send us a message.
          </p>

          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your Email"
              value={formData.email}
              onChange={handleChange}
              style={styles.input}
              required
            />
            <textarea
              name="message"
              placeholder="Your Message"
              value={formData.message}
              onChange={handleChange}
              style={styles.textarea}
              required
            />
            <button type="submit" style={styles.button}>
              Send Message
            </button>
          </form>

          {success && <p style={styles.success}>{success}</p>}
        </div>
      </section>
    </div>
  );
}

const styles = {
  hero: {
    minHeight: "85vh",
    backgroundImage: `linear-gradient(rgba(247, 242, 235, 0.45), rgba(247, 242, 235, 0.45)), url(${heroImg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "40px 20px",
  },
  overlay: {
    backgroundColor: "rgba(255, 255, 255, 0.78)",
  backdropFilter: "blur(2px)",
  padding: "50px",
  borderRadius: "20px",
  textAlign: "center",
  maxWidth: "760px",
  boxShadow: "0 8px 30px rgba(157,130,93,0.10)",
  },
  title: {
    fontSize: "3.4rem",
    color: "#9D825D",
    marginBottom: "10px",
  },
  subtitle: {
    fontSize: "1.3rem",
    fontWeight: "600",
    color: "#7e6442",
    marginBottom: "18px",
  },
  text: {
    fontSize: "1.08rem",
    color: "#7e6442",
    lineHeight: "1.9",
    marginBottom: "22px",
  },
  button: {
    padding: "12px 24px",
    backgroundColor: "#9D825D",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
  },
  section: {
    padding: "70px 30px",
    textAlign: "center",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  missionSection: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "30px",
    alignItems: "center",
    maxWidth: "1100px",
    margin: "0 auto",
    padding: "70px 30px",
  },
  missionText: {
    textAlign: "left",
  },
  missionImageBox: {
    textAlign: "center",
  },
  missionImage: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "16px",
    objectFit: "cover",
  },
  contactSection: {
    padding: "70px 30px",
    maxWidth: "900px",
    margin: "0 auto",
  },
  contactCard: {
    backgroundColor: "#f7f2eb",
    padding: "30px",
    borderRadius: "16px",
    boxShadow: "0 2px 10px rgba(157,130,93,0.08)",
    textAlign: "center",
  },
  heading: {
    fontSize: "2.2rem",
    marginBottom: "20px",
    color: "#9D825D",
  },
  paragraph: {
    maxWidth: "850px",
    margin: "0 auto 20px auto",
    lineHeight: "1.9",
    fontSize: "1.05rem",
    color: "#7e6442",
  },
  paragraphLeft: {
    lineHeight: "1.9",
    fontSize: "1.05rem",
    color: "#7e6442",
  },
  list: {
    marginTop: "20px",
    listStylePosition: "inside",
    lineHeight: "2",
    color: "#7e6442",
    fontSize: "1.02rem",
  },
  
  input: {
    width: "100%",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccb89f",
  },
  textarea: {
    width: "100%",
    minHeight: "140px",
    padding: "12px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #ccb89f",
  },
  success: {
    marginTop: "15px",
    color: "#7e6442",
  },
  bestSection: {
    padding: "70px 30px",
    textAlign: "center",
    maxWidth: "1100px",
    margin: "0 auto",
  },
  bestLabel: {
    color: "#7e6442",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "0.9rem",
    marginBottom: "8px",
  },
  bestGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
    gap: "24px",
    marginTop: "30px",
  },
  bestCard: {
    backgroundColor: "#ffffff",
    borderRadius: "16px",
    padding: "20px",
    boxShadow: "0 2px 12px rgba(157,130,93,0.08)",
    position: "relative",
  },
  badge: {
    position: "absolute",
    top: "14px",
    left: "14px",
    backgroundColor: "#9D825D",
    color: "#fff",
    padding: "6px 10px",
    borderRadius: "999px",
    fontSize: "0.8rem",
    fontWeight: "600",
  },
  bestImage: {
    width: "100%",
    height: "320px",
    objectFit: "contain",
    marginBottom: "14px",
    borderRadius: "12px",
  },
  bestTitle: {
    color: "#9D825D",
    fontSize: "1.7rem",
    marginBottom: "8px",
  },
  bestText: {
    color: "#7e6442",
    lineHeight: "1.7",
    fontSize: "0.98rem",
    marginBottom: "10px",
  },
  bestPrice: {
    color: "#9D825D",
    fontWeight: "700",
    fontSize: "1.05rem",
  },
};

export default Home;