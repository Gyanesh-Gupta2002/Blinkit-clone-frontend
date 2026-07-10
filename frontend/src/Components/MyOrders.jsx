import { useEffect, useState } from "react";
import axios from "axios";

const statusSteps = ["Placed", "Packed", "Out for Delivery", "Delivered"];

function OrderProgress({ status }) {
  const currentIndex = statusSteps.indexOf(status);

  return (
    <div className="flex items-center justify-between mt-4 mb-2">
      {statusSteps.map((step, index) => (
        <div key={step} className="flex items-center flex-1 last:flex-none">
          <div className="flex flex-col items-center">
            <div
              className={`w-6 h-6 md:w-8 md:h-8 rounded-full flex items-center justify-center text-xs md:text-sm font-bold ${
                index <= currentIndex
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-400 dark:text-gray-500"
              }`}
            >
              {index <= currentIndex ? "✓" : index + 1}
            </div>
            <span
              className={`text-[10px] md:text-xs mt-1 text-center whitespace-nowrap ${
                index <= currentIndex
                  ? "text-green-600 font-semibold"
                  : "text-gray-400 dark:text-gray-500"
              }`}
            >
              {step}
            </span>
          </div>
          {index < statusSteps.length - 1 && (
            <div
              className={`flex-1 h-1 mx-1 md:mx-2 rounded ${
                index < currentIndex ? "bg-green-600" : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          )}
        </div>
      ))}
    </div>
  );
}

function MyOrders({ user }) {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.email) {
      setLoading(false);
      return;
    }

    axios
      .get(`https://blinkit-clone-frontend.onrender.com/orders/${user.email}`)
      .then((res) => {
        setOrders(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [user]);

  if (!user) {
    return (
      <div className="w-[90%] mx-auto mt-10 text-center">
        <h2 className="text-lg md:text-xl text-gray-600 dark:text-gray-300">
          Please login to view your orders
        </h2>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="w-[90%] mx-auto mt-10 text-center">
        <h2 className="text-lg md:text-xl text-gray-500 dark:text-gray-400">Loading your orders...</h2>
      </div>
    );
  }

  return (
    <div className="w-[95%] md:w-[90%] mx-auto mt-6 md:mt-10 mb-10 md:mb-16">
      <h1 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-gray-900 dark:text-white">📦 My Orders</h1>

      {orders.length === 0 ? (
        <h2 className="text-gray-500 dark:text-gray-400 text-base md:text-lg">
          You haven't placed any orders yet
        </h2>
      ) : (
        orders.map((order) => {
          const items = JSON.parse(order.items);
          return (
            <div
              key={order.id}
              className="border dark:border-gray-700 bg-white dark:bg-gray-800 rounded-xl md:rounded-2xl p-4 md:p-5 mb-4 shadow-md"
            >
              <div className="flex flex-wrap justify-between items-center gap-2 mb-3">
                <span className="font-semibold text-gray-700 dark:text-gray-300 text-sm md:text-base">
                  Order #{order.id}
                </span>
                <span className="bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full text-xs md:text-sm font-medium">
                  {order.status}
                </span>
              </div>

              <OrderProgress status={order.status} />

              <div className="mb-3 mt-4">
                {items.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-gray-600 dark:text-gray-300 py-1 text-sm md:text-base"
                  >
                    <span>{item.name} x {item.quantity}</span>
                    <span>₹{item.price * item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap justify-between gap-1 border-t dark:border-gray-700 pt-3">
                <span className="text-gray-500 dark:text-gray-400 text-xs md:text-sm">
                  {new Date(order.created_at).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </span>
                <span className="font-bold text-green-600 dark:text-green-400 text-sm md:text-base">
                  ₹{order.total_price}
                </span>
              </div>

              <div className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-2 break-words">
                📍 {order.address} &nbsp;|&nbsp; 💳 {order.payment_method}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
}

export default MyOrders;