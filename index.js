
const express = require("express");
const app = express();
const PORT = 3000;
const db = require("./models"); 

app.use(express.json());
app.use(
  express.urlencoded({
    extended: false,
  })
);



app.post("/Komik", async (req, res) => {
  const data = req.body;
  try {
    
    const komik = await db.Komik.create(data);
    res.status(201).send(komik);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get("/Komik", async (req, res) => {
  try {
    const komiks = await db.Komik.findAll();
    res.send(komiks);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.put("/Komik/:id", async (req, res) => {
  const id = req.params.id;
  const data = req.body;

  try {
    const komik = await db.Komik.findByPk(id);
    if (!komik) {
      return res.status(404).send("Komik not found");
    }
    await komik.update(data);
    res.send({ message: "Komik updated successfully", Komik: komik });
  } catch (err) {
    res.status(500).send(err);
  }
});

app.delete("/Komik/:id", async (req, res) => {
  const id = req.params.id;

  try {
    const komik = await db.Komik.findByPk(id);
    if (!komik) {
      return res.status(404).send("Komik not found");
    }
    await komik.destroy();
    res.send({ message: "Komik deleted successfully" });
  } catch (err) {
    res.status(500).send(err);
  }
});


app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
