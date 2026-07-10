# QuickKart — Full Stack Grocery Delivery App

A Blinkit-inspired full-stack grocery delivery application with customer app, admin panel, and backend API.

## 🔗 Live Links

- 🛒 **Customer App:** https://blinkit-clone-frontend-ochre.vercel.app
- 🛠️ **Admin Panel:** https://quickkart-adminpanel.vercel.app
- ⚙️ **Backend API:** https://blinkit-clone-frontend.onrender.com
- 🗄️ **Database:** mysql-14077d76-quickkart.b.aivencloud.com

## 🛠️ Tech Stack

- **Frontend:** React, Vite
- **Backend:** Node.js, Express
- **Database:** MySQL (hosted on Aiven)
- **Deployment:** Vercel (Frontend & Admin Panel), Render (Backend)

## ✨ Features

- User signup/login
- Product browsing and cart management
- Order placement with Razorpay payment integration
- Order status tracking (Placed → Packed → Out for Delivery → Delivered)
- Admin panel for product management
- Dark/Light Mode

## 📦 Note

Backend is hosted on Render's free tier, if the it is not in use till 15 mins it goes on sleep mode — the first request after inactivity may take 30-50 seconds to respond while the server wakes up.
