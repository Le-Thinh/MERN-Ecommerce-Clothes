const app = require("./src/app");

app.get("/", (req, res) => {
  res.json("Deploy Success");
});
