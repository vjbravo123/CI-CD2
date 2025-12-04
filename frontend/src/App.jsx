import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [items, setItems] = useState([]);

  useEffect(() => {
  const fetchItems = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL}/api/items`);
      setItems(res.data.data); // Strapi returns data inside data.data
    } catch (error) {
      console.error("Error fetching items:", error);
    }
  };

  fetchItems();
}, []);


  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Products</h1>

      <div style={styles.grid}>
        {items.map((item) => (
          <div key={item.id} style={styles.card}>
            <img
              src={item.link}
              alt={item.name}
              style={styles.image}
            />

            <h2 style={styles.title}>{item.name}</h2>
            <p style={styles.desc}>{item.description}</p>
            <p style={styles.price}>₹{item.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: "20px",
    fontFamily: "Arial",
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px",
  },
  card: {
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #ddd",
    background: "#fff",
    boxShadow: "0 1px 5px rgba(0,0,0,0.1)",
  },
  image: {
    width: "100%",
    height: "180px",
    objectFit: "cover",
    borderRadius: "8px",
  },
  title: {
    fontSize: "18px",
    marginTop: "10px",
  },
  desc: {
    fontSize: "14px",
    color: "#555",
  },
  price: {
    fontWeight: "bold",
    marginTop: "10px",
    color: "#007bff",
  },
};

export default App;
