const app = require("./src/app");

const PORT = process.env.DEV_APP_PORT || 3056;

const server = app.listen(PORT, () => {
  console.log(`Shop E-commerce running with port: ${PORT}`);
});
