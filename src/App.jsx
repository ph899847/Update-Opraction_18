
import React, { useState } from "react";
import "./App.css";

function App() {
  const [products, setProducts] = useState([
    { id: 1, name: "Laptop", price: 50000 },
    { id: 2, name: "Mobile", price: 20000 },
  ]);

  const [selectedProduct, setSelectedProduct] = useState("Laptop");
  const [price, setPrice] = useState("50000");
  const [message, setMessage] = useState("");

  const handleProductChange = (e) => {
    const name = e.target.value;
    setSelectedProduct(name);

    const selected = products.find(
      (item) => item.name === name
    );

    setPrice(String(selected.price));
    setMessage("");
  };

  const handleUpdate = (e) => {
    e.preventDefault();

    if (
      price.trim() === "" ||
      !Number.isFinite(Number(price)) ||
      Number(price) < 0
    ) {
      setMessage("Please enter a valid price.");
      return;
    }

    setProducts((prev) =>
      prev.map((item) =>
        item.name === selectedProduct
          ? { ...item, price: Number(price) }
          : item
      )
    );

    setMessage(`${selectedProduct} updated successfully!`);
  };

  const formatPrice = (amount) =>
    "₹" + amount.toLocaleString("en-IN");

  return (
    <div className="app-container">

      {/* Page Heading */}
      <header className="page-header">
        <h1>Product Management</h1>
        <p>Manage and update your products easily</p>
      </header>

      {/* Update Product Box */}
      <section className="card">
        <h2>Update Product</h2>

        <form onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="product">
              Select Product
            </label>

            <select
              id="product"
              value={selectedProduct}
              onChange={handleProductChange}
            >
              {products.map((item) => (
                <option key={item.id} value={item.name}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="price">
              Product Price (₹)
            </label>

            <input
              id="price"
              type="number"
              min="0"
              step="1"
              value={price}
              onChange={(e) => {
                setPrice(e.target.value);
                setMessage("");
              }}
              placeholder="Enter product price"
              required
            />
          </div>

          <button type="submit" className="update-btn">
            Update Product
          </button>

          {message && (
            <p
              className={
                "message " +
                (message.includes("successfully")
                  ? "success"
                  : "error")
              }
              role="status"
            >
              {message}
            </p>
          )}
        </form>
      </section>

      {/* Product List Box */}
      <section className="card">
        <h2>Product List</h2>

        <div className="product-list">
          {products.map((item) => (
            <div className="product-item" key={item.id}>
              <div className="product-info">
                <div className="product-icon">
                  {item.name === "Laptop" ? "L" : "M"}
                </div>

                <span className="product-name">
                  {item.name}
                </span>
              </div>

              <span className="product-price">
                {formatPrice(item.price)}
              </span>
            </div>
          ))}
        </div>
      </section>

    </div>
  );
}

export default App;
