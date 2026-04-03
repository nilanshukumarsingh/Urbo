# 🏙️ Urban — Hyperlocal Service Marketplace

A full-stack web application that connects customers with nearby service professionals (plumbers, electricians, cleaners, etc.) in real time. Built with the **MERN stack**.

---

## ✨ Features

- **JWT Authentication** with role-based access control (User / Provider / Admin)
- **Smart Provider Matching** — geospatial queries find the nearest available provider automatically
- **Booking System** with real-time status tracking (`awaiting → scheduled → in progress → completed`)
- **Auto-Reassignment** — cron job retries up to 3 providers if one doesn't respond within 15 min
- **Review System** — bidirectional reviews between users and providers
- **Service Catalog** — admin-managed services grouped by category (with aggregation pipeline)
- **Address Management** — save multiple delivery addresses with geolocation
- **Google Maps Integration** — Places Autocomplete, city detection, map rendering
- **Dark / Light Mode** — persisted theme toggle
- **Responsive UI** — mobile-first design with Tailwind CSS

---

## 🛠️ Tech Stack

| Layer        | Technologies                                                          |
| ------------ | --------------------------------------------------------------------- |
| **Frontend** | React 19, Vite, Tailwind CSS 4, React Router 7, React Hook Form + Zod |
| **Backend**  | Node.js, Express 5, MongoDB, Mongoose 8                               |
| **Auth**     | JSON Web Tokens, bcryptjs                                             |
| **Maps**     | Google Maps JavaScript API, Places Autocomplete                       |
| **Jobs**     | node-cron (provider reassignment every 5 min)                         |
| **Other**    | date-fns, lucide-react, react-hot-toast                               |

---

## 📁 Project Structure

```
Urban/
├── backend/
│   ├── config/          # MongoDB connection
│   ├── controllers/     # Route handler logic (auth, booking, review, service, user)
│   ├── job/             # Cron job — auto provider reassignment
│   ├── middlewares/      # JWT auth + role-based access middleware
│   ├── models/          # Mongoose schemas (User, ProviderProfile, Service, Booking, Payment, Review)
│   ├── routes/          # Express route definitions
│   ├── utils/           # Helpers (token generation, error handler, provider finder)
│   └── server.js        # Entry point
│
├── frontend/
│   └── src/
│       ├── components/  # Reusable UI (layout, booking, dashboard, maps, cards)
│       ├── contexts/    # React Context (auth, booking, search, theme)
│       ├── pages/       # Route pages (Home, Services, Dashboard, Auth, Booking…)
│       └── utils/       # Frontend helpers
```

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Google Maps API key

### Backend

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
MONGODB_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/urban
JWT_SECRET=your_jwt_secret_key
JWT_EXPIRES_IN=7d
NODE_ENV=development
PORT=5000
```

```bash
npm run dev    # starts with nodemon on port 5000
```

### Frontend

```bash
cd frontend
npm install
npm run dev    # starts Vite dev server on port 5173
```

---

## 🔗 API Endpoints

| Prefix         | Module                             |
| -------------- | ---------------------------------- |
| `/api/auth`    | Register, Login, Get current user  |
| `/api/service` | CRUD services, grouped by category |
| `/api/booking` | Create / update / view bookings    |
| `/api/user`    | Profiles, passwords, addresses     |
| `/api/review`  | Create & fetch reviews             |

---

## 👥 Roles

| Role         | Capabilities                                                                 |
| ------------ | ---------------------------------------------------------------------------- |
| **User**     | Browse, book services, cancel, review, manage addresses                      |
| **Provider** | Accept/reject bookings, start & complete jobs, receive reviews               |
| **Admin**    | Manage service catalog, verify providers, view all bookings, override status |

---

## 📦 Key Dependencies

### Backend

| Package           | Purpose                       |
| ----------------- | ----------------------------- |
| express           | Web framework                 |
| mongoose          | MongoDB ODM                   |
| jsonwebtoken      | JWT creation & verification   |
| bcryptjs          | Password hashing              |
| node-cron         | Scheduled background jobs     |
| cors              | Cross-origin request handling |
| dotenv            | Environment variable loading  |
| pincode-validator | Indian pincode validation     |

### Frontend

| Package                 | Purpose                      |
| ----------------------- | ---------------------------- |
| react / react-dom       | UI framework                 |
| react-router-dom        | Client-side routing          |
| react-hook-form + zod   | Form management & validation |
| @react-google-maps/api  | Google Maps components       |
| use-places-autocomplete | Places Autocomplete hook     |
| tailwindcss             | Utility-first CSS            |
| lucide-react            | Icon library                 |
| react-hot-toast         | Toast notifications          |
| date-fns                | Date utilities               |

---

## 📄 License

MIT

---

## 👨‍💻 Author

**Nilanshu Kumar Singh**
