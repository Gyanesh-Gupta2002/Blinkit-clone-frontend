import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Hero from "./Components/Hero";
import QuickDelivery from "./Components/QuickDelivery";
import TrendingProducts from "./Components/TrendingProducts";
import Footer from "./Components/Footer";
import Cart from "./Cart";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import { useState, useEffect } from "react";
import Checkout from "./Components/Checkout";
import MyOrders from "./Components/MyOrders";
import Contact from "./Components/Contact";
import About from "./Components/About";

function Home({ addToCart, cart, increaseQty, decreaseQty, searchTerm, selectedCategory, setSelectedCategory }) {
  return (
    <>
      <Hero />
      <QuickDelivery selectedCategory={selectedCategory} setSelectedCategory={setSelectedCategory} />
      <div id="products-section">
      <TrendingProducts
        addToCart={addToCart}
        cart={cart}
        increaseQty={increaseQty}
        decreaseQty={decreaseQty}
        searchTerm={searchTerm}
        selectedCategory={selectedCategory}
      />
      </div>
    </>
  );
}

function App() {
  const [cart, setCart] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    }, []);
  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  }

  const addToCart = (product) => {
    const exist = cart.find((item) => item.id === product.id);

    if (exist) {
      setCart(
        cart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const increaseQty = (id) => {
    setCart(
      cart.map((item) =>
        item.id === id ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const decreaseQty = (id) => {
    setCart(
      cart
        .map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  return (
    <>
      <Header cart={cart} searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user} logout={logout} />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              addToCart={addToCart}
              cart={cart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
              searchTerm={searchTerm}
              selectedCategory={selectedCategory}
              setSelectedCategory={setSelectedCategory}
            />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              setCart={setCart}
              increaseQty={increaseQty}
              decreaseQty={decreaseQty}
            />
          }
        />
        <Route path="/Login" element={<Login setUser={setUser} />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/checkout" element={<Checkout cart={cart} setCart={setCart} user={user} />} />
        <Route path="/my-orders" element={<MyOrders user={user} />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;