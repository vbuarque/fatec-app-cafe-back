import bodyParser from "body-parser";
import express from "express";

import connectDB from "../config/database";
import adopt from "./routes/api/adopt";
import candies from "./routes/api/candies";
import coffee from "./routes/api/coffee";
import food from "./routes/api/foodPets";
import clothes from "./routes/api/clothesPets";
import toys from "./routes/api/toysPets";
import health from './routes/api/healthPets';


const app = express();

connectDB();

app.set("port", process.env.PORT || 5000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (_req, res) => {
  res.send("API Running");
});

app.use("/coffeeShop/coffee", coffee);
app.use("/pet/adopt", adopt);
app.use("/coffeeShop/candies", candies);
app.use("/pet/food", food);
app.use("/pet/clothes", clothes);
app.use("/pet/toys", toys);
app.use("/pet/health", health);

const port = app.get("port");
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
);

export default server;