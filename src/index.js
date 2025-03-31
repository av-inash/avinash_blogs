import express from 'express';
import dotenv from 'dotenv';


// import indexRoute from "./routes/index.js";

import {errorHandler} from "./utils/errorHandler.js"
import indexRoute from "./routes/index.js"

dotenv.config();
import db from "./config/db.js"


// import path from 'path';



const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));




app.use("/api/v1", indexRoute);

app.use(errorHandler.handleError());


export default app;