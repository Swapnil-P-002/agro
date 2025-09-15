// server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files (HTML, CSS, JS, images in root)
app.use(express.static(__dirname));
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // uploaded images

// Routes for HTML pages
app.get("/", (_req, res) => res.sendFile(path.join(__dirname, "login.html")));
app.get("/dashboard", (_req, res) => res.sendFile(path.join(__dirname, "dashboard.html")));
app.get("/admin", (_req, res) => res.sendFile(path.join(__dirname, "admin.html")));
app.get("/base", (_req, res) => res.sendFile(path.join(__dirname, "base.html"))); // new 4th page

// 404 fallback (wrong routes)
app.use((_req, res) => {
  res.status(404).send("<h1>404 - Page Not Found</h1>");
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
