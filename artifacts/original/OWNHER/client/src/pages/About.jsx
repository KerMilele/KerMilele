
import aboutImg from "../assets/logo1.png";

function About() {
  return (
    <div style={styles.container}>
      <section style={styles.section}>
        <div style={styles.textBox}>
          <h1 style={styles.title}>About OWNHER</h1>
          <p style={styles.text}>
            OWNHER was created to help women feel more confident and independent
            in their beauty routine. The goal is to offer products that are easy
            to use at home and that reduce the need to always depend on salon services.
          </p>
          <p style={styles.text}>
            Our brand focuses on beauty, convenience, and self-expression.
            We want every woman to feel empowered to do her own makeup in a simple
            and affordable way.
          </p>
        </div>

        <div style={styles.imageBox}>
          <img src={aboutImg} alt="About OWNHER" style={styles.image} />
        </div>
      </section>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "70px 30px",
  },
  section: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "40px",
    alignItems: "center",
  },
  textBox: {
    textAlign: "left",
  },
  title: {
    fontSize: "3rem",
    color: "#9D825D",
    marginBottom: "25px",
  },
  text: {
    fontSize: "1.1rem",
    lineHeight: "1.9",
    marginBottom: "20px",
    color: "#7e6442",
  },
  imageBox: {
    textAlign: "center",
  },
  image: {
    width: "100%",
    maxWidth: "500px",
    borderRadius: "16px",
    objectFit: "cover",
  },
};

export default About;