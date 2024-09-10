"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/*
* Root Router
* Redirection to Router
* */
const express_1 = __importDefault(require("express"));
// Routers
const logger_1 = require("../utils/logger");
const surveyRooter_1 = __importDefault(require("./surveyRooter"));
// server instance
let server = (0, express_1.default)();
//Router instance
let rootRouter = express_1.default.Router();
//Activate for request to http://localhost:8000/api
//GET: http://localhost:8000/api/
rootRouter.get("/", (req, res) => {
    (0, logger_1.LogInfo)("http://localhost:8000/api/");
    res.send("Welcome to my API ");
});
//Redirection to Router & Controller
server.use("/", rootRouter); // http://localhost:8000/api/
server.use("/surveys", surveyRooter_1.default); // http://localhost:8000/api/survey -> surveyRouter
//Add more routes to the app
exports.default = server;
//# sourceMappingURL=index.js.map