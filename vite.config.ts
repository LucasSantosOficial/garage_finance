import { jsxLocPlugin } from "@builder.io/vite-plugin-jsx-loc";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import fs from "node:fs";
import path from "node:path";
import { defineConfig, type Plugin, type ViteDevServer } from "vite";
import { vitePluginManusRuntime } from "vite-plugin-manus-runtime";

/* =============================================================================
   Manus Debug Collector - Vite Plugin
============================================================================= */

const PROJECT_ROOT = import.meta.dirname;
const LOG_DIR = path.join(PROJECT_ROOT, ".manus-logs");
const MAX_LOG_SIZE_BYTES = 1 * 1024 * 1024;
const TRIM_TARGET_BYTES = Math.floor(MAX_LOG_SIZE_BYTES * 0.6);

type LogSource = "browserConsole" | "networkRequests" | "sessionReplay";

function ensureLogDir() {
  if (!fs.existsSync(LOG_DIR)) {
    fs.mkdirSync(LOG_DIR, { recursive: true });
  }
}

function trimLogFile(logPath: string, maxSize: number) {
  if (!fs.existsSync(logPath) || fs.statSync(logPath).size <= maxSize) return;

  const lines = fs.readFileSync(logPath, "utf-8").split("\n");
  const keptLines: string[] = [];
  let keptBytes = 0;

  for (let i = lines.length - 1; i >= 0; i--) {
    const lineBytes = Buffer.byteLength(`${lines[i]}\n`, "utf-8");
    if (keptBytes + lineBytes > TRIM_TARGET_BYTES) break;
    keptLines.unshift(lines[i]);
    keptBytes += lineBytes;
  }

  fs.writeFileSync(logPath, keptLines.join("\n"), "utf-8");
}

function writeToLogFile(source: LogSource, entries: unknown[]) {
  if (!entries.length) return;

  ensureLogDir();
  const logPath = path.join(LOG_DIR, `${source}.log`);

  const lines = entries.map(
    (entry) => `[${new Date().toISOString()}] ${JSON.stringify(entry)}`
  );

  fs.appendFileSync(logPath, `${lines.join("\n")}\n`, "utf-8");
  trimLogFile(logPath, MAX_LOG_SIZE_BYTES);
}

function vitePluginManusDebugCollector(): Plugin {
  return {
    name: "manus-debug-collector",

    transformIndexHtml(html) {
      if (process.env.NODE_ENV === "production") return html;

      return {
        html,
        tags: [
          {
            tag: "script",
            attrs: {
              src: "/__manus__/debug-collector.js",
              defer: true,
            },
            injectTo: "head",
          },
        ],
      };
    },

    configureServer(server: ViteDevServer) {
      server.middlewares.use("/__manus__/logs", (req, res, next) => {
        if (req.method !== "POST") return next();

        let body = "";
        req.on("data", (chunk) => (body += chunk.toString()));
        req.on("end", () => {
          try {
            const payload = JSON.parse(body);
            payload.consoleLogs && writeToLogFile("browserConsole", payload.consoleLogs);
            payload.networkRequests && writeToLogFile("networkRequests", payload.networkRequests);
            payload.sessionEvents && writeToLogFile("sessionReplay", payload.sessionEvents);

            res.writeHead(200, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: true }));
          } catch (e) {
            res.writeHead(400, { "Content-Type": "application/json" });
            res.end(JSON.stringify({ success: false, error: String(e) }));
          }
        });
      });
    },
  };
}

/* =============================================================================
   VITE CONFIG
============================================================================= */

export default defineConfig({
  /** FRONTEND ROOT */
  root: path.resolve(PROJECT_ROOT, "client"),

  /** GITHUB PAGES BASE */
  base: "/garage_finance/",

  /** PLUGINS */
  plugins: [
    react(),
    tailwindcss(),
    jsxLocPlugin(),
    vitePluginManusRuntime(),
    vitePluginManusDebugCollector(),
  ],

  /** ALIASES */
  resolve: {
    alias: {
      "@": path.resolve(PROJECT_ROOT, "client", "src"),
      "@shared": path.resolve(PROJECT_ROOT, "shared"),
      "@assets": path.resolve(PROJECT_ROOT, "attached_assets"),
    },
  },

  /** ENV */
  envDir: PROJECT_ROOT,

  /** BUILD OUTPUT (IMPORTANTE PARA GITHUB PAGES) */
  build: {
    outDir: path.resolve(PROJECT_ROOT, "dist"),
    emptyOutDir: true,
  },

  /** DEV SERVER (LOCALHOST) */
  server: {
    port: 3000,
    host: true,
    strictPort: false,
    allowedHosts: [
      ".manuspre.computer",
      ".manus.computer",
      ".manus-asia.computer",
      ".manuscomputer.ai",
      ".manusvm.computer",
      "localhost",
      "127.0.0.1",
    ],
    fs: {
      strict: true,
      deny: ["**/.*"],
    },
  },
});
