import fs from "fs";
import path from "path";

export default async function handler(req, res) {
  // Ensure JSON response content-type
  res.setHeader("Content-Type", "application/json");

  let kvUrl = process.env.KV_REST_API_URL;
  let kvToken = process.env.KV_REST_API_TOKEN;

  // Fallback for REDIS_URL (which commonly contains host/password for Upstash REST API)
  if ((!kvUrl || !kvToken) && process.env.REDIS_URL) {
    try {
      const match = process.env.REDIS_URL.match(/rediss?:\/\/([^:]+):([^@]+)@([^:/]+)/);
      if (match) {
        const password = match[2];
        const host = match[3];
        kvUrl = `https://${host}`;
        kvToken = password;
      }
    } catch (e) {
      console.error("Failed to parse REDIS_URL:", e);
    }
  }

  // Local fallback reader helper
  const readLocalFallback = () => {
    try {
      const fallbackPath = path.resolve(process.cwd(), "src/data/portfolioData.json");
      if (fs.existsSync(fallbackPath)) {
        return JSON.parse(fs.readFileSync(fallbackPath, "utf-8"));
      }
    } catch (e) {
      console.error("Failed to read local fallback file:", e);
    }
    return null;
  };

  // GET request - Fetch portfolio data
  if (req.method === "GET") {
    // If KV database credentials are not available, return local fallback file immediately
    if (!kvUrl || !kvToken) {
      const localData = readLocalFallback();
      if (localData) {
        return res.status(200).json(localData);
      }
      return res.status(444).json({ error: "No storage backend available" });
    }

    try {
      const kvRes = await fetch(`${kvUrl}/get/portfolio_data`, {
        headers: {
          Authorization: `Bearer ${kvToken}`
        }
      });

      if (!kvRes.ok) {
        throw new Error(`KV API responded with status ${kvRes.status}`);
      }

      const body = await kvRes.json();
      
      // If key exists, parse it, otherwise fall back to local JSON file
      if (body && body.result) {
        return res.status(200).json(JSON.parse(body.result));
      } else {
        const localData = readLocalFallback();
        if (localData) {
          return res.status(200).json(localData);
        }
        return res.status(404).json({ error: "No data found" });
      }
    } catch (err) {
      console.error("Vercel KV Load failed, falling back to disk:", err);
      const localData = readLocalFallback();
      if (localData) {
        return res.status(200).json(localData);
      }
      return res.status(500).json({ error: err.message });
    }
  }

  // POST request - Save portfolio data
  if (req.method === "POST") {
    try {
      const { passcode, data } = req.body;

      // Log payload size for debugging
      const payloadSize = JSON.stringify(req.body || {}).length;
      console.log(`POST /api/portfolio - Payload size: ${(payloadSize / 1024).toFixed(2)} KB`);

      // Validate passcode (defaults to admin123 if environment variable not set)
      const adminPasscode = process.env.ADMIN_PASSCODE || "admin123";
      if (passcode !== adminPasscode) {
        return res.status(401).json({ error: "Unauthorized passcode" });
      }

      if (!data) {
        return res.status(400).json({ error: "Missing data payload" });
      }

      // If KV database credentials are not available (e.g. running locally without Vercel CLI link),
      // we cannot save online. Local dev is handled separately by the Vite dev server plugin.
      if (!kvUrl || !kvToken) {
        return res.status(400).json({ error: "KV Database credentials not found in environment" });
      }

      const kvRes = await fetch(`${kvUrl}/set/portfolio_data`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${kvToken}`
        },
        body: JSON.stringify(data)
      });

      if (!kvRes.ok) {
        throw new Error(`KV API write responded with status ${kvRes.status}`);
      }

      return res.status(200).json({ success: true, message: "Saved to Vercel KV successfully!" });
    } catch (err) {
      console.error("Vercel KV Save failed:", err);
      let errorMessage = err.message;
      if (errorMessage === "fetch failed") {
        errorMessage = "Database connection failed or timed out. This often happens if the payload (images) is too large for the KV store limit (1MB).";
      }
      return res.status(500).json({ error: errorMessage });
    }
  }

  // Handle other request methods
  res.setHeader("Allow", ["GET", "POST"]);
  return res.status(405).json({ error: `Method ${req.method} not allowed` });
}
