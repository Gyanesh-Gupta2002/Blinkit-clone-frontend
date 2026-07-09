import { useNavigate } from "react-router-dom";

function Cart({ cart, setCart, increaseQty, decreaseQty }) {
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => {
    return sum + item.price * (item.quantity || 1);
  }, 0);

  const removeItem = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <div className="w-[95%] md:w-[90%] mx-auto mt-6 md:mt-10 mb-10">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-5">🛒 My Cart</h1>

      <div className="mb-4 md:mb-6">
        <h2 className="text-lg md:text-xl font-semibold">
          Total Items: {cart.length}
        </h2>
        <h2 className="text-lg md:text-xl font-bold text-green-600">
          Total Price: ₹{total}
        </h2>
      </div>

      {cart.length === 0 ? (
        <h2 className="text-gray-500 text-base md:text-lg">
          Your cart is empty 😔
        </h2>
      ) : (
        cart.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 border p-3 md:p-4 rounded-xl mb-3 shadow"
          >
            <div className="flex items-center gap-3 md:gap-4">
              <img
                src={item.image}
                alt={item.name}
                className="w-12 h-12 md:w-16 md:h-16 object-contain flex-shrink-0"
              />
              <div>
                <h2 className="font-bold text-base md:text-lg">{item.name}</h2>
                <p className="text-green-600 font-semibold text-sm md:text-base">
                  ₹{item.price}
                </p>

                <div className="flex items-center gap-2 md:gap-3 mt-2 md:mt-3">
                  <button
                    onClick={() => decreaseQty(item.id)}
                    className="bg-gray-300 px-2.5 py-1 rounded text-sm"
                  >
                    -
                  </button>
                  <span className="font-bold text-sm md:text-base">{item.quantity}</span>
                  <button
                    onClick={() => increaseQty(item.id)}
                    className="bg-green-600 text-white px-2.5 py-1 rounded text-sm"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            <button
              onClick={() => removeItem(item.id)}
              className="bg-red-500 text-white px-4 py-2 rounded-lg text-sm self-start sm:self-auto"
            >
              Delete
            </button>
          </div>
        ))
      )}

      {cart.length > 0 && (
        <button
          onClick={() => navigate("/checkout")}
          className="mt-4 md:mt-6 bg-green-600 text-white px-6 md:px-8 py-3 rounded-xl text-base md:text-lg hover:bg-green-700 w-full"
        >
          Proceed to Checkout — ₹{total}
        </button>
      )}
    </div>
  );
}

export default Cart;