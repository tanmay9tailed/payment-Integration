require("dotenv").config();

const cors = require("cors");
const express = require("express");
const router = require("./routes/payments.routes");
const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.use("/api", router)

app.get("/", function (req, res) {
  res.send("Hello World");
});

app.listen(port, () => {
  console.log("Server is lisenting on " + port);
});
