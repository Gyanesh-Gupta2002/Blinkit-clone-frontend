import ProductCard from "./ProductCard";
import { useEffect, useState } from "react";

function TrendingProducts({ addToCart, cart, increaseQty, decreaseQty, searchTerm, selectedCategory }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.log(err));
  }, []);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? product.category === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="w-[90%] mx-auto mt-16">
      <h1 className="text-3xl font-bold mb-8 text-gray-900 dark:text-white">
        🔥 Trending Products
      </h1>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 md:gap-8">
        {filteredProducts.map((product, index) => (
          <ProductCard
            key={index}
            productId={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
            addToCart={addToCart}
            product={product}
            cart={cart}
            increaseQty={increaseQty}
            decreaseQty={decreaseQty}
          />
        ))}
      </div>
    </div>
  );
}

export default TrendingProducts;