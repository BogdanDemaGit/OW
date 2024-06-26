const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const connectDB = require("./bd");
const appealRouter = require("./appeal-router");
const app = express();
const port = 3000;

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, "Public")));
app.use("/api", appealRouter);
app.use("/api/apartments", appealRouter);
app.use("/api/get", appealRouter);

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}/index.html`);
});
