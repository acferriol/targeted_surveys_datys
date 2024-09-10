import express,{Express,Request, Response} from "express";
import rootRouter from "../routes";

// * Security
import cors from "cors"
import helmet from "helmet"

//TODO: HTTPS

// * Root Routes
// import rootRouter from "../routes"
import mongoose from "mongoose";

// * Create Express APP
const server:Express = express()

// * Define SERVER to use "/api" and use rootRouter from 'index.ts.ts' in routes
//From this point onover: http://localhost/api/...
server.use(
    '/api',
    rootRouter
    );

//TODO: Mongoose Connection
mongoose.connect('mongodb://localhost:27017/targeted_surveys',)



// * Security Config
server.use(helmet());
server.use(cors());

// * Content type
server.use(express.urlencoded({extended:true,limit:'50mb'}));
server.use(express.json({limit:'50mb'}));


// * Redirection Config
//http://localhost:8000/ --> http://localhost:8000/api/
server.get('/', (req: Request, res: Response) => {
    res.redirect("/api");
});

export default server;