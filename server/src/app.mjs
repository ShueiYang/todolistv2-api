import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

import apiRouter from "./routes/api-router.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api", apiRouter);


export default app;