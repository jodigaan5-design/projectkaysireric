import React, { useState, useEffect } from "react";

interface Product {
  id: number;
  name: string;
  category: string;
  skinType: string;
  price: number;
  rating: number;
  img: string;
  description: string;
  isBestseller?: boolean;
}

interface CartItem extends Product {
  quantity: number;
}

const productsData: Product[] = [
  {
    id: 1,
    name: "Foaming Cleanser",
    category: "Cleanser",
    skinType: "Normal",
    price: 599.0,
    rating: 4,
    img: "cleanser.png",
    description:
      "A gentle daily cleanser that purifies sensitive skin without stripping essential moisture.",
    isBestseller: true,
  },
  {
    id: 2,
    name: "Toner",
    category: "Toner",
    skinType: "Dry",
    price: 699.0,
    rating: 4,
    img: "toner.png",
    description:
      "Hydrating rosewater toner to balance skin pH and prepare for serums.",
    isBestseller: false,
  },
  {
    id: 3,
    name: "Serum",
    category: "Serum",
    skinType: "Oily",
    price: 899.0,
    rating: 4,
    img: "serum.png",
    description:
      "A lightweight serum that helps brighten skin, fade dark spots, and improve uneven skin tone.",
    isBestseller: true,
  },
  {
    id: 4,
    name: "Cream",
    category: "Moisturizer",
    skinType: "Combination",
    price: 799.0,
    rating: 4,
    img: "moisturizer.png",
    description:
      "Deep hydration cream to repair and protect the natural skin barrier.",
    isBestseller: true,
  },
  {
    id: 5,
    name: "Sunscreen",
    category: "Sunscreen",
    skinType: "Sensitive",
    price: 849.0,
    rating: 4,
    img: "sunscreen2.0.png",
    description: "Broad-spectrum SPF 50+ protection with zero white cast.",
    isBestseller: true,
  },
];

const categoryImages: Record<string, string> = {
  Cleanser: "cleanser.png",
  Toner: "toner.png",
  Serum: "serum.png",
  Moisturizer: "moisturizer 2.0.png",
  Sunscreen: "sunscreen2.0.png",
};

export default function App() {
  const [currentView, setCurrentView] = useState<
    "home" | "plp" | "pdp" | "bestseller" | "about"
  >("home");
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    productsData[2]
  );
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [activeSkinType, setActiveSkinType] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [pdpQty, setPdpQty] = useState<number>(1);
  const [pdpTab, setPdpTab] = useState<"desc" | "ing" | "rev">("desc");

  const [cart, setCart] = useState<CartItem[]>(() => {
    const saved = localStorage.getItem("lumi_cart");
    return saved ? JSON.parse(saved) : [];
  });
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem("lumi_cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product, qty: number = 1) => {
    setCart((prev) => {
      const exists = prev.find((item) => item.id === product.id);
      if (exists) {
        return prev.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { ...product, quantity: qty }];
    });
    setIsCartOpen(true);
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const totalCartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const totalCartPrice = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const filteredProducts = productsData.filter((p) => {
    const matchCategory =
      activeCategory === "All" || p.category === activeCategory;
    const matchSkin = activeSkinType === "All" || p.skinType === activeSkinType;
    const matchSearch = p.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    return matchCategory && matchSkin && matchSearch;
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#f5f2ed",
      }}
    >
      {/* HEADER */}
      <header
        style={{
          background: "#ffffff",
          borderBottom: "1px solid #e0e0e0",
          padding: "1rem 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "sticky",
          top: 0,
          zIndex: 100,
        }}
      >
        <div
          style={{
            fontWeight: "800",
            fontSize: "1.2rem",
            letterSpacing: "0.5px",
            cursor: "pointer",
          }}
          onClick={() => setCurrentView("home")}
        >
          LUMI SKIN
        </div>

        <nav
          style={{
            display: "flex",
            gap: "2.5rem",
            fontSize: "0.85rem",
            fontWeight: 500,
            color: "#555",
          }}
        >
          <span
            style={{
              cursor: "pointer",
              color: currentView === "home" ? "#000" : "#666",
              fontWeight: currentView === "home" ? 700 : 500,
            }}
            onClick={() => setCurrentView("home")}
          >
            Shop
          </span>
          <span
            style={{
              cursor: "pointer",
              color: currentView === "plp" ? "#000" : "#666",
              fontWeight: currentView === "plp" ? 700 : 500,
            }}
            onClick={() => setCurrentView("plp")}
          >
            Skincare
          </span>
          <span
            style={{
              cursor: "pointer",
              color: currentView === "bestseller" ? "#000" : "#666",
              fontWeight: currentView === "bestseller" ? 700 : 500,
            }}
            onClick={() => setCurrentView("bestseller")}
          >
            Bestseller
          </span>
          <span
            style={{
              cursor: "pointer",
              color: currentView === "about" ? "#000" : "#666",
              fontWeight: currentView === "about" ? 700 : 500,
            }}
            onClick={() => setCurrentView("about")}
          >
            About
          </span>
        </nav>

        <div style={{ display: "flex", gap: "1.2rem", alignItems: "center" }}>
          <span
            style={{ cursor: "pointer", fontSize: "1rem" }}
            onClick={() => setCurrentView("plp")}
          >
            🔍
          </span>
          <div
            style={{ position: "relative", cursor: "pointer" }}
            onClick={() => setIsCartOpen(true)}
          >
            <span style={{ fontSize: "1.1rem" }}>🛍️</span>
            {totalCartCount > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-6px",
                  right: "-8px",
                  background: "#222",
                  color: "#fff",
                  borderRadius: "50%",
                  width: "16px",
                  height: "16px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: "0.6rem",
                  fontWeight: "bold",
                }}
              >
                {totalCartCount}
              </span>
            )}
          </div>
        </div>
      </header>

      {/* 1. HOMEPAGE */}
      {currentView === "home" && (
        <main style={{ flex: 1, padding: "2rem 5%" }}>
          {/* Hero Section */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1.5rem",
              marginBottom: "2.5rem",
              alignItems: "stretch",
            }}
          >
            <div
              style={{
                background: "#e5dacd",
                padding: "3rem 2.5rem",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  gap: "0.5rem",
                  marginBottom: "1.2rem",
                }}
              >
                <span
                  style={{
                    background: "#6b8268",
                    color: "#fff",
                    fontSize: "0.6rem",
                    padding: "4px 10px",
                    borderRadius: "3px",
                    fontWeight: "bold",
                  }}
                >
                  NATURAL CARE
                </span>
                <span
                  style={{
                    background: "#6b8268",
                    color: "#fff",
                    fontSize: "0.6rem",
                    padding: "4px 10px",
                    borderRadius: "3px",
                    fontWeight: "bold",
                  }}
                >
                  RADIANT YOU
                </span>
              </div>
              <h1
                style={{
                  fontSize: "2.8rem",
                  color: "#222",
                  marginBottom: "1rem",
                  lineHeight: 1.15,
                  fontWeight: "700",
                }}
              >
                Your skin,
                <br />
                your ritual.
              </h1>
              <p
                style={{
                  color: "#666",
                  fontSize: "0.85rem",
                  marginBottom: "1.8rem",
                  lineHeight: 1.6,
                  maxWidth: "300px",
                }}
              >
                Clean ingredients, real results.
                <br />
                Skincare built for your everyday ritual.
              </p>
              <button
                onClick={() => setCurrentView("plp")}
                style={{
                  background: "#6b8268",
                  color: "#fff",
                  padding: "0.7rem 1.8rem",
                  borderRadius: "4px",
                  minHeight: "40px",
                  fontWeight: "600",
                  fontSize: "0.85rem",
                  width: "fit-content",
                  cursor: "pointer",
                }}
              >
                Shop Now
              </button>
            </div>
            <div
              style={{
                background: "#e5dacd",
                borderRadius: "12px",
                minHeight: "340px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                overflow: "hidden",
              }}
            >
              <img
                src={productsData[2].img}
                alt="Hero Serum"
                style={{ width: "80%", height: "80%", objectFit: "contain" }}
              />
            </div>
          </section>

          {/* Shop by Category (Fixed with categoryImages) */}
          <section style={{ marginBottom: "2.5rem" }}>
            <h3
              style={{
                marginBottom: "1.2rem",
                fontSize: "1.1rem",
                fontWeight: "700",
              }}
            >
              Shop by Category
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "1.2rem",
              }}
            >
              {["Cleanser", "Toner", "Serum", "Moisturizer", "Sunscreen"].map(
                (cat) => (
                  <div
                    key={cat}
                    onClick={() => {
                      setActiveCategory(cat);
                      setCurrentView("plp");
                    }}
                    style={{
                      background: "#e5dacd",
                      padding: "1rem",
                      borderRadius: "10px",
                      textAlign: "center",
                      cursor: "pointer",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "110px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "0.6rem",
                        overflow: "hidden",
                        borderRadius: "6px",
                      }}
                    >
                      <img
                        src={categoryImages[cat]}
                        alt={cat}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <p
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        color: "#333",
                      }}
                    >
                      {cat}
                    </p>
                  </div>
                )
              )}
            </div>
          </section>

          {/* Featured Products */}
          <section style={{ marginBottom: "3rem" }}>
            <h3
              style={{
                marginBottom: "1.2rem",
                fontSize: "1.1rem",
                fontWeight: "700",
              }}
            >
              Featured Products
            </h3>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(5, 1fr)",
                gap: "1.2rem",
              }}
            >
              {productsData.map((product) => (
                <div
                  key={product.id}
                  style={{
                    background: "#e5dacd",
                    padding: "1rem",
                    borderRadius: "10px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "120px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      marginBottom: "0.6rem",
                      overflow: "hidden",
                      borderRadius: "6px",
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setSelectedProduct(product);
                      setCurrentView("pdp");
                    }}
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <div>
                    <h5
                      style={{
                        fontSize: "0.85rem",
                        fontWeight: "600",
                        color: "#222",
                        marginBottom: "4px",
                      }}
                    >
                      {product.name}
                    </h5>
                    <p
                      style={{
                        fontSize: "0.8rem",
                        color: "#555",
                        fontWeight: "bold",
                        marginBottom: "6px",
                      }}
                    >
                      ₱{product.price.toFixed(2)}
                    </p>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        gap: "2px",
                        color: "#444",
                        fontSize: "0.7rem",
                        marginBottom: "8px",
                      }}
                    >
                      ★★★★☆
                    </div>
                  </div>
                  <button
                    onClick={() => addToCart(product, 1)}
                    style={{
                      background: "#ffffff",
                      border: "1px solid #d0c4b6",
                      borderRadius: "6px",
                      padding: "6px",
                      minHeight: "36px",
                      cursor: "pointer",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    🛒
                  </button>
                </div>
              ))}
            </div>
          </section>

          {/* Features Banner */}
          <section
            style={{
              background: "#eae1d5",
              padding: "1.8rem 5%",
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              textAlign: "center",
              borderTop: "1px solid #dcd3c7",
              borderBottom: "1px solid #dcd3c7",
              borderRadius: "8px",
            }}
          >
            <div>
              🚚 <strong>Free shipping</strong>
              <br />
              <small style={{ color: "#666" }}>for orders ₱1500+</small>
            </div>
            <div>
              🛡️ <strong>100% authentic</strong>
              <br />
              <small style={{ color: "#666" }}>skincare products</small>
            </div>
            <div>
              🔒 <strong>Secure payment</strong>
              <br />
              <small style={{ color: "#666" }}>guaranteed safety</small>
            </div>
          </section>
        </main>
      )}

      {/* 2. PLP (PRODUCT LISTING PAGE) */}
      {currentView === "plp" && (
        <main style={{ flex: 1, padding: "2rem 5%" }}>
          <div style={{ marginBottom: "1.5rem" }}>
            <h2 style={{ fontSize: "1.4rem", fontWeight: "800" }}>SKINCARE</h2>
            <p style={{ fontSize: "0.75rem", color: "#777" }}>
              Healthy skin, happy you.
            </p>
          </div>

          <div
            style={{
              display: "flex",
              gap: "1rem",
              marginBottom: "1.5rem",
              background: "#e5dacd",
              padding: "0.8rem 1.2rem",
              borderRadius: "8px",
              alignItems: "center",
            }}
          >
            <span
              style={{
                fontSize: "0.85rem",
                fontWeight: "bold",
                marginRight: "0.5rem",
              }}
            >
              Filter
            </span>
            <select
              value={activeCategory}
              onChange={(e) => setActiveCategory(e.target.value)}
              style={{
                padding: "0.4rem 0.8rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "0.8rem",
                background: "#fff",
              }}
            >
              <option value="All">Category: All</option>
              <option value="Cleanser">Cleanser</option>
              <option value="Toner">Toner</option>
              <option value="Serum">Serum</option>
              <option value="Moisturizer">Moisturizer</option>
              <option value="Sunscreen">Sunscreen</option>
            </select>

            <select
              value={activeSkinType}
              onChange={(e) => setActiveSkinType(e.target.value)}
              style={{
                padding: "0.4rem 0.8rem",
                borderRadius: "4px",
                border: "1px solid #ccc",
                fontSize: "0.8rem",
                background: "#fff",
              }}
            >
              <option value="All">Skin Type: All</option>
              <option value="Normal">Normal</option>
              <option value="Dry">Dry</option>
              <option value="Oily">Oily</option>
              <option value="Combination">Combination</option>
              <option value="Sensitive">Sensitive</option>
            </select>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "220px 1fr",
              gap: "2rem",
            }}
          >
            <aside
              style={{
                background: "#e5dacd",
                padding: "1.2rem",
                borderRadius: "10px",
                height: "fit-content",
              }}
            >
              <h4
                style={{
                  marginBottom: "1rem",
                  fontSize: "0.9rem",
                  borderBottom: "1px solid #dcd3c7",
                  paddingBottom: "0.4rem",
                }}
              >
                Filter
              </h4>

              <div style={{ marginBottom: "1.2rem" }}>
                <p
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  Category
                </p>
                {["Cleanser", "Toner", "Moisturizer", "Serum", "Sunscreen"].map(
                  (c) => (
                    <label
                      key={c}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "0.75rem",
                        margin: "4px 0",
                        cursor: "pointer",
                        color: "#444",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={activeCategory === c}
                        onChange={() =>
                          setActiveCategory(activeCategory === c ? "All" : c)
                        }
                        style={{ marginRight: "6px" }}
                      />{" "}
                      {c}
                    </label>
                  )
                )}
              </div>

              <div style={{ marginBottom: "1.2rem" }}>
                <p
                  style={{
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  Skin Type
                </p>
                {["Normal", "Dry", "Oily", "Combination", "Sensitive"].map(
                  (s) => (
                    <label
                      key={s}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        fontSize: "0.75rem",
                        margin: "4px 0",
                        cursor: "pointer",
                        color: "#444",
                      }}
                    >
                      <input
                        type="checkbox"
                        checked={activeSkinType === s}
                        onChange={() =>
                          setActiveSkinType(activeSkinType === s ? "All" : s)
                        }
                        style={{ marginRight: "6px" }}
                      />{" "}
                      {s}
                    </label>
                  )
                )}
              </div>
            </aside>

            <section>
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  gap: "1rem",
                  marginBottom: "1.2rem",
                }}
              >
                <input
                  type="text"
                  placeholder="🔍 Search Products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  style={{
                    padding: "0.4rem 0.8rem",
                    borderRadius: "4px",
                    border: "1px solid #ccc",
                    fontSize: "0.8rem",
                    width: "220px",
                    background: "#fff",
                  }}
                />
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(4, 1fr)",
                  gap: "1.2rem",
                }}
              >
                {filteredProducts.map((product) => (
                  <div
                    key={product.id}
                    style={{
                      background: "#e5dacd",
                      padding: "1rem",
                      borderRadius: "10px",
                      textAlign: "center",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        height: "130px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: "0.6rem",
                        overflow: "hidden",
                        borderRadius: "6px",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setSelectedProduct(product);
                        setCurrentView("pdp");
                      }}
                    >
                      <img
                        src={product.img}
                        alt={product.name}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div>
                      <h5
                        style={{
                          fontSize: "0.85rem",
                          fontWeight: "600",
                          color: "#222",
                          marginBottom: "4px",
                        }}
                      >
                        {product.name}
                      </h5>
                      <p
                        style={{
                          fontSize: "0.8rem",
                          fontWeight: "bold",
                          color: "#444",
                          marginBottom: "4px",
                        }}
                      >
                        ₱{product.price.toFixed(2)}
                      </p>
                    </div>
                    <button
                      onClick={() => addToCart(product, 1)}
                      style={{
                        background: "#ffffff",
                        border: "1px solid #d0c4b6",
                        borderRadius: "6px",
                        padding: "6px",
                        minHeight: "36px",
                        cursor: "pointer",
                        width: "100%",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      🛒
                    </button>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </main>
      )}

      {/* 3. BESTSELLER PAGE (Fixed: Nilagyan ng dedikadong view) */}
      {currentView === "bestseller" && (
        <main style={{ flex: 1, padding: "2rem 5%" }}>
          <h2
            style={{
              fontSize: "1.4rem",
              fontWeight: "800",
              marginBottom: "0.5rem",
            }}
          >
            BESTSELLERS
          </h2>
          <p
            style={{
              fontSize: "0.8rem",
              color: "#666",
              marginBottom: "1.5rem",
            }}
          >
            Our customer-favorite skincare essentials.
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "1.2rem",
            }}
          >
            {productsData
              .filter((p) => p.isBestseller)
              .map((product) => (
                <div
                  key={product.id}
                  style={{
                    background: "#e5dacd",
                    padding: "1rem",
                    borderRadius: "10px",
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div
                    style={{
                      width: "100%",
                      height: "130px",
                      cursor: "pointer",
                      overflow: "hidden",
                      borderRadius: "6px",
                      marginBottom: "0.6rem",
                    }}
                    onClick={() => {
                      setSelectedProduct(product);
                      setCurrentView("pdp");
                    }}
                  >
                    <img
                      src={product.img}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </div>
                  <h5
                    style={{
                      fontSize: "0.85rem",
                      fontWeight: "600",
                      marginBottom: "4px",
                    }}
                  >
                    {product.name}
                  </h5>
                  <p
                    style={{
                      fontSize: "0.8rem",
                      fontWeight: "bold",
                      marginBottom: "8px",
                    }}
                  >
                    ₱{product.price.toFixed(2)}
                  </p>
                  <button
                    onClick={() => addToCart(product, 1)}
                    style={{
                      background: "#fff",
                      border: "1px solid #d0c4b6",
                      borderRadius: "6px",
                      padding: "6px",
                      cursor: "pointer",
                    }}
                  >
                    Add to Cart 🛒
                  </button>
                </div>
              ))}
          </div>
        </main>
      )}

      {/* 4. ABOUT PAGE (Fixed: Nilagyan ng dedikadong view) */}
      {currentView === "about" && (
        <main
          style={{
            flex: 1,
            padding: "3rem 10%",
            maxWidth: "800px",
            margin: "0 auto",
          }}
        >
          <h2
            style={{
              fontSize: "2rem",
              fontWeight: "800",
              marginBottom: "1rem",
              color: "#222",
            }}
          >
            About Lumi Skin
          </h2>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#555",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}
          >
            At Lumi Skin, we believe that skincare shouldn't be complicated. Our
            mission is to bring clean, highly effective, and nourishing
            ingredients straight to your daily routine without the clutter.
          </p>
          <p
            style={{
              fontSize: "0.95rem",
              color: "#555",
              lineHeight: 1.8,
              marginBottom: "1.5rem",
            }}
          >
            Every formula is crafted with care to ensure it respects your skin's
            natural barrier while delivering radiant, real results. Your skin,
            your ritual.
          </p>
          <button
            onClick={() => setCurrentView("plp")}
            style={{
              background: "#6b8268",
              color: "#fff",
              padding: "0.7rem 1.8rem",
              borderRadius: "4px",
              fontWeight: "600",
              border: "none",
              cursor: "pointer",
            }}
          >
            Explore Products
          </button>
        </main>
      )}

      {/* 5. PDP (PRODUCT DETAIL PAGE) */}
      {currentView === "pdp" && (
        <main
          style={{
            flex: 1,
            padding: "2rem 5%",
            maxWidth: "1000px",
            margin: "0 auto",
          }}
        >
          <div
            style={{
              fontSize: "0.8rem",
              color: "#777",
              marginBottom: "1.5rem",
            }}
          >
            Home &gt; Skincare &gt;{" "}
            <strong style={{ color: "#222" }}>{selectedProduct.name}</strong>
          </div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "70px 1fr 1.2fr",
              gap: "2rem",
              alignItems: "start",
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.6rem",
              }}
            >
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    width: "100%",
                    height: "65px",
                    borderRadius: "6px",
                    overflow: "hidden",
                    border: "1px solid #dcd3c7",
                    cursor: "pointer",
                    background: "#e5dacd",
                  }}
                >
                  <img
                    src={selectedProduct.img}
                    alt="thumb"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                </div>
              ))}
            </div>

            <div
              style={{
                background: "#e5dacd",
                borderRadius: "10px",
                padding: "1.5rem",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "340px",
              }}
            >
              <img
                src={selectedProduct.img}
                alt={selectedProduct.name}
                style={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            </div>

            <div>
              <span
                style={{
                  background: "#6b8268",
                  color: "#fff",
                  fontSize: "0.65rem",
                  padding: "4px 8px",
                  borderRadius: "3px",
                  fontWeight: "bold",
                }}
              >
                Bestseller
              </span>
              <h2
                style={{
                  fontSize: "1.8rem",
                  margin: "0.5rem 0",
                  fontWeight: "700",
                }}
              >
                {selectedProduct.name}
              </h2>
              <p
                style={{
                  fontSize: "1.3rem",
                  fontWeight: "bold",
                  color: "#333",
                  marginBottom: "1.2rem",
                }}
              >
                ₱{selectedProduct.price.toFixed(2)}
              </p>

              <p
                style={{
                  fontSize: "0.85rem",
                  color: "#666",
                  lineHeight: 1.6,
                  marginBottom: "1.8rem",
                }}
              >
                {selectedProduct.description}
              </p>

              <div
                style={{
                  display: "flex",
                  gap: "1rem",
                  alignItems: "center",
                  marginBottom: "2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    border: "1px solid #ccc",
                    borderRadius: "6px",
                    overflow: "hidden",
                  }}
                >
                  <button
                    onClick={() => setPdpQty((q) => Math.max(1, q - 1))}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#eae1d5",
                      fontSize: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    -
                  </button>
                  <span
                    style={{
                      padding: "0.5rem 1rem",
                      fontWeight: "bold",
                      background: "#fff",
                      fontSize: "0.9rem",
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    {pdpQty}
                  </span>
                  <button
                    onClick={() => setPdpQty((q) => q + 1)}
                    style={{
                      padding: "0.5rem 1rem",
                      background: "#eae1d5",
                      fontSize: "1rem",
                      cursor: "pointer",
                    }}
                  >
                    +
                  </button>
                </div>
                <button
                  onClick={() => addToCart(selectedProduct, pdpQty)}
                  style={{
                    background: "#6b8268",
                    color: "#fff",
                    border: "none",
                    padding: "0.8rem 2rem",
                    borderRadius: "6px",
                    fontWeight: "bold",
                    minHeight: "44px",
                    flex: 1,
                    fontSize: "0.85rem",
                    cursor: "pointer",
                  }}
                >
                  Add to Cart
                </button>
              </div>
            </div>
          </div>
        </main>
      )}

      {/* CART DRAWER */}
      {isCartOpen && (
        <div
          style={{
            position: "fixed",
            top: 0,
            right: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.4)",
            display: "flex",
            justifyContent: "flex-end",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              background: "#ffffff",
              width: "360px",
              height: "100%",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                borderBottom: "1px solid #eee",
                paddingBottom: "1rem",
              }}
            >
              <h3 style={{ fontSize: "1.1rem", fontWeight: "700" }}>
                Your Cart
              </h3>
              <button
                onClick={() => setIsCartOpen(false)}
                style={{
                  background: "none",
                  fontSize: "1.4rem",
                  cursor: "pointer",
                }}
              >
                &times;
              </button>
            </div>

            <div style={{ flex: 1, overflowY: "auto", margin: "1rem 0" }}>
              {cart.length === 0 ? (
                <p
                  style={{
                    textAlign: "center",
                    color: "#888",
                    marginTop: "2rem",
                    fontSize: "0.85rem",
                  }}
                >
                  Your cart is empty.
                </p>
              ) : (
                cart.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: "0.8rem",
                      marginBottom: "0.8rem",
                      borderBottom: "1px solid #eee",
                    }}
                  >
                    <div>
                      <strong style={{ fontSize: "0.85rem" }}>
                        {item.name}
                      </strong>
                      <p style={{ fontSize: "0.80rem", color: "#666" }}>
                        ₱{item.price.toFixed(2)} × {item.quantity}
                      </p>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      style={{
                        background: "none",
                        color: "#d9534f",
                        fontSize: "0.75rem",
                        fontWeight: "bold",
                        cursor: "pointer",
                      }}
                    >
                      Remove
                    </button>
                  </div>
                ))
              )}
            </div>

            <div style={{ borderTop: "1px solid #eee", paddingTop: "1rem" }}>
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  marginBottom: "1rem",
                  fontWeight: "bold",
                  fontSize: "0.95rem",
                }}
              >
                <span>Total:</span>
                <span>₱{totalCartPrice.toFixed(2)}</span>
              </div>
              <button
                style={{
                  width: "100%",
                  background: "#6b8268",
                  color: "#fff",
                  padding: "0.8rem",
                  borderRadius: "6px",
                  fontWeight: "bold",
                  minHeight: "44px",
                  fontSize: "0.85rem",
                  cursor: "pointer",
                }}
              >
                Proceed to Checkout
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer
        style={{
          background: "#e5dacd",
          borderTop: "1px solid #dcd3c7",
          padding: "1.8rem 5%",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <div style={{ fontWeight: "800", fontSize: "1.1rem" }}>LUMI SKIN</div>
        <div style={{ display: "flex", gap: "1.2rem", fontSize: "1.1rem" }}>
          <span>📘</span> <span>📷</span> <span>🎵</span> <span>📺</span>
        </div>
        <div style={{ fontSize: "0.75rem", color: "#555" }}>
          Subscribed for updates!
        </div>
      </footer>
    </div>
  );
}
