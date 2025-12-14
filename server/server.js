const app = require("./src/app");

const PORT = process.env.DEV_APP_PORT || 3055;

app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});

module.exports = app;
