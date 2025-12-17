require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { default: helmet } = require("helmet");
const compression = require("compression");
const { v4: uuidv4 } = require("uuid");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/init.mongodb");

const app = express();

const allowedOrigins = [process.env.URL_CLIENT, process.env.URL_ADMIN].filter(
  Boolean
);

// const corsOption = {
//   origin: function (origin, callback) {
//     if (!origin || allowedOrigins.includes(origin)) {
//       callback(null, true);
//     } else {
//       callback(new Error("Not allowed by CORS"));
//     }
//   },
//   methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
//   credentials: true,
//   optionsSuccessStatus: 204,
// };

// init middlewares
// app.use(
//   cors({
//     origin: function (origin, callback) {
//       // Allow requests with no origin (like mobile apps or curl requests)
//       if (!origin) return callback(null, true);

//       if (allowedOrigins.indexOf(origin) !== -1) {
//         callback(null, true);
//       } else {
//         callback(new Error("Not allowed by CORS"));
//       }
//     },
//     credentials: true,
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
//     allowedHeaders: [
//       "Content-Type",
//       "Authorization",
//       "X-Requested-With",
//       "x-api-key",
//       "x-client-id",
//     ],
//   })
// );
// app.options("/*path", cors());

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: [
      "Content-Type",
      "Authorization",
      "X-Requested-With",
      "x-api-key",
      "x-client-id",
    ],
    credentials: true,
  })
);

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

app.get("/", (req, res) => {
  res.set(
    "x-api-key",
    "e1995e9e3d713b35eb9881791e07d90853cd386c98bf7409456b3bff75a7dff471b7dd0e11053b00b58a8cde891c3f85d98822aa46735b2bc2349d09293a14a1"
  );
  res.json("Deploy Success");
});

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
    value: error.value,
    message: error.message || "Internal Server Error",
  });
});

module.exports = app;
