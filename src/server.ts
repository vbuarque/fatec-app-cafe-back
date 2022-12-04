import bodyParser from "body-parser";
import express from "express";

import connectDB from "../config/database";
import cats from "./routes/api/cats";
import candies from "./routes/api/candies";
import coffee from "./routes/api/coffee";


const app = express();

connectDB();

app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/api/coffee", coffee);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;
