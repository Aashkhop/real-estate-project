# Real Estate Web App & Admin Panel

This is a full-stack real-estate application built with React, Node.js + Express, and SQLite as per the assignment requirements.

## Features
- **Frontend Panel**: Exact replica structure of the provided design using modern React components. Includes smooth css-animations and a premium, clean aesthetic.
- **Admin Panel**: Secure dashboard at `/admin` to modify text dynamically without any code changes.
- **Backend API**: REST API that connects the front-end rendering engines to an underlying SQLite database.

## 🚀 Running Locally

1. **Start the Backend:**
   ```bash
   cd backend
   npm install
   node initDB.js   # Generates SQLite DB
   node index.js    # Runs backend on port 5000
   ```

2. **Start the Frontend:**
   ```bash
   cd frontend
   npm install
   npm run dev      # Runs frontend on port 5173
   ```

## 🔒 Admin Credentials
- **URL**: `http://localhost:5173/admin`
- **Email**: `admin@gmail.com`
- **Password**: `1234`

## ☁️ Deployment Guide

Since the requirement states that the project must be publically accessible, here are the steps to deploy it:

### 1. Database Option for Production
SQLite is great for local, but most free hosting platforms (like Render or Vercel) have ephemeral file systems, meaning the SQLite `database.sqlite` might get deleted on restart. For best results on free tiers, it is recommended to connect a MongoDB or just use this SQLite setup on a VPS (like a Digital Ocean droplet) or Railway with a persistent volume. If you just want to submit the assignment and the reviewer tests it immediately, Render will work fine for short-term testing.

### 2. Deploying Backend to Render
1. Create a GitHub repository and push both folders to it.
2. Go to [Render](https://render.com/), create a **New Web Service**.
3. Connect your GitHub repository.
4. Set the **Root Directory** to `backend`.
5. Set Build Command: `npm install`
6. Set Start Command: `node index.js`
7. Click "Create Web Service". You'll get a URL like `https://your-backend.onrender.com`.

### 3. Deploying Frontend to Vercel
1. Update `API_URL` in `frontend/src/api.js` to match your deployed Render backend URL.
2. Go to [Vercel](https://vercel.com/) and create a **New Project**.
3. Import your GitHub repository.
4. Set the **Root Directory** to `frontend`.
5. Vercel will automatically detect Vite and run `npm run build`.
6. Click **Deploy**. This will yield your live frontend URL!
