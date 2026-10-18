function Footer() {
    return (
      <footer style={styles.footer}>
        <div style={styles.container}>
          <h3 style={styles.brand}>OWNHER</h3>
          <p style={styles.text}>Your Beauty. Your Rules.</p>
  
          <div style={styles.socials}>
            <a href="#" style={styles.icon}>IG</a>
            <a href="#" style={styles.icon}>FB</a>
            <a href="#" style={styles.icon}>TT</a>
          </div>
  
          <div style={styles.newsletter}>
            <p style={styles.newsTitle}>Join our newsletter</p>
            <div style={styles.newsForm}>
              <input type="email" placeholder="Your email" style={styles.input} />
              <button style={styles.button}>Subscribe</button>
            </div>
          </div>
  
          <p style={styles.copy}>© 2026 OWNHER. All rights reserved.</p>
        </div>
      </footer>
    );
  }
  
  const styles = {
    footer: {
      backgroundColor: "#f7f2eb",
      color: "#9D825D",
      marginTop: "70px",
      padding: "50px 20px",
      borderTop: "1px solid #e5d8c7",
    },
    container: {
      maxWidth: "1100px",
      margin: "0 auto",
      textAlign: "center",
    },
    brand: {
      fontFamily: "'Cormorant Garamond', serif",
      fontSize: "2rem",
      marginBottom: "10px",
    },
    text: {
      marginBottom: "20px",
      color: "#7e6442",
    },
    socials: {
      display: "flex",
      justifyContent: "center",
      gap: "12px",
      marginBottom: "25px",
    },
    icon: {
      width: "42px",
      height: "42px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "50%",
      backgroundColor: "#9D825D",
      color: "#fff",
      fontWeight: "600",
      textDecoration: "none",
    },
    newsletter: {
      maxWidth: "520px",
      margin: "0 auto 20px auto",
    },
    newsTitle: {
      marginBottom: "12px",
      color: "#7e6442",
      fontWeight: "600",
    },
    newsForm: {
      display: "flex",
      gap: "10px",
      flexWrap: "wrap",
      justifyContent: "center",
    },
    input: {
      flex: "1 1 240px",
      padding: "12px",
      borderRadius: "8px",
      border: "1px solid #ccb89f",
    },
    button: {
      padding: "12px 18px",
      border: "none",
      backgroundColor: "#9D825D",
      color: "#fff",
      borderRadius: "8px",
      cursor: "pointer",
    },
    copy: {
      fontSize: "0.95rem",
      color: "#8c7350",
      marginTop: "10px",
    },
  };
  
  export default Footer;