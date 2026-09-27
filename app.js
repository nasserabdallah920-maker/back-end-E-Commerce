require("dotenv").config();
const express = require("express");
const cors = require("cors");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const Router = require("./src/routes/index.routes");
const { handleError } = require("./src/middlewares/error.middleware");
const cookieParser = require("cookie-parser");
const swaggerUi = require("swagger-ui-express");
const swaggerSpec = require("./src/docs/swagger");
const path = require("path");
const app = express();

// app.use(
//   cors({
//     origin: process.env.CLIENT_URL ,
//     credentials: true,
//   }),
// );

const allowedOrigins = [
  'https://ecommerce-frontend-xi-silk.vercel.app',
  'http://localhost:5173'
];

app.use(
  cors({
    origin: function (origin, callback) {

      if (!origin) return callback(null, true);
      

      const cleanOrigin = origin.endsWith('/') ? origin.slice(0, -1) : origin;
      const cleanAllowed = allowedOrigins.map(o => o.endsWith('/') ? o.slice(0, -1) : o);

      if (cleanAllowed.includes(cleanOrigin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    credentials: true,
  })
);
app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 300,
    message: "Too many requests, please try again later",
    standardHeaders: true,
  }),
);
app.use(helmet({  crossOriginResourcePolicy: false,}));
app.use(express.json());
app.use(cookieParser());
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.use("/api", Router);
app.use("/api/uploads", express.static(path.join(__dirname, "src", "uploads")));
app.use(handleError);
module.exports = app;
