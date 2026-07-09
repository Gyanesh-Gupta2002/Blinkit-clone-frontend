function ProductCard({ productId, image, name, price, addToCart, product, cart, increaseQty, decreaseQty }) {
    const cartItem = cart?.find((item) => item.id === productId);
    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl md: shadow-md border border-gray-100 dark:border-gray-700 p-3 md:p-4 hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
  
        <div className="flex justify-between items-center mb-2">
          <span className="bg-red-500 text-white text-xs font-semibold px-2.5 py-1 rounded-full">
            🔥 Trending
          </span>
  
          <span className="text-sm text-gray-500 dark:text-gray-400 font-medium">⭐ 4.8</span>
        </div>
  
        <img
          src={image}
          alt={name}
          className="w-20 h-20 md:w-32 md:h-32 object-contain mx-auto mt-2 md:mt-4"
        />
  
        <h2 className="font-bold mt-2 md:mt-4 text-sm md:text-base line-clamp-1 text-gray-900 dark:text-white">{name}</h2>
  
        <div className="flex justify-between items-center mt-2 md:mt-4">
          <h1 className="font-bold text-base md:text-xl text-gray-900 dark:text-white">₹{price}</h1>
  
        {
  cartItem ? (
    <div className="flex items-center gap-2">
      <button
        onClick={() => decreaseQty(product.id)}
        className="bg-gray-300 dark:bg-gray-600 dark:text-white px-3 py-1 rounded"
      >
        -
      </button>

      <span className="text-gray-900 dark:text-white">{cartItem.quantity}</span>

      <button
        onClick={() => increaseQty(product.id)}
        className="bg-green-500 text-white px-3 py-1 rounded"
      >
        +
      </button>
    </div>
  ) : (
    <button
      onClick={() => addToCart(product)}
      className="bg-green-500 text-white px-4 py-2 rounded-xl hover:bg-green-600 transition duration-300"
    >
      ADD TO CART
    </button>
  )
}
        </div>
  
      </div>
    );
  }
  
  export default ProductCard;