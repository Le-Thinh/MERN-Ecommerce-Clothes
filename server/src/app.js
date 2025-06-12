require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { default: helmet } = require("helmet");
const compression = require("compression");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");

const app = express();

const corsOption = {
  origin: process.env.URL_CLIENT,
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

// init middlewares
app.use(cors(corsOption));
app.use(morgan("dev"));
app.use(helmet());
app.use(compression());
app.use(express.json());
app.use(cookieParser());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// init logger

// init routes
app.use("/", require("./routes"));

// init DB
require("./db/init.mongodb");

// handle error
app.use((req, res, next) => {
  const error = new Error("NOT FOUND");
  error.status = 404;
  next(error);
});

app.use((error, req, res, next) => {
  const statuscode = error.statusCode || 500;
  return res.status(statuscode).json({
    status: "error",
    code: statuscode,
    stack: error.stack,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
