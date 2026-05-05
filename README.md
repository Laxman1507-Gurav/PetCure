# 🐾 PetCure — Animal Healthcare & Rescue Platform

A full-stack MERN application providing end-to-end animal healthcare services — from finding doctors to emergency rescue, medicines, and a blog community.

---

## 🏗️ Tech Stack

| Layer     | Technology                                          |
|-----------|-----------------------------------------------------|
| Frontend  | React (Vite), Tailwind CSS v4, Framer Motion, Leaflet |
| Backend   | Node.js, Express.js, MongoDB (Mongoose), JWT, Multer |
| Auth      | bcryptjs + JSON Web Tokens (7-day expiry)           |
| Maps      | React-Leaflet + OpenStreetMap                       |
| Toasts    | react-hot-toast                                     |

---

## 📁 Project Structure

```
PetCure/
├── backend/
│   ├── config/db.js
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── blogController.js
│   │   ├── bookingController.js
│   │   └── contactController.js
│   ├── middleware/
│   │   ├── authMiddleware.js    ← JWT protect + adminOnly
│   │   └── uploadMiddleware.js  ← Multer disk storage
│   ├── models/
│   │   ├── User.js
│   │   ├── Blog.js
│   │   ├── Booking.js
│   │   └── Contact.js
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── blogRoutes.js
│   │   ├── bookingRoutes.js
│   │   └── contactRoutes.js
│   ├── uploads/                ← Auto-created on start
│   ├── server.js
│   └── .env                    ← Configure this!
│
└── frontend/
    └── src/
        ├── api/axios.js         ← Axios + JWT interceptor
        ├── context/
        │   ├── AuthContext.jsx
        │   └── ThemeContext.jsx
        ├── components/
        │   ├── Navbar.jsx
        │   ├── Footer.jsx
        │   ├── BlogCard.jsx
        │   ├── MapView.jsx
        │   └── LoadingSkeleton.jsx
        ├── pages/
        │   ├── Home.jsx
        │   ├── Index.jsx
        │   ├── Blog.jsx
        │   ├── BlogDetail.jsx
        │   ├── CreateBlog.jsx
        │   ├── Login.jsx
        │   ├── Register.jsx
        │   ├── Dashboard.jsx
        │   ├── FindDoctor.jsx
        │   ├── Medicines.jsx
        │   └── Contact.jsx
        ├── App.jsx
        └── main.jsx
```

---

## ⚙️ Environment Variables

### `backend/.env`

```env
PORT=5000
MONGO_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/petcure?retryWrites=true&w=majority
JWT_SECRET=petcure_super_secret_jwt_key_2024
CLIENT_URL=http://localhost:5173
```

> ⚠️ Replace `<username>` and `<password>` with your **MongoDB Atlas** credentials.
> You can get a free cluster at https://cloud.mongodb.com

---

## 🚀 Setup & Run Instructions

### Step 1 — Configure MongoDB

1. Go to [MongoDB Atlas](https://cloud.mongodb.com) → Create a free cluster
2. Create a database user with read/write access
3. Whitelist your IP (or use `0.0.0.0/0` for development)
4. Copy the connection string into `backend/.env`

---

### Step 2 — Start the Backend

```bash
cd backend
npm install        # Already done if you followed setup
npm run dev        # Starts on http://localhost:5000
```

Expected output:
```
✅ MongoDB Connected: cluster0.mongodb.net
🚀 Server running on port 5000
```

---

### Step 3 — Start the Frontend

Open a **second terminal**:

```bash
cd frontend
npm run dev        # Starts on http://localhost:5173
```

Visit: **http://localhost:5173**

---

## 🔗 API Endpoints

| Method | Route                  | Description              | Auth Required |
|--------|------------------------|--------------------------|---------------|
| POST   | /api/auth/register     | Register new user        | ❌            |
| POST   | /api/auth/login        | Login + receive JWT      | ❌            |
| GET    | /api/auth/me           | Get current user         | ✅            |
| GET    | /api/blogs             | List all blogs           | ❌            |
| GET    | /api/blogs/:id         | Get single blog          | ❌            |
| POST   | /api/blogs             | Create blog (+ image)    | ✅            |
| PUT    | /api/blogs/:id         | Update blog              | ✅ (owner)   |
| DELETE | /api/blogs/:id         | Delete blog              | ✅ (owner)   |
| POST   | /api/bookings          | Create appointment       | ✅            |
| GET    | /api/bookings/my       | My bookings              | ✅            |
| GET    | /api/bookings          | All bookings (admin)     | ✅ Admin      |
| POST   | /api/contact           | Submit contact message   | ❌            |
| GET    | /api/contact           | All messages (admin)     | ✅ Admin      |

---

## 📄 Pages Overview

| Route          | Page             | Auth  | Description                             |
|----------------|------------------|-------|-----------------------------------------|
| `/`            | Home             | Open  | Landing with hero, features, testimonials |
| `/index`       | Services         | Open  | Service cards overview                  |
| `/blog`        | Blog List        | Open  | View all community blog posts           |
| `/blog/:id`    | Blog Detail      | Open  | Read single blog post                   |
| `/blog/create` | Create Blog      | ✅    | Write + upload image for new post       |
| `/login`       | Login            | Open  | JWT login form                          |
| `/register`    | Register         | Open  | Sign up form                            |
| `/dashboard`   | Dashboard        | ✅    | Book appointments + map + history       |
| `/find-doctor` | Find Doctor      | Open  | Leaflet map with vet clinic markers     |
| `/medicines`   | Medicines        | Open  | Browse + search medicines, add to cart  |
| `/contact`     | Contact          | Open  | Contact form saved to DB                |

---

## 🚀 Deployment

### Frontend → Vercel

```bash
cd frontend
npm run build
# Push to GitHub, connect repo to Vercel
# Set build command: npm run build
# Set output directory: dist
```

### Backend → Render

1. Push `/backend` to GitHub
2. Create a new **Web Service** on [Render](https://render.com)
3. Set:
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
4. Add all Environment Variables from `.env`
5. Set `CLIENT_URL` to your Vercel frontend URL

### Database → MongoDB Atlas

Already configured via `MONGO_URI` in `.env`

---

## ✨ Features

- 🌙 **Dark/Light Mode** — Persisted in localStorage
- 🔐 **JWT Authentication** — 7-day tokens, auto-attached via Axios interceptor
- 📝 **Blog CRUD** — Create posts with image upload (Multer), public read
- 📅 **Appointment Booking** — With clinic selection via interactive Leaflet map
- 💊 **Medicines** — Category filter + search + cart
- 📞 **Contact Form** — Saved to MongoDB
- 🗺️ **Maps** — Detect user location, show nearby clinics
- 🔔 **Toast Notifications** — Success/error for all actions
- 💀 **Loading Skeletons** — For async content
- 📱 **Fully Responsive** — Mobile hamburger menu, responsive grids
- 🎬 **Page Transitions** — Framer Motion AnimatePresence
- 🃏 **Glassmorphism UI** — Premium dark-themed interface
