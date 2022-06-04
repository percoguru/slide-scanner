const express = require("express");
const cors = require("cors");
const routes = require("./routes");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    allowedHeaders: ["Content-Type"],
    credentials: true,
  })
);

app.use("/", routes);

app.listen(2000, () => {
  console.log("Listening on 2000");
});
