
import dotenv from "dotenv";
import server from "./src/server";
import * as process from "node:process";
import {LogSuccess, LogError} from "./src/utils/logger";
import express from "express";


// * Configuration the .env file
dotenv.config();

// todo
const port = process.env.PORT || 8000

// * Execute SERVER
server.listen(port, () => {
    LogSuccess(`[SERVER ON] Running on http://localhost:${port}/api`);
});

// Static Server
server.use(express.static("public"))

// * Control SERVER Error
server.on('error', err => {
    LogError(`[SERVER Error] ${err}`);
})
