const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const cors = require("cors");
const initDatabase = require("./startUp/initDatabase");
const routesApi = require("./routes");
const path = require("path");
const { mongoUrl } = require("./configdb/db.config");

const app = express();

const corsOptions = {
  origin: ["*"],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Array of allowed HTTP methods
  // allowedHeaders: ["Content-Type"],
  // credentials: true, // Whether to include credentials (cookies, authorization headers, etc.)
  // maxAge: 86400, // Preflight request cache duration (in seconds)
  // preflightContinue: false, // Pass the CORS preflight response to the next handler
  optionsSuccessStatus: 204, // The status code to use for successful OPTIONS requests
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api", routesApi);

const PORT = config.get("port") ?? 8080;

async function start() {
  try {
    await mongoose.connection.once("open", () => {
      initDatabase();
      console.log("init");
    });
    await mongoose.set("strictQuery", false);
    const db = await mongoose
      .connect(mongoUrl)
      .catch((error) => console.error("MongoDB connection error:", error));
    app.listen(PORT, () => {
      console.log(chalk.green(`Server has been started on port ${PORT}...`));
    });
  } catch (e) {
    console.log(chalk.red(e.message));
    process.exit(1);
  }
}

start();
