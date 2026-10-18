import { useNavigate } from "react-router-dom";
import browsImg from "../assets/Home4.png";
import lashesImg from "../assets/Home3.png";
import lipsImg from "../assets/Home1.png";
import paletteImg from "../assets/Home2.png";

function Products() {
  const navigate = useNavigate();

  const categories = [
    {
      name: "Lip Gloss",
      slug: "lip-gloss",
      image: lipsImg,
      description:
        "Add shine and softness to your lips with the OWNHER Lip Gloss. This lightweight, non-sticky formula gives a smooth, glossy finish while keeping your lips hydrated all day. Perfect for everyday wear, it can be worn alone for a natural look or layered over lipstick for extra shine. Designed for easy use, this gloss helps you feel confident with minimal effort.",
      benefits: [
        "High-shine finish",
        "Non-sticky, lightweight feel",
        "Hydrating formula",
        "Easy everyday use",
        "Available in multiple shades",
      ],
    },
    {
      name: "Eyelashes",
      slug: "lashes",
      image: lashesImg,
      description:
        "Enhance your natural beauty with OWNHER Eyelashes, designed to give you the perfect look for any moment. From soft everyday styles to bold, dramatic lashes, each pair is lightweight, comfortable, and easy to apply. Made for beginners and everyday use, these lashes help you create a flawless look in minutes—no professional skills needed.",
      benefits: [
        "Lightweight and comfortable",
        "Easy to apply",
        "Reusable with proper care",
        "Beginner-friendly styles",
        "Available in Natural, Soft, Glow, and Night",
      ],
    },
    {
      name: "Tattoo Brow Gel",
      slug: "brows",
      image: browsImg,
      description:
        "Shape, define, and tint your brows with a long-lasting peel-off formula made for easy beauty routines. The OWNHER Tattoo Brow Gel helps create fuller-looking brows with a waterproof and sweatproof finish that stays in place. Just apply, let it set, and peel to reveal a soft tinted look. Perfect for everyday wear, this brow gel is made for women who want simple, confident beauty with less effort.",
      benefits: [
        "Peel-off brow tint",
        "Waterproof and sweatproof",
        "Long-lasting wear",
        "Easy to apply",
        "Available in Soft Brown, Medium Brown, Dark Brown, and Black",
      ],
    },
    {
      name: "Eyeshadow Palettes",
      slug: "palettes",
      image: paletteImg,
      description:
        "Create effortless looks with OWNHER Eyeshadow Palettes, designed to make makeup simple and easy. Each palette features a mix of smooth, blendable shades that work together to help you go from a natural daytime look to a more defined evening style. With a balance of matte and shimmer finishes, these palettes are perfect for beginners and everyday use, giving you the confidence to create your own look.",
      benefits: [
        "Easy-to-blend formula",
        "Matte and shimmer shades",
        "Beginner-friendly color combinations",
        "Compact and travel-friendly",
        "Available in Nudes, Mid Nudes, Bold Pigment, and Night",
      ],
    },
  ];

  return (
    <div style={styles.container}>
      <h1 style={styles.pageTitle}>Our Products</h1>
      <p style={styles.pageText}>
        Explore each collection and learn what makes every OWNHER product easy
        to use and made for real life.
      </p>

      {categories.map((category, index) => (
        <section
          key={category.slug}
          style={{
            ...styles.section,
            flexDirection: index % 2 === 0 ? "row" : "row-reverse",
          }}
        >
          <div style={styles.imageBox}>
  <div className="category-hover-wrap">
    <img
      src={category.image}
      alt={category.name}
      className="category-hover-image"
    />
  </div>
</div>

          <div style={styles.textBox}>
            <h2 style={styles.title}>{category.name}</h2>
            <p style={styles.description}>{category.description}</p>

            <h3 style={styles.smallTitle}>Why you’ll love it:</h3>
            <ul style={styles.list}>
              {category.benefits.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>

            <button
              style={styles.button}
              onClick={() => navigate(`/category/${category.slug}`)}
            >
              View Collection
            </button>
          </div>
        </section>
      ))}
    </div>
  );
}

const styles = {
  container: {
    padding: "50px 30px",
    maxWidth: "1200px",
    margin: "0 auto",
  },
  pageTitle: {
    textAlign: "center",
    fontSize: "2.7rem",
    color: "#9D825D",
    marginBottom: "12px",
  },
  pageText: {
    textAlign: "center",
    color: "#555",
    maxWidth: "800px",
    margin: "0 auto 50px auto",
    lineHeight: "1.8",
  },
  section: {
    display: "flex",
    gap: "40px",
    alignItems: "center",
    marginBottom: "70px",
    flexWrap: "wrap",
  },
  imageBox: {
    flex: "1 1 420px",
    textAlign: "center",
  },
  
  textBox: {
    flex: "1 1 420px",
  },
  title: {
    color: "#9D825D",
    fontSize: "2rem",
    marginBottom: "18px",
  },
  description: {
    color: "#333",
    lineHeight: "1.9",
    marginBottom: "18px",
    fontSize: "1.05rem",
  },
  smallTitle: {
    color: "#7e6442",
    marginBottom: "10px",
  },
  list: {
    paddingLeft: "20px",
    lineHeight: "1.9",
    color: "#444",
    marginBottom: "20px",
  },
  button: {
    padding: "12px 22px",
    border: "none",
    backgroundColor: "#9D825D",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
  },
};

export default Products;