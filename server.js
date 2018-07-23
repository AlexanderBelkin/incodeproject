const express = require("express");
const mongoose = require("mongoose");

const users = require("./routes/api/users");
const profile = require("./routes/api/profile");
const tasks = require("./routes/api/tasks");

const app = express();

// DB config
const db = require("./config/keys").mongoURI;

// connect to MongoDB
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(error => {
    console.log(error);
  });

app.get("/", (req, res) => {
  res.send("hello");
});

// use routes
app.use("/api/users", users);
app.use("/api/profile", profile);
app.use("/api/tasks", tasks);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});