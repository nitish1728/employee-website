# 👩‍💼 Employee Management Dashboard

A simple and clean **Employee Management Dashboard** built with **React** and **JSON Server**.  
This project demonstrates real-world CRUD operations using modern React patterns.

---

## ✨ Features

- ➕ Add new employees using a side panel
- ✏️ Edit employee details using the same form
- 🗑 Delete employees with confirmation
- 🔄 Toggle employee status (Active / Inactive)
- 🔍 Search employees by name
- 🎯 Filter employees by gender and status
- 🖼 Upload and preview employee images
- 🖨 Print individual employee details
- 💾 Persistent data using JSON Server
- 🚪 Logout support (mock authentication)

---

## 🛠 Tech Stack

### Frontend
- React (Functional Components & Hooks)
- TypeScript
- CSS (Custom styling)

### Backend (Mock)
- JSON Server (REST API simulation)

### Libraries
- SweetAlert2 (alerts and confirmations)

---

## 🚀 Getting Started

Follow these steps to run the project locally.

---

### ✅ Prerequisites

Make sure you have:
- Node.js (v16 or above)
- npm or yarn

---

### 📦 Installation

Clone the repository:

```bash
git clone <repository-url>
cd employee-management-dashboard
```

Install dependencies

```bash
npm install
```

Setup JSON Server

Open another terminal in your coding tool

Setup JSON Server using the below command

```bash
npx json-server --watch db.json --port 3000
```

API endpoint:
http://localhost:3000/Employee

Run the React App using the below command in the first terminal

```bash
npm run start
```
Open the exposed localhost in browser eg:- http://localhost:5173/


