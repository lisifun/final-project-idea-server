const express = require("express");
const mongoose = require("mongoose");
const logger = require("morgan");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");

// const indexRouter = require("./routes/index");
const authRouter = require("./routes/auth");
const usersRouter = require("./routes/users");
const workspacesRouter = require("./routes/workspaces");
const projectsRouter = require("./routes/projects");
const ticketsRouter = require("./routes/tickets");
const githubRouter = require("./routes/github");

const app = express();

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

app.set("trust proxy", 1);
app.enable("trust proxy");

// app.use(
//   cors({
//     origin: [process.env.REACT_APP_URI], // <== URL of our future React app
//   })
// );

app.use(cors());

// app.use("/", indexRouter);
app.use("/users", usersRouter);
app.use("/auth", authRouter);
app.use("/workspaces", workspacesRouter);
app.use("/projects", projectsRouter);
app.use("/tickets", ticketsRouter);
app.use("/github", githubRouter);

mongoose
  .connect(process.env.MONGODB_URI)
  .then((x) => {
    console.log(
      `Connected to Mongo! Database name: "${x.connections[0].name}"`
    );
  })
  .catch((err) => {
    console.error("Error connecting to mongo: ", err);
  });

module.exports = app;
