const express = require("express");
const app = express();
const port = 3000;
const fs = require("fs");
const cors = require("cors");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use("/uploads", express.static("uploads"));

if (!fs.existsSync("./uploads")) {
  fs.mkdirSync("./uploads");
}

app.use("/api", require("./routes/UserRoutes"));

app.listen(port, () => {
  console.log(`Сервер запущен  на http://localhost:${port}`);
});
