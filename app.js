import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
const app = express();
import { configDotenv } from "dotenv";
configDotenv()

import router from "../backend_codamie/routes/signup.js";

app.use(bodyParser.json({ extended: false }));
app.use(router)
mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT || 3000);
    console.log("DataBase connected and serverRunning");
  })
  .catch((err) => {
    console.log(err);
  });

console.log("server Started");