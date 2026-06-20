/**
 * InternX 創作者專區 — 交接用 Demo 靜態伺服器
 * 零依賴 Node 靜態伺服器（Zeabur Node 服務）。
 * 提供 site/ 內的檔案，支援乾淨網址（/creator -> site/creator.html）。
 */
const http = require("http");
const fs = require("fs");
const path = require("path");

const ROOT = path.join(__dirname, "site");
const PORT = process.env.PORT || 8080;

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff2": "font/woff2",
  ".woff": "font/woff",
  ".txt": "text/plain; charset=utf-8",
  ".md": "text/markdown; charset=utf-8",
};

function send(res, status, body, type) {
  res.writeHead(status, {
    "Content-Type": type || "text/plain; charset=utf-8",
    "Cache-Control": "no-cache",
  });
  res.end(body);
}

function safeJoin(base, target) {
  const p = path.normalize(path.join(base, target));
  if (!p.startsWith(base)) return null; // 防目錄穿越
  return p;
}

const server = http.createServer((req, res) => {
  try {
    let urlPath = decodeURIComponent((req.url || "/").split("?")[0]);
    if (urlPath === "/") urlPath = "/index.html";

    let filePath = safeJoin(ROOT, urlPath);
    if (!filePath) return send(res, 400, "Bad request");

    // 乾淨網址：/creator -> /creator.html
    if (!path.extname(filePath)) {
      const asHtml = filePath + ".html";
      if (fs.existsSync(asHtml)) filePath = asHtml;
    }

    if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) {
      // 找不到頁面 -> 回首頁（單一交接站，避免死連結）
      const fallback = path.join(ROOT, "index.html");
      const html = fs.readFileSync(fallback);
      return send(res, 200, html, MIME[".html"]);
    }

    const ext = path.extname(filePath).toLowerCase();
    const body = fs.readFileSync(filePath);
    send(res, 200, body, MIME[ext] || "application/octet-stream");
  } catch (err) {
    send(res, 500, "Server error: " + (err && err.message));
  }
});

server.listen(PORT, () => {
  console.log(`InternX 創作者專區 Demo 執行於 http://0.0.0.0:${PORT}`);
});
