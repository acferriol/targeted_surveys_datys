/*
* Root Router
* Redirection to Router
* */
import express, {Response, Request} from "express";

// Routers

import {LogInfo} from "../utils/logger";
import surveyRouter from "./surveyRooter";

// server instance
let server = express()

//Router instance
let rootRouter = express.Router();

//Activate for request to http://localhost:8000/api

//GET: http://localhost:8000/api/
rootRouter.get("/", (req: Request, res: Response) => {
    LogInfo("http://localhost:8000/api/")
    res.send("Welcome to my API ");
})

//Redirection to Router & Controller
server.use("/", rootRouter)// http://localhost:8000/api/
server.use("/surveys", surveyRouter); // http://localhost:8000/api/survey -> surveyRouter

//Add more routes to the app

export default server;