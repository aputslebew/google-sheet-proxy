import express from "express";
import fetch from "node-fetch";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

const GOOGLE_SHEET_URL = "https://script.google.com/macros/s/AKfycbwBr1mnPTefheAnZYDPeGXyELpcV1g00YYL48SPvhvTZu8LvZKK_rj0OMq9Yuzjqp8-9A/exec"; 
// Ganti sama URL Web App Google Apps Script lu

// Endpoint untuk kirim data ke Google Sheet
app.post("/add", async (req, res) => {
  try {
    const response = await fetch(GOOGLE_SHEET_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(req.body)
    });

    const text = await response.text();
    res.send(text);
  } catch (err) {
    console.error(err);
    res.status(500).send("Gagal mengirim data");
  }
});

// Cek server hidup
app.get("/", (req, res) => {
  res.send("Proxy server is running 🚀");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server berjalan di port ${port}`);
});
