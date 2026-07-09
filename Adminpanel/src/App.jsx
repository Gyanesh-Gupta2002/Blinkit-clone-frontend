import { useEffect, useState } from "react";
import axios from "axios";

function App() {
  const [products, setProducts] = useState([]);
  const [form, setForm] = useState({ name: "", price: "", image: "" });
  const [editId, setEditId] = useState(null);

  const fetchProducts = () => {
    axios
      .get("http://localhost:5000/products")
      .then((res) => setProducts(res.data))
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`http://localhost:5000/products/${editId}`, form);
        alert("Product updated!");
      } else {
        await axios.post("http://localhost:5000/products", form);
        alert("Product added!");
      }
      setForm({ name: "", price: "", image: "" });
      setEditId(null);
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Something went wrong");
    }
  };

  const handleEdit = (product) => {
    setForm({ name: product.name, price: product.price, image: product.image });
    setEditId(product.id);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;

    try {
      await axios.delete(`http://localhost:5000/products/${id}`);
      fetchProducts();
    } catch (err) {
      console.log(err);
      alert("Failed to delete");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 px-4">
      <h1 className="text-3xl font-bold mb-6">🛠️ Admin Panel — Manage Products</h1>

      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 items-end"
      >
        <div>
          <label className="block text-sm font-medium mb-1">Name</label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product name"
            required
            className="border rounded-lg p-2 w-full outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Price</label>
          <input
            type="number"
            name="price"
            value={form.price}
            onChange={handleChange}
            placeholder="Price"
            required
            className="border rounded-lg p-2 w-full outline-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Image Path</label>
          <input
            type="text"
            name="image"
            value={form.image}
            onChange={handleChange}
            placeholder="/assets/xyz.png"
            required
            className="border rounded-lg p-2 w-full outline-none"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
        >
          {editId ? "Update Product" : "Add Product"}
        </button>
      </form>

      <div className="bg-white shadow-md rounded-xl overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-100">
            <tr>
              <th className="p-3">ID</th>
              <th className="p-3">Image</th>
              <th className="p-3">Name</th>
              <th className="p-3">Price</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-t">
                <td className="p-3">{product.id}</td>
                <td className="p-3">
                  <img src={product.image} alt={product.name} className="w-12 h-12 object-contain" />
                </td>
                <td className="p-3">{product.name}</td>
                <td className="p-3">₹{product.price}</td>
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() => handleEdit(product)}
                    className="bg-blue-500 text-white px-3 py-1 rounded-lg hover:bg-blue-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;