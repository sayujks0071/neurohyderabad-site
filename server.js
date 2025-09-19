import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static("."));

// Basic route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index-static.html"));
});

// Health check endpoint
app.get("/health", (req, res) => {
  res.json({
    status: "ok",
    timestamp: new Date().toISOString(),
    message: "Neuro Hyderabad site is running",
  });
});

app.listen(PORT, () => {
  console.log(`Neuro Hyderabad website running on http://localhost:${PORT}`);
  console.log(`Health check available at http://localhost:${PORT}/health`);
});
