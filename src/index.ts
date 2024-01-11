import express  from "express";
import cors from "cors";
import dotEnv from "dotenv";

import Routes from "./Routes";
import path from "path";

const app = express();

app.use(express.json());
app.use(cors());

dotEnv.config();

const routes = new Routes(app);
routes.createRoutes();

app.listen(3001, () => console.log("Running on port 3001..."))