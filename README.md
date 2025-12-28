# 🧩 Trello App (Clone)

A Trello-like task management application with drag & drop functionality, built using modern front-end technologies.

---

## 🚀 Tech Stack

This project is built with the following tools and libraries:

* **Next.js 16** – React framework with SSR support and App Router
* **React 19** – UI library
* **TypeScript** – Type-safe development
* **Tailwind CSS 4** – Utility-first modern styling
* **Sass (SCSS)** – Better style organization for complex UI parts
* **@dnd-kit** – Drag & Drop implementation for columns and cards
* **ESLint** – Code quality and linting

---

## 📦 Dependencies

### Runtime Dependencies

* `next`
* `react`
* `react-dom`
* `@dnd-kit/core`
* `@dnd-kit/sortable`
* `@dnd-kit/utilities`

### Dev Dependencies

* `typescript`
* `tailwindcss`
* `sass`
* `eslint`
* `eslint-config-next`
* `@types/react`
* `@types/react-dom`
* `@types/node`

---

## ⚙️ Scripts

Available project scripts:

```bash
npm run dev      # Run development server
npm run build    # Build for production
npm run start    # Start production server
npm run lint     # Run ESLint
```

---

## 🗂️ Features

* Create boards / columns
* Create task cards
* Drag & Drop cards between columns
* Sort cards using Drag & Drop
* Responsive UI
* Clean and scalable component structure

---

## 📁 Project Structure (Simplified)

```text
src/
 ├─ app/
 │   ├─ page.tsx
 │   └─ layout.tsx
 ├─ components/
 │   ├─ Board/
 │   ├─ Column/
 │   └─ Card/
 ├─ styles/
 └─ types/
```

---

## 🧠 Notes

* This is a **client-side only** project (no backend).
* Data can be managed using local state or `localStorage`.
* Suitable for practicing Drag & Drop, component architecture, and modern Next.js.

---

## 🛠️ Installation

```bash
git clone <repo-url>
cd trello-app
npm install
npm run dev
```

The app will be available at:

```
http://localhost:3000
```

---

## 📄 License

This project is intended for educational and personal use.

---

If you want to add sections like **Roadmap**, **Screenshots**, or **State Management** (e.g. Zustand), let me know and I’ll extend the README for you.
