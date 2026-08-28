import express from "express";
import path from "path";
import cors from "cors";
import { createServer as createViteServer } from "vite";
import fs from "fs";

// Mock Database for MVP
const db = {
  adminPass: "voltronai",
  adminSettings: {
    appName: "NaijaMind AI",
    tagline: "Ask Nigeria anything.",
  },
  creator: {
    name: "AI Studio Demo User",
    bio: "Created NaijaMind AI as a demonstration of responsive web application design, combining AI capabilities with Nigerian contextual knowledge.",
    email: "contact@naijamind.ai",
    website: "https://naijamind.ai"
  },
  stats: {
    users: 1420,
    active: 350,
    queries: 8942
  }
};

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(cors());
  app.use(express.json());

  // API Routes
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok" });
  });

  // Admin Auth (MVP Mock)
  app.post("/api/admin/login", (req, res) => {
    const { password } = req.body;
    if (password === db.adminPass) {
      // In production this would be a secure HTTP-only cookie with JWT
      res.json({ success: true, token: "mock-secure-admin-token-123" });
    } else {
      res.status(401).json({ success: false, error: "Invalid credentials" });
    }
  });

  // Admin Dashboard Data
  app.get("/api/admin/dashboard", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader !== "Bearer mock-secure-admin-token-123") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    res.json({
      stats: db.stats,
      settings: db.adminSettings,
      creator: db.creator
    });
  });

  app.put("/api/admin/creator", (req, res) => {
    const authHeader = req.headers.authorization;
    if (authHeader !== "Bearer mock-secure-admin-token-123") {
      return res.status(403).json({ error: "Unauthorized" });
    }
    db.creator = { ...db.creator, ...req.body };
    res.json({ success: true, creator: db.creator });
  });

  // Public Routes
  app.get("/api/creator", (req, res) => {
    res.json(db.creator);
  });

  app.post("/api/chat", (req, res) => {
    // Basic mock response for MVP
    const { message } = req.body;
    
    // Simulate slight delay
    setTimeout(() => {
      let reply = "I am NaijaMind AI. I understand Nigerian context. How can I help you further?";
      
      if (message.toLowerCase().includes("where") || message.toLowerCase().includes("location")) {
        reply = "Looking for locations? The 'Nearby' feature can help you find verified hospitals, mechanics, and services near you in Nigeria.";
      } else if (message.toLowerCase().includes("verify") || message.toLowerCase().includes("true")) {
        reply = "You can use the 'Verify This' feature to check news, prices, and claims against reliable Nigerian sources.";
      } else if (message.toLowerCase().includes("transport") || message.toLowerCase().includes("go from")) {
        reply = "I can help with transport! (Demo Data): From Ikeja to Yaba by Danfo is roughly ₦400 - ₦600 depending on traffic and time of day.";
      }
      
      res.json({
        role: "ai",
        content: reply,
        sources: message.toLowerCase().includes("transport") ? ["Lagos Transport Estimates (Demo)"] : [],
        timestamp: new Date().toISOString()
      });
    }, 1000);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
