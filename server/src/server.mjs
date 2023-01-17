// Using ES Module to use top level await (ES2022)
import "dotenv/config";

import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";

import apiRouter from "./routes/api-router.js";
import { startServer } from "./services/mongo.connect.js";


const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, "..", "public")));
app.use("/api", apiRouter);


await startServer();


const PORT = process.env.PORT || 8000;

app.listen(PORT, () => {
        console.log(`app is running on port ${PORT}...`)
});


export default app;