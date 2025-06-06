# ♻️ WeWantWaste

A minimalist React + Vite application built to demonstrate clean UI, modern tooling, and thoughtful architecture — designed with developer experience and scalability in mind.

> **Live Demo:** [https://rem-waste-blond.vercel.app/](https://rem-waste-blond.vercel.app/)

![Desktop view](/public/desktop.png)

---

## 📌 Project Overview

This project showcases how to set up and organize a scalable frontend project using `Vite, React 19, Tailwind CSS, and ESLint` with sensible defaults.

It also includes **Progressive Web App (PWA)** support via `vite-plugin-pwa` so that users can install the web app on their desktop or mobile devices.

---

## 🚀 Tech Stack

| Tool                                                 | Purpose                                          |
| ---------------------------------------------------- | ------------------------------------------------ |
| [React 19](https://react.dev/)                       | UI library                                       |
| [Vite](https://vitejs.dev/)                          | Frontend build tool with fast HMR                |
| [Tailwind CSS 4](https://tailwindcss.com/)           | Utility-first styling framework                  |
| [Lucide React](https://lucide.dev/)                  | Icon system                                      |
| [clsx](https://github.com/lukeed/clsx)               | Conditional className utility                    |
| [ESLint](https://eslint.org/)                        | Linting and code quality enforcement             |
| [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) | PWA support with service worker, offline caching |

---

## 📁 Project Structure

```
wewantwaste/
├── public/                     # Static assets
├── src/
│   ├── assets/                 # Images or other static files
│   ├── components/             # Reusable UI components
│   │   ├── skeletons/          # Loading placeholders or shimmer UIs
│   │   ├── Button.jsx          # Reusable button component
│   │   ├── ProgressTab.jsx     # Step indicator or tab UI
│   │   └── SkipCard.jsx        # Card component for skip details
│   ├── screens/                # Main screens (views/pages)
│   │   ├── ChooseDate.jsx
│   │   ├── Payment.jsx
│   │   ├── PermitCheck.jsx
│   │   ├── Postcode.jsx
│   │   ├── SelectSkip.jsx
│   │   └── WasteType.jsx
│   ├── App.css
│   ├── App.jsx                 # Root app component
│   ├── index.css               # Tailwind / global styles
│   ├── main.jsx                # App entry point
│   └── spaghetti.js            # Utility or test file
├── .gitignore
├── eslint.config.js
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js


```

## 🧑‍💻 Getting Started

Clone and run the project locally:

```bash
git clone https://github.com/NegasiHaile/wewantwaste.git
cd wewantwaste
npm install
npm run dev
```

## 📦 Available Scripts

| Script            | Description                         |
| ----------------- | ----------------------------------- |
| `npm run dev`     | Starts the local development server |
| `npm run build`   | Builds the app for production       |
| `npm run preview` | Previews the production build       |
| `npm run lint`    | Lints the project using ESLint      |

---

## ✅ Linting & Code Quality

ESLint is configured using:

- [`@eslint/js`](https://www.npmjs.com/package/@eslint/js) for base JavaScript linting
- [`eslint-plugin-react-hooks`](https://www.npmjs.com/package/eslint-plugin-react-hooks) for enforcing rules of React hooks
- [`eslint-plugin-react-refresh`](https://www.npmjs.com/package/eslint-plugin-react-refresh) for HMR-related best practices

To run the linter:

```bash
npm run lint

```

## 🎯 What to Look For (Code Review Guide)

**When reviewing this project, please pay attention to:**

### ✅ Code Quality

- Clean, readable, and modular components

- Consistent and idiomatic React patterns (including hooks)

- Use of clsx for conditional styling

### 🎨 UI/UX

- Minimal, responsive, and clean interface using Tailwind

- Semantic HTML and accessible components

### 📱 PWA (Progressive Web App)

- Manifest file is correctly defined with `name`, `short_name`, icons, and theme color.
- `vite-plugin-pwa` is used to register a service worker with `autoUpdate` mode.
- App is installable on supported mobile and desktop browsers.
- Uses `standalone` display mode and proper icons (`192x192`, `512x512`).

### ⚙️ Architecture

- File and folder structure is scalable

- Logic separated from presentation where applicable

### 🛠️ Tooling

- Efficient development setup with Vite

- ESLint and plugins properly configured for React 19

- Tailwind CSS integrated with PostCSS via Vite
