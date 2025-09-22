const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

app.use("/api", require("./routes/UserRoutes"));

app.listen(port, () => {
  console.log(`Сервер запущен  на http://localhost:${port}`);
});
