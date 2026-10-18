import { useMemo, useState } from "react";
import { useParams } from "react-router-dom";
import products from "../data/products";

function CategoryPage({ addToCart }) {
  const { categoryName } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("default");
  const [maxPrice, setMaxPrice] = useState("");

  const filteredProducts = useMemo(() => {
    let result = products.filter((product) => product.category === categoryName);

    if (searchTerm.trim() !== "") {
      result = result.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (maxPrice !== "") {
      result = result.filter((product) => product.price <= Number(maxPrice));
    }

    if (sortOption === "low-high") {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortOption === "high-low") {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortOption === "a-z") {
      result = [...result].sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [categoryName, searchTerm, sortOption, maxPrice]);

  const categoryContent = {
    palettes: {
      title: "OWNHER Eyeshadow Palettes",
      description:
        "Create effortless looks with OWNHER Eyeshadow Palettes, designed to make makeup simple and easy. Each palette features a mix of smooth, blendable shades that work together to help you go from a natural daytime look to a more defined evening style.",
      description2:
        "With a balance of matte and shimmer finishes, these palettes are perfect for beginners and everyday use, giving you the confidence to create your own look.",
      benefits: [
        "Easy-to-blend formula",
        "Matte and shimmer shades",
        "Beginner-friendly color combinations",
        "Compact and travel-friendly",
        "Available in Nudes, Mid Nudes, Bold Pigment, and Night",
      ],
    },
    lashes: {
      title: "OWNHER Eyelashes",
      description:
        "Enhance your natural beauty with OWNHER Eyelashes, designed to give you the perfect look for any moment. From soft everyday styles to bold, dramatic lashes, each pair is lightweight, comfortable, and easy to apply.",
      description2:
        "Made for beginners and everyday use, these lashes help you create a flawless look in minutes—no professional skills needed.",
      benefits: [
        "Lightweight and comfortable",
        "Easy to apply",
        "Reusable with proper care",
        "Beginner-friendly styles",
        "Available in Natural, Soft, Glow, and Night",
      ],
    },
    "lip-gloss": {
      title: "OWNHER Lip Gloss",
      description:
        "Add shine and softness to your lips with the OWNHER Lip Gloss. This lightweight, non-sticky formula gives a smooth, glossy finish while keeping your lips hydrated all day.",
      description2:
        "Perfect for everyday wear, it can be worn alone for a natural look or layered over lipstick for extra shine. Designed for easy use, this gloss helps you feel confident with minimal effort.",
      benefits: [
        "High-shine finish",
        "Non-sticky, lightweight feel",
        "Hydrating formula",
        "Easy everyday use",
        "Available in multiple shades",
      ],
    },
    brows: {
      title: "OWNHER Tattoo Brow Gel",
      description:
        "Shape, define, and tint your brows with a long-lasting peel-off formula made for easy beauty routines. The OWNHER Tattoo Brow Gel helps create fuller-looking brows with a waterproof and sweatproof finish that stays in place.",
      description2:
        "Just apply, let it set, and peel to reveal a soft tinted look. Perfect for everyday wear, this brow gel is made for women who want simple, confident beauty with less effort.",
      benefits: [
        "Peel-off brow tint",
        "Waterproof and sweatproof",
        "Long-lasting wear",
        "Easy to apply",
        "Available in Soft Brown, Medium Brown, Dark Brown, and Black",
      ],
    },
  };

  const content = categoryContent[categoryName];

  return (
    <div style={styles.container}>
      {content && (
        <section style={styles.topSection}>
          <h1 style={styles.title}>{content.title}</h1>
          <p style={styles.text}>{content.description}</p>
          <p style={styles.text}>{content.description2}</p>

          <h3 style={styles.smallTitle}>Why you’ll love it:</h3>
          <ul style={styles.list}>
            {content.benefits.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </section>
      )}

      <section style={styles.filterSection}>
        <input
          type="text"
          placeholder="Search by shade or product name"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={styles.input}
        />

        <input
          type="number"
          placeholder="Max price"
          value={maxPrice}
          onChange={(e) => setMaxPrice(e.target.value)}
          style={styles.input}
        />

        <select
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
          style={styles.select}
        >
          <option value="default">Sort</option>
          <option value="low-high">Price: Low to High</option>
          <option value="high-low">Price: High to Low</option>
          <option value="a-z">Name: A to Z</option>
        </select>
      </section>

      {filteredProducts.length === 0 ? (
        <p style={styles.noResults}>No products found in this category.</p>
      ) : (
        <div style={styles.grid}>
          {filteredProducts.map((product) => (
            <div key={product.id} style={styles.card}>
              <img src={product.image} alt={product.name} style={styles.image} />
              <h3>{product.name}</h3>
              <p>{product.description}</p>
              <p style={styles.price}>${product.price}</p>
              <button style={styles.button} onClick={() => addToCart(product)}>
                Add to Cart
              </button>
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
    maxWidth: "1200px",
    margin: "0 auto",
  },
  topSection: {
    marginBottom: "50px",
    textAlign: "center",
  },
  title: {
    color: "#9D825D",
    fontSize: "2.5rem",
    marginBottom: "18px",
  },
  text: {
    maxWidth: "900px",
    margin: "0 auto 14px auto",
    lineHeight: "1.9",
    color: "#333",
  },
  smallTitle: {
    color: "#7e6442",
    marginTop: "25px",
    marginBottom: "10px",
  },
  list: {
    listStylePosition: "inside",
    lineHeight: "1.9",
    color: "#444",
  },
  filterSection: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "15px",
    marginBottom: "30px",
  },
  input: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  select: {
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #ccc",
  },
  noResults: {
    textAlign: "center",
    color: "#555",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "20px",
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    padding: "20px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  image: {
    width: "100%",
    height: "380px",
    objectFit: "contain",
    borderRadius: "10px",
    marginBottom: "15px",
  },
  price: {
    fontWeight: "bold",
    color: "#7e6442",
    margin: "10px 0",
  },
  button: {
    padding: "10px 16px",
    border: "none",
    backgroundColor: "#9D825D",
    color: "#fff",
    borderRadius: "8px",
    cursor: "pointer",
    marginTop: "10px",
  },
};

export default CategoryPage;