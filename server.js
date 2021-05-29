/* eslint-disable import/no-extraneous-dependencies */
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const routes = require("./server/routes/v1/task.routes");

const app = express();
const mongoose = require("mongoose");

// Configure
// ==============================================
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cors
app.use(cors({ origin: true }));

// DB
// ==============================================
mongoose
  .connect(process.env.MONGODB_URI, {
    useFindAndModify: false,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => console.log("Database connected! you are good to go now."))
  .catch((err) => console.log("Database error: ", err));

// ROUTES
// ==============================================
app.use("/v1/tasks", routes);

// RUN SERVER
// ==============================================
const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Server started on port ${port}`));
