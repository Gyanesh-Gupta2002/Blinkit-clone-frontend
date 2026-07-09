import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Checkout({ cart, setCart, user }) {
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handlePlaceOrder = async () => {
  if (!address.trim()) {
    alert("Please enter delivery address");
    return;
  }

  if (paymentMethod === "Online") {
    try {
      const { data } = await axios.post("http://localhost:5000/create-razorpay-order", {
        amount: total,
      });

      const options = {
        key: "rzp_test_TBKvEUNJHKl8M9", // yahan wahi Key ID daalo jo backend mein hai
        amount: data.amount,
        currency: "INR",
        name: "QuickKart",
        description: "Order Payment",
        order_id: data.id,
        handler: async function (response) {
          const res = await axios.post("http://localhost:5000/orders", {
            user_email: user?.email || "guest",
            items: cart,
            total_price: total,
            address,
            payment_method: "Online (Paid)",
          });
          alert("Payment Successful! " + res.data.message);
          setCart([]);
          navigate("/");
        },
        prefill: {
          name: user?.name || "Guest",
          email: user?.email || "",
        },
        theme: { color: "#16a34a" },
      };

      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (err) {
      console.log(err);
      alert("Payment initialization failed");
    }
  } else {
    try {
      const res = await axios.post("http://localhost:5000/orders", {
        user_email: user?.email || "guest",
        items: cart,
        total_price: total,
        address,
        payment_method: paymentMethod,
      });
      alert(res.data.message);
      setCart([]);
      navigate("/");
    } catch (err) {
      console.log(err);
      alert("Order Failed");
    }
  }
};

  return (
    <div className="w-[95%] md:w-[90%] mx-auto mt-6 md:mt-10 mb-10 md:mb-16">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6">🧾 Checkout</h1>

      {cart.length === 0 ? (
        <h2 className="text-gray-500 text-base md:text-lg">Your cart is empty</h2>
      ) : (
        <>
          <div className="mb-4 md:mb-6 border rounded-xl p-3 md:p-4 shadow">
            <h2 className="text-lg md:text-xl font-semibold mb-2 md:mb-3">Order Summary</h2>
            {cart.map((item) => (
              <div key={item.id} className="flex justify-between py-1 text-sm md:text-base">
                <span>{item.name} x {item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
            <div className="flex justify-between font-bold text-base md:text-lg mt-2 md:mt-3 border-t pt-2 md:pt-3">
              <span>Total</span>
              <span className="text-green-600">₹{total}</span>
            </div>
          </div>

          <div className="mb-4 md:mb-6">
            <label className="font-semibold block mb-2 text-sm md:text-base">Delivery Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full delivery address"
              className="w-full border rounded-xl p-3 outline-none text-sm md:text-base"
              rows={3}
            />
          </div>

          <div className="mb-4 md:mb-6">
            <label className="font-semibold block mb-2 text-sm md:text-base">Payment Method</label>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setPaymentMethod("COD")}
                className={`px-4 py-2 rounded-xl border text-sm md:text-base ${
                  paymentMethod === "COD" ? "bg-green-600 text-white" : "bg-gray-100"
                }`}
              >
                Cash on Delivery
              </button>
              <button
                onClick={() => setPaymentMethod("Online")}
                className={`px-4 py-2 rounded-xl border text-sm md:text-base ${
                  paymentMethod === "Online" ? "bg-green-600 text-white" : "bg-gray-100"
                }`}
              >
                Online Payment
              </button>
            </div>
          </div>

          <button
            onClick={handlePlaceOrder}
            className="bg-green-600 text-white px-6 md:px-8 py-3 rounded-xl text-base md:text-lg hover:bg-green-700 w-full"
          >
            Place Order — ₹{total}
          </button>
        </>
      )}
    </div>
  );
}

export default Checkout;