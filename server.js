const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use(express.static("public"));

app.get("/", (req, res) => {
  const code = `Bem vindo ao Online Notes!
Use os comandos no lado dirito
para criar um novo arquivo e compartilhar`;
  res.render("code-display", { code });
});

app.get("/new", (req, res) => {
  res.render("new");
});

app.listen(3000);
