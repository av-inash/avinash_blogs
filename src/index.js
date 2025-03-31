import express from 'express';
import dotenv from 'dotenv';


// import indexRoute from "./routes/index.js";

import {errorHandler} from "./utils/errorHandler.js"


dotenv.config();
import db from "./config/db.js"


// import path from 'path';



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));







app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});


// app.use("/api/v1", indexRoute);

app.use(errorHandler.handleError());


export default app;