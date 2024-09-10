"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const server_1 = __importDefault(require("./src/server"));
const process = __importStar(require("node:process"));
const logger_1 = require("./src/utils/logger");
const express_1 = __importDefault(require("express"));
// * Configuration the .env file
dotenv_1.default.config();
// todo
const port = process.env.PORT || 8000;
// * Execute SERVER
server_1.default.listen(port, () => {
    (0, logger_1.LogSuccess)(`[SERVER ON] Running on http://localhost:${port}/api`);
});
// Static Server
server_1.default.use(express_1.default.static("public"));
// * Control SERVER Error
server_1.default.on('error', err => {
    (0, logger_1.LogError)(`[SERVER Error] ${err}`);
});
//# sourceMappingURL=index.js.map