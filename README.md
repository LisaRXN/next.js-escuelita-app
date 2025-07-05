# 🌱 Volunteer Management App

A modern web application to organize and manage volunteer sessions, streamline sign-ups, and track participation.  
Built to simplify coordination while providing a smooth experience for both admins and volunteers.

---

## 🚀 Key Features

### 👥 User Management
- Authentication powered by [Clerk](https://clerk.dev)
- User roles: **admin** / **volunteer**
- Dedicated admin interface for coordinators

### 🗓 Volunteer Sessions
- Session creation and display
- One-click volunteer registration
- Capacity control
- Attendance tracking

### 🛠 Admin Tools
- View registered volunteers per session
- Update attendance status in real time
- Cancel registrations if needed
- Instant UI feedback (toast notifications)

### 📦 Tech Stack
- **Next.js 14 (App Router)**
- **Clerk** for authentication
- **Prisma** + **PostgreSQL** (via PlanetScale or Railway)
- **TanStack Query (React Query)** for data caching
- **Tailwind CSS** for responsive design
- **React Hot Toast** for user feedback
- **FullCalendar** integration (optional)

---

## 📁 Project Structure
/app
  /admin                  → Admin-specific pages (protected layout)
/api/sessions             → API routes for session logic
/components               → Shared UI components
/lib                      → Helpers (e.g. Prisma client, fetcher)
/services                 → Business logic (e.g. status helpers)
/styles                   → Tailwind config & base styles

/prisma
  schema.prisma           → Prisma models

/public
  assets, icons, etc.

---

## 🙋‍♀️ About the Project

This project was built by Lisa Eriksen as part of an initiative to help coordinate more effectively the educational and community volunteer work of the NGO La Escuelita. The platform is designed to empower small teams to simplify registration, reduce no-shows, and make participation easy and motivating for everyone involved.

---

## 🛠 Local Setup

```bash
git clone https://github.com/your-username/volunteer-app.git
cd volunteer-app
pnpm install
pnpm dev
