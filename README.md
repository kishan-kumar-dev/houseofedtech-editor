
```md
# 📝 Documents Editor (Next.js + Prisma + Clerk)

A full-stack document editor built with **Next.js App Router**, **Prisma ORM**, and **Clerk Authentication**.  
It allows users to create, edit, rename, and manage documents in a Notion-like interface.

---

## 🚀 Features

- 🔐 Authentication (Clerk)
- 📄 Create / Read / Update documents
- ✏️ Rename documents from sidebar
- 🔍 Search documents
- 📱 Mobile responsive Notion-style sidebar
- 🧠 Command menu support
- ⚡ Fast API routes with Next.js App Router
- 🗂 Prisma database integration
- 🎨 Clean UI (custom, upgradeable to Tailwind/shadcn)

---

## 🛠 Tech Stack

- **Frontend:** Next.js 15 (App Router), React
- **Backend:** Next.js API Routes
- **Database:** Prisma ORM + PostgreSQL (Neon)
- **Auth:** Clerk
- **Styling:** Custom CSS (upgradeable)

---

## 📁 Project Structure

```

src/
├── app/
│   ├── documents/
│   │   ├── layout.tsx
│   │   ├── [id]/page.tsx
│   ├── api/
│   │   ├── documents/
│   │   ├── documents/[id]/
├── components/
│   ├── CommandMenu.tsx
├── lib/
│   ├── prisma.ts
prisma/
└── schema.prisma

````

---

## ⚙️ Setup Instructions

### 1️⃣ Clone the repo

```bash
git clone https://github.com/kishan-kumar-dev/houseofedtech-editor.git
cd houseofedtech-editor
````

---

### 2️⃣ Install dependencies

```bash
npm install
```

---

### 3️⃣ Setup environment variables

Create a `.env.local` file:

```env
DATABASE_URL="your-neon-postgres-url"
DIRECT_URL="your-neon-direct-url"

NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="your-clerk-key"
CLERK_SECRET_KEY="your-clerk-secret"

AUTH_SECRET="your-random-secret"
```

---

### 4️⃣ Setup Prisma

```bash
npx prisma generate
npx prisma migrate dev
```

---

### 5️⃣ Run development server

```bash
npm run dev
```

Open:

```
http://localhost:3000
```

---

## 📡 API Endpoints

### 📄 Documents

| Method | Endpoint       | Description       |
| ------ | -------------- | ----------------- |
| GET    | /api/documents | Get all documents |
| POST   | /api/documents | Create document   |

---

### 📄 Single Document

| Method | Endpoint            | Description     |
| ------ | ------------------- | --------------- |
| GET    | /api/documents/[id] | Get document    |
| PATCH  | /api/documents/[id] | Update document |
| DELETE | /api/documents/[id] | Delete document |

---

## 📱 Mobile Features

* Sidebar becomes slide-in drawer
* Overlay backdrop for focus mode
* Smooth transitions (Notion-like UX)

---

## 🧠 Future Improvements

* 🗑️ Delete document feature
* 🌙 Dark mode support
* 🎨 Tailwind + shadcn UI upgrade
* 📤 Export as PDF
* 🧾 Rich text editor (TipTap / Slate)
* 🔄 Real-time collaboration

---

## 🚀 Deployment

Deploy on Vercel:

```
npm run build
```

Then connect repository at:

👉 [https://vercel.com](https://vercel.com)

---

## 👨‍💻 Author

Built by **Kishan Kumar**

---

## 📜 License

This project is open-source and free to use.

```
