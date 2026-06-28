# MEE FARMS Deployment Plan

This document outlines the step-by-step process for deploying the MEE FARMS application. The backend will be hosted on **Render**, and the frontend on **Netlify**. 

Using Render for your Node.js/Express backend is the ideal choice because it natively supports persistent disks, allowing your existing `multer` image upload logic to work perfectly without requiring a rewrite to a cloud storage provider (like AWS S3).

---

## 1. Backend Deployment (Render)

Render runs your Express server exactly as it runs on your local machine.

### Step 1.1: Deploy to Render
1. Go to [Render](https://render.com/) and sign up or log in.
2. Click **New +** and select **Web Service**.
3. Connect your GitHub repository containing the MEE FARMS code.
4. Fill in the following configuration details:
   - **Name**: `meefarms-api` (or your preferred name)
   - **Region**: Choose the region closest to your users.
   - **Root Directory**: `server`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Select your Instance Type (Free is okay for starting, but remember it spins down after 15 minutes of inactivity).

### Step 1.2: Add Environment Variables
Scroll down to the **Environment Variables** section and add everything from your `server/.env.example` file:
   - `MONGODB_URI` *(Ensure your MongoDB cluster network access allows IPs `0.0.0.0/0`)*
   - `JWT_SECRET`
   - `RESEND_API_KEY`
   - *(Any other required keys)*

mongodb+srv://MeeFarms:uUKZcuuNiyzfrI7X@cluster0.ujjdxvq.mongodb.net/?appName=Cluster0

### Step 1.3: Add a Persistent Disk (Crucial for Image Uploads)
Since your app uses `multer` to save uploaded product images locally:
1. Scroll down to the **Advanced** section in your Render Web Service settings.
2. Click **Add Disk**.
3. Set the **Name** to `uploads` (or whatever you like).
4. Set the **Mount Path** to `/opt/render/project/src/uploads` (or just `uploads` depending on how your Express app resolves paths, but `/opt/render/project/src/uploads` is the safest absolute path if your code uses `path.join(__dirname, '../uploads')`). *Note: The Free tier does not support persistent disks. You will need the Starter tier ($7/mo) and a Disk ($1/mo) to prevent images from being deleted when the server restarts.*
5. Click **Create Web Service**. 

Note the production URL once it finishes building (e.g., `https://meefarms-api.onrender.com`).

---

## 2. Frontend Deployment (Netlify)

Your Vite React frontend uses a proxy in `vite.config.ts` (`/api` -> `localhost:3001`). In production, we need to instruct Netlify to proxy these requests to your new Render backend.

### Step 2.1: Configure Netlify Redirects & Proxying
Instead of hardcoding the backend URL in your frontend code, you can use Netlify's `_redirects` file. This handles both the React SPA routing and proxies the API calls to Render to avoid CORS issues.

Inside `main/public/`, create a file named `_redirects` (no file extension) and add the following:

```text
# Proxy API requests to Render Backend
/api/*  https://<YOUR-RENDER-URL>.onrender.com/api/:splat  200

# Proxy uploads to Render Backend
/uploads/*  https://<YOUR-RENDER-URL>.onrender.com/uploads/:splat  200

# React Router SPA Fallback
/*  /index.html  200
```
> [!IMPORTANT]
> Replace `<YOUR-RENDER-URL>` with the actual domain Render provides you from Step 1.

### Step 2.2: Deploy to Netlify
1. Go to [Netlify](https://app.netlify.com/) and click **Add new site** > **Import an existing project**.
2. Connect your GitHub repository.
3. In the configuration step, set:
   - **Base directory**: `main`
   - **Build command**: `npm run build`
   - **Publish directory**: `main/dist` (or just `dist` depending on how Netlify resolves the base dir)
4. Click **Deploy Site**.

### Step 2.3: Verification
Once Netlify finishes building:
1. Visit your Netlify URL.
2. The site should load successfully (SPA routing works because of `/* /index.html 200`).
3. Log in and test adding a product with an image.
4. Check the network tab to ensure `/api/...` and `/uploads/...` requests are returning a `200 OK` status and are successfully proxied to the Render backend.
