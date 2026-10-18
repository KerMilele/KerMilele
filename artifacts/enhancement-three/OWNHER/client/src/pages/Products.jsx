import { useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";
import productImages from "../data/productImages";
import browsImg from "../assets/Home4.png";
import lashesImg from "../assets/Home3.png";
import lipsImg from "../assets/Home1.png";
import paletteImg from "../assets/Home2.png";

function Products({ addToCart, products }) {
  const navigate = useNavigate();
  // Store the category selected by the customer.
  const [selectedCategory, setSelectedCategory] = useState("all");
  // Store the customer's search text.
  const [searchTerm, setSearchTerm] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sortOption, setSortOption] = useState("default");

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
/*
  ALGORITHMS AND DATA STRUCTURES ENHANCEMENT

  This algorithm processes the OWNHER product array.

  1. Filter products by the selected category.
  2. Search product names and shades.
  3. Apply minimum and maximum price filters.
  4. Filter by stock availability.
  5. Sort the remaining products.

*/

const displayedProducts = useMemo(() => {
  let result = products;

  // 1. Filter products by category.
  // Selecting "all" keeps products from every category.
  if (selectedCategory !== "all") {
    result = result.filter(
      (product) => product.category === selectedCategory
    );
  }

  // 2. Search by product name or shade.
  // Convert text to lowercase for case-insensitive searching.
  const search = searchTerm.trim().toLowerCase();

  if (search !== "") {
    result = result.filter((product) => {
      const name = product.name.toLowerCase();
      const shade = (product.shade || "").toLowerCase();

      return name.includes(search) || shade.includes(search);
    });
  }

  // 3. Apply the customer's minimum price.
  if (minPrice !== "") {
    result = result.filter(
      (product) => product.price >= Number(minPrice)
    );
  }

  // Apply the customer's maximum price.
  if (maxPrice !== "") {
    result = result.filter(
      (product) => product.price <= Number(maxPrice)
    );
  }

  // 4. Display only available products when requested.
  if (inStockOnly) {
    result = result.filter(
      (product) => product.stock > 0
    );
  }

  // 5. Sort the remaining products.

  if (sortOption === "low-high") {
    result = [...result].sort(
      (a, b) => a.price - b.price
    );
  } else if (sortOption === "high-low") {
    result = [...result].sort(
      (a, b) => b.price - a.price
    );
  } else if (sortOption === "a-z") {
    result = [...result].sort(
      (a, b) => a.name.localeCompare(b.name)
    );
  } else if (sortOption === "in-stock-first") {
    result = [...result].sort((a, b) => {
      const aAvailable = a.stock > 0;
      const bAvailable = b.stock > 0;

      if (aAvailable !== bAvailable) {
        return aAvailable ? -1 : 1;
      }

      // Sort alphabetically when stock status is equal.
      return a.name.localeCompare(b.name);
    });
  }

  return result;

}, [
  products,
  selectedCategory,
  searchTerm,
  minPrice,
  maxPrice,
  inStockOnly,
  sortOption
]);


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

      {/* Display all products below the category collections. */}
      <section style={styles.allProductsSection}>
        <h2 style={styles.allProductsTitle}>Shop All Products</h2>

        <p style={styles.allProductsText}>
          Explore all your OWNHER beauty essentials in one place.
        </p>

{/* Search, filter, and sort all OWNHER products. */}
<div style={styles.advancedFilters}>

  {/* Search by product name or shade. */}
  <input
    type="text"
    placeholder="Search by product name or shade..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    style={styles.filterInput}
  />

  {/* Filter products by category. */}
  <select
    value={selectedCategory}
    onChange={(e) => setSelectedCategory(e.target.value)}
    style={styles.filterInput}
  >
    <option value="all">All Categories</option>
    <option value="lip-gloss">Lip Gloss</option>
    <option value="lashes">Eyelashes</option>
    <option value="brows">Tattoo Brow Gel</option>
    <option value="palettes">Eyeshadow Palettes</option>
  </select>

  {/* Minimum price filter. */}
  <input
    type="number"
    min="0"
    placeholder="Min Price"
    value={minPrice}
    onChange={(e) => setMinPrice(e.target.value)}
    style={styles.filterInput}
  />

  {/* Maximum price filter. */}
  <input
    type="number"
    min="0"
    placeholder="Max Price"
    value={maxPrice}
    onChange={(e) => setMaxPrice(e.target.value)}
    style={styles.filterInput}
  />

  {/* Filter products based on inventory availability. */}
  <label style={styles.stockFilter}>
    <input
      type="checkbox"
      checked={inStockOnly}
      onChange={(e) => setInStockOnly(e.target.checked)}
    />
    In Stock Only
  </label>

  {/* Sort products by price, name, or availability. */}
  <select
    value={sortOption}
    onChange={(e) => setSortOption(e.target.value)}
    style={styles.filterInput}
  >
    <option value="default">Default Sorting</option>
    <option value="low-high">Price: Low to High</option>
    <option value="high-low">Price: High to Low</option>
    <option value="a-z">Name: A to Z</option>
    <option value="in-stock-first">In Stock First</option>
  </select>

  {/* Reset every filter to its original value. */}
  <button
    type="button"
    style={styles.resetButton}
    onClick={() => {
      setSearchTerm("");
      setSelectedCategory("all");
      setMinPrice("");
      setMaxPrice("");
      setInStockOnly(false);
      setSortOption("default");
    }}
  >
    Clear Filters
  </button>

</div>

{/* Show the number of matching products. */}
<p style={styles.resultsCount}>
  Showing {displayedProducts.length} products
</p>

        <div style={styles.productGrid}>
           {/* Display products matching the selected category. */}
  {displayedProducts.map((product) => (
            <div key={product.id} style={styles.productCard}>
              <img
                src={productImages[product.image]}
                alt={product.name}
                style={styles.productImage}
              />

              <h3>{product.name}</h3>

              <p>{product.description}</p>

              <p style={styles.productPrice}>
                ${product.price.toFixed(2)}
              </p>

              {product.stock > 0 ? (
                <p>In Stock: {product.stock}</p>
              ) : (
                <p>Out of Stock</p>
              )}

              <button
                style={{
                  ...styles.button,
                  ...(product.stock <= 0
                    ? styles.disabledButton
                    : {}),
                }}
                disabled={product.stock <= 0}
                onClick={() => addToCart(product)}
              >
                {product.stock <= 0
                  ? "Out of Stock"
                  : "Add to Cart"}
              </button>
            </div>
          ))}
        </div>
      </section>


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



  allProductsSection: {
    marginTop: "80px",
    paddingTop: "40px",
    borderTop: "1px solid #ddd",
  },
  
  allProductsTitle: {
    textAlign: "center",
    fontSize: "2.3rem",
    color: "#9D825D",
    marginBottom: "12px",
  },
  
  allProductsText: {
    textAlign: "center",
    color: "#555",
    marginBottom: "35px",
  },
  
  productGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  
  productCard: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "12px",
    textAlign: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  
  productImage: {
    width: "100%",
    height: "300px",
    objectFit: "contain",
    marginBottom: "15px",
  },
  
  productPrice: {
    fontWeight: "bold",
    color: "#7e6442",
    margin: "12px 0",
  },
  
  disabledButton: {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  // Layout for the advanced product filters.
advancedFilters: {
  display: "flex",
  flexWrap: "wrap",
  gap: "15px",
  alignItems: "center",
  justifyContent: "center",
  marginBottom: "25px",
},

// Shared styling for search, price, category, and sorting inputs.
filterInput: {
  padding: "12px",
  border: "1px solid #ccc",
  borderRadius: "8px",
  fontSize: "0.95rem",
  minWidth: "160px",
  maxWidth: "250px",
  flex: "1 1 160px",
  boxSizing: "border-box",
},

// Stock availability checkbox.
stockFilter: {
  display: "flex",
  alignItems: "center",
  gap: "8px",
  color: "#444",
  fontSize: "0.95rem",
},

// Reset all filters.
resetButton: {
  padding: "12px 20px",
  backgroundColor: "#9D825D",
  color: "#fff",
  border: "none",
  borderRadius: "8px",
  cursor: "pointer",
},

// Display the number of matching products.
resultsCount: {
  color: "#666",
  marginBottom: "20px",
  fontSize: "0.95rem",
},
};

export default Products;