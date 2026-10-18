
import React, { useState } from "react";
import "./App.css";

const initialProducts = [
  { id: "P101", name: "Laptop", price: 55000, quantity: 10 },
  { id: "P102", name: "Mobile", price: 20000, quantity: 15 },
  { id: "P103", name: "Keyboard", price: 1500, quantity: 25 },
  { id: "P104", name: "Mouse", price: 500, quantity: 30 },
];

function App() {
  const [products, setProducts] = useState(initialProducts);
  const [selectedId, setSelectedId] = useState("");
  const [form, setForm] = useState({
    name: "",
    price: "",
    quantity: "",
  });
  const [message, setMessage] = useState("");
  const [isSuccess, setIsSuccess] = useState(false);

  const selectedProduct = products.find(
    (product) => product.id === selectedId
  );

  const handleSelect = (event) => {
    const id = event.target.value;
    setSelectedId(id);
    setMessage("");

    const product = products.find((item) => item.id === id);

    if (product) {
      setForm({
        name: product.name,
        price: String(product.price),
        quantity: String(product.quantity),
      });
    } else {
      setForm({ name: "", price: "", quantity: "" });
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
    setMessage("");
  };

  const handleUpdate = (event) => {
    event.preventDefault();

    if (!selectedProduct) {
      setIsSuccess(false);
      setMessage("Please select a product first.");
      return;
    }

    const name = form.name.trim();
    const price = Number(form.price);
    const quantity = Number(form.quantity);

    if (
      !name ||
      form.price.trim() === "" ||
      !Number.isFinite(price) ||
      price <= 0 ||
      form.quantity.trim() === "" ||
      !Number.isInteger(quantity) ||
      quantity < 0
    ) {
      setIsSuccess(false);
      setMessage(
        "Enter a valid name, price greater than 0, and whole quantity."
      );
      return;
    }

    setProducts((previous) =>
      previous.map((product) =>
        product.id === selectedId
          ? { ...product, name, price, quantity }
          : product
      )
    );

    setIsSuccess(true);
    setMessage("Product updated successfully!");
  };

  const handleReset = () => {
    if (!selectedProduct) {
      setForm({ name: "", price: "", quantity: "" });
      setMessage("");
      return;
    }

    setForm({
      name: selectedProduct.name,
      price: String(selectedProduct.price),
      quantity: String(selectedProduct.quantity),
    });
    setMessage("");
  };

  return (
    <main className="page">
      <section className="product-card">
        <header className="app-header">
          <div className="header-icon">▦</div>
          <h1>Product Management</h1>
          <p>Select, edit and update product information</p>
        </header>

        <form className="product-form" onSubmit={handleUpdate}>
          <div className="form-group">
            <label htmlFor="productSelect">
              Select Existing Product
            </label>
            <select
              id="productSelect"
              value={selectedId}
              onChange={handleSelect}
              required
            >
              <option value="">-- Select Product --</option>
              {products.map((product) => (
                <option key={product.id} value={product.id}>
                  {product.name} ({product.id})
                </option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label htmlFor="productId">Product ID</label>
            <input
              id="productId"
              type="text"
              value={selectedId}
              placeholder="Auto-filled"
              disabled
            />
          </div>

          <div className="form-group">
            <label htmlFor="name">Product Name</label>
            <input
              id="name"
              name="name"
              type="text"
              placeholder="Enter product name"
              value={form.name}
              onChange={handleChange}
              required
              maxLength={100}
              disabled={!selectedId}
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="price">Price (₹)</label>
              <input
                id="price"
                name="price"
                type="number"
                placeholder="Enter price"
                value={form.price}
                onChange={handleChange}
                min="0.01"
                step="0.01"
                required
                disabled={!selectedId}
              />
            </div>

            <div className="form-group">
              <label htmlFor="quantity">Quantity</label>
              <input
                id="quantity"
                name="quantity"
                type="number"
                placeholder="Enter quantity"
                value={form.quantity}
                onChange={handleChange}
                min="0"
                step="1"
                required
                disabled={!selectedId}
              />
            </div>
          </div>

          <div className="button-row">
            <button
              className="update-button"
              type="submit"
              disabled={!selectedId}
            >
              Update Product
            </button>
            <button
              className="reset-button"
              type="button"
              onClick={handleReset}
              disabled={!selectedId}
            >
              Reset
            </button>
          </div>

          {message && (
            <div
              className={`message ${isSuccess ? "success" : "error"}`}
              role="status"
            >
              <span>{isSuccess ? "✓" : "!"}</span>
              {message}
            </div>
          )}
        </form>

        <section className="table-section">
          <div className="table-heading">
            <div>
              <h2>All Products</h2>
              <p>Manage your product inventory</p>
            </div>
            <span className="product-count">
              {products.length} Products
            </span>
          </div>

          <div className="table-wrapper">
            <table>
              <thead>
                <tr>
                  <th>Product ID</th>
                  <th>Product Name</th>
                  <th>Price (₹)</th>
                  <th>Quantity</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product.id}
                    className={
                      selectedId === product.id ? "selected-row" : ""
                    }
                  >
                    <td>
                      <span className="product-id">{product.id}</span>
                    </td>
                    <td className="product-name">{product.name}</td>
                    <td>
                      {product.price.toLocaleString("en-IN", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td>
                      <span className="quantity-badge">
                        {product.quantity}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="footer-note">
            Changes appear in the table immediately after updating.
          </p>
        </section>
      </section>
    </main>
  );
}

export default App;