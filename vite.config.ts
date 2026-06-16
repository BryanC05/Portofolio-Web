import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";
import fs from "fs";

// Custom plugin to save portfolio data locally in development
const localSavePlugin = () => ({
  name: "local-save-plugin",
  configureServer(server: any) {
    server.middlewares.use((req: any, res: any, next: any) => {
      if (req.url === "/api/portfolio" && req.method === "POST") {
        let body = "";
        req.on("data", (chunk: any) => {
          body += chunk;
        });
        req.on("end", () => {
          try {
            // Validate the JSON format
            const parsed = JSON.parse(body);
            
            // Check passcode if local ADMIN_PASSCODE env exists
            const localPasscode = process.env.ADMIN_PASSCODE;
            if (localPasscode && parsed.passcode !== localPasscode) {
              res.statusCode = 401;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ success: false, error: "Unauthorized passcode" }));
              return;
            }

            const dataPath = path.resolve(__dirname, "./src/data/portfolioData.json");
            fs.writeFileSync(dataPath, JSON.stringify(parsed.data, null, 2), "utf-8");
            
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: true, message: "Saved to local disk successfully!" }));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, error: err.message }));
          }
        });
      } else {
        next();
      }
    });
  },
});

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [
    react(), 
    localSavePlugin(),
    mode === "development" && componentTagger()
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));

