const express = require("express");
const path = require("path");
const crypto = require("crypto");
const app = express();
const port = 3000;

let lastGeneratedKey = null;

app.use(express.static(path.join(__dirname, "public")));

app.use(express.text());

app.use(express.json());

app.post("/create", (req, res) => {
  try {
    const randomBytes = crypto.randomBytes(32);
    const token = randomBytes.toString("base64url");
    const stamp = Date.now().toString(16);
    const apiKey = `${stamp}$${token}`;

    lastGeneratedKey = apiKey;
    console.log(`Key baru dibuat: ${apiKey}`);

    res.json({ apiKey: apiKey });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gagal membuat API key" });
  }
});

app.post("/validate", (req, res) => {
  const keyFromPostman = req.body;

  console.log(`Mencoba validasi key: ${keyFromPostman}`);
  console.log(`Key yang disimpan: ${lastGeneratedKey}`);

  if (keyFromPostman === lastGeneratedKey) {
    res.json({
      status: "sukses",
      message: "API Key valid dan terautentikasi.",
    });
  } else {
    res.status(401).json({
      status: "gagal",
      message: "API Key tidak valid atau salah.",
    });
  }
});

app.listen(port, () => {
  console.log(`Server berjalan di http://localhost:${port}`);
});
