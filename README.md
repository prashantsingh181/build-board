# 🧱 Build Board

**Build Board** is a community platform where developers can **share what they’re building**.  
Built with **Next.js**, **Tailwind CSS**, **MongoDB**, and **shadcn/ui**, it lets you log in with **GitHub (via NextAuth.js)** and post your latest projects and ideas.

🔗 **Live Project:** [https://build-board-seven.vercel.app/](https://build-board-seven.vercel.app/)

<img width="1440" height="818" alt="Screenshot 2025-10-24 at 10 41 36 AM" src="https://github.com/user-attachments/assets/b648b45c-a178-49a1-bb97-566b9ee94e5c" />

---

## 🚀 Features

- 🔐 **GitHub Login** using [NextAuth.js](https://next-auth.js.org/)
- 🧑‍💻 **Share your builds** with title, description, and project details
- 💬 **View others’ builds** for inspiration
- 🧾 **User page** to manage your posts
- 🎨 **Beautiful and responsive UI** built with [shadcn/ui](https://ui.shadcn.com/)
- ⚡ **Fast rendering** using Next.js App Router
- 🗃️ **MongoDB integration** for storing users and builds
- 🌙 **Tailwind CSS** for styling consistency and dark mode support
- 🩵 **Error monitoring** with [Sentry](https://sentry.io/)

---

## 🧰 Tech Stack

| Category | Technology |
|-----------|-------------|
| **Framework** | [Next.js 15 (App Router)](https://nextjs.org/) |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/) |
| **Database** | [MongoDB](https://www.mongodb.com/) |
| **Authentication** | [NextAuth.js](https://next-auth.js.org/) (GitHub Provider) |
| **Monitoring** | [Sentry](https://sentry.io/) |
| **Deployment** | [Vercel](https://vercel.com/) |

---

## ⚙️ Setup Instructions

### 1. Clone the Repository
```bash
git clone https://github.com/prashantsingh181/build-board.git
cd build-board
````

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env.local` file in the project root and add:

```env
# MongoDB
MONGODB_URI=your_mongodb_connection_string

# GitHub OAuth
AUTH_GITHUB_ID=your_github_client_id
AUTH_GITHUB_SECRET=your_github_client_secret
AUTH_SECRET=your_random_secret_key

# Sentry
SENTRY_AUTH_TOKEN=your_sentry_token
```

> 💡 Generate a random `AUTH_SECRET` using:
>
> ```bash
> openssl rand -base64 32
> ```

---

### 4. Run the Development Server

```bash
npm run dev
# or
yarn dev
```

Then visit 👉 **[http://localhost:3000](http://localhost:3000)**

---

## 🗄️ Folder Structure

```
build-board/
├── app/                # Next.js App Router (routes, layout, pages)
│   ├── api/            # API routes (auth, builds)
│   ├── (root)/         # Pages
│   └── page.tsx        # Home page
├── components/         # UI components (shadcn/ui + custom)
├── lib/                # Utilities (db, auth, helpers)
├── public/             # Static assets
└── tailwind.config.js  # Tailwind configuration
```

---

## 🧑‍💻 How It Works

1. **Login with GitHub** via NextAuth.js
2. **Create a Build Post** — share your project details and ideas
3. **Browse the Feed** — explore what other developers are building
4. **Manage Your Posts** — edit or delete from your personal dashboard
5. **Monitor app performance & errors** with Sentry integration

---

## 🖼️ UI Components

Build Board uses [**shadcn/ui**](https://ui.shadcn.com/) for a cohesive and modern design system.
It includes components like:

* 🪶 Buttons
* 💬 Cards
* 📦 Modals
* 🧭 Navigation menus

---

## 📦 Deployment

Deploy easily to **Vercel**:

```bash
vercel
```

Then configure your environment variables in **Vercel Dashboard → Project Settings → Environment Variables**.


Would you like me to make a version with **badges** at the top (for Next.js, Tailwind, MongoDB, Vercel, Sentry, etc.) to make it look like a polished open-source project README?
