const express = require("express");
const app = express();

const Document = require("./models/Document");

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/onotes", {
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  const code = `Bem vindo ao ONotes!
Use os comandos no lado dirito
para criar um novo bloco de notas 
e compartilhar com seus amigos`;
  res.render("code-display", { code, language: "plaintext" });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.post("/save", async (req, res) => {
  const { value, id } = req.body;
  console.log(value, id);
  try {
    if (!id) {
      const document = await Document.create({ value });
      res.redirect(`/${document.id}`);
      return;
    }

    await Document.findOneAndUpdate({ _id: id }, { value: value });
    res.redirect(`/${id}`);
  } catch (error) {
    res.render("new", { value });
  }
});

app.get("/:id", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    res.render("code-display", { code: document.value, id });
  } catch (error) {
    res.redirect("/");
  }
});

app.get("/:id/duplicate", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    res.render("new", { value: document.value });
  } catch (error) {
    res.redirect(`/${id}`);
  }
});

app.get("/:id/edit", async (req, res) => {
  const id = req.params.id;
  try {
    const document = await Document.findById(id);
    res.render("edit", { value: document.value, id });
  } catch (error) {
    res.redirect(`/${id}`);
  }
});

app.listen(3000);
