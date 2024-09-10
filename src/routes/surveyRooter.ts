import express,{ Response, Request } from "express";
import {SurveyController} from "../controller/SurveyController";
import {ISurvey, IUser} from "../domain/interfaces";


// * Body-Parser
import bodyParser from "body-parser";
import {LogError, LogInfo} from "../utils/logger";
import {userEntity} from "../domain/entities/user.entity";

let jsonParser:any = bodyParser.json();

// * Router for Express
let surveyRouter:express.Router = express.Router();

//http://localhost:8000/api/surveys/
surveyRouter.route("/")
    .get(async (req :Request,res:Response)=>{
        //  Controller instance to execute method

        const controller:SurveyController = new SurveyController();
        const response= await controller.getAll()

        //  send to client
        return res.status(200).json(response);
    })

surveyRouter.route('/for_user/:score_min')
    .post(jsonParser,async ( req:Request,res:Response)=>{
        try {
            const userData = req.body

            const user:userEntity = new userEntity(
                userData.provincia,
                userData.municipio,
                userData.sex,
                userData.age,
                userData.educational_level,
            )
            if(!user.isValid()){
                LogInfo(`[ROOT] User not valid`)
                return res.status(400).json({
                    message: 'Datos de usuario inválidos',
                });
            }

            const score_min = parseInt(req.params.score_min, 10);
            if (isNaN(score_min) || score_min< 0 || score_min > 100 ){
                LogInfo(`[ROOT] score invalid`)
                return res.status(400).json({
                    message: 'Puntaje de coincidencia no valido'
                })
            }

            const controller:SurveyController = new SurveyController();
            const response= await controller.filterSurveys(user, score_min)

            return res.status(200).json(response);
        }catch (err){
            LogError(`[ROOT ERROR]${err} ]`)
            return res.status(500).json(err)
        }

    })

export default surveyRouter