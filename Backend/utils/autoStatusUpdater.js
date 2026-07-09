const cron = require("node-cron");
const flow = ["Placed", "Packed", "Out for Delivery", "Delivered"];
const INTERVAL_MINUTES = 2; // testing ke liye, baad me badal lena

const startAutoStatusUpdater = (db) => {
  cron.schedule("*/1 * * * *", () => {
    db.query(
      "SELECT id, status, updated_at FROM orders WHERE status != 'Delivered'",
      (err, orders) => {
        if (err) {
          console.error("Failed to fetch orders:", err);
          return;
        }

        orders.forEach((order) => {
          const currentIndex = flow.indexOf(order.status);
          if (currentIndex === -1 || currentIndex === flow.length - 1) return;

          const minutesSinceUpdate =
            (Date.now() - new Date(order.updated_at).getTime()) / 60000;

          if (minutesSinceUpdate >= INTERVAL_MINUTES) {
            const nextStatus = flow[currentIndex + 1];

            db.query(
              "UPDATE orders SET status = ?, updated_at = NOW() WHERE id = ?",
              [nextStatus, order.id],
              (err) => {
                if (err) console.error("Update failed:", err);
                else console.log(`Order #${order.id} -> ${nextStatus}`);
              }
            );
          }
        });
      }
    );
  });

  console.log("Auto status updater cron started ✅");
};

module.exports = startAutoStatusUpdater;