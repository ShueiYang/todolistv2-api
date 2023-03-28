// Using ES Module to use top level await (ES2022)
import "dotenv/config";

import { createServer } from "http";

import app from "./app.mjs";
import { startServer } from "./services/mongo.connect.js";

const httpServer = createServer(app);

await startServer();

const PORT = process.env.PORT || 8000;

httpServer.listen(PORT, () => {
        console.log(`app is running on port ${PORT}...`)
});