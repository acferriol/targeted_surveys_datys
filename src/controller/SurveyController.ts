import {ISurveyController} from "./interfaces";
import {ISurvey, IUser} from "../domain/interfaces";

// ORM
import {getALlSurveys,targetedSurveys} from "../domain/orm/survey.orm";
import {LogSuccess} from "../utils/logger";



export class SurveyController implements ISurveyController {
    /**
     * Endpoint to retrieve the all surveys in Collection "Surveys" of DB
     * @return { Promise <I Survey[] | undefined > } all surveys of db
     */
    public async getAll(): Promise < ISurvey[] | undefined > {

        LogSuccess(`[api/users/] Get all Users`)
        return await getALlSurveys();
    }

    /**
     * Endpoint to retrieve surveys that have the most matches with the user from the "Surveys" collection in the database
     * @param { IUser } user User for whom surveys are being sought
     * @param { number }score_needed minimum match score decided
     * @return { Promise <I Survey[] | undefined > } surveys in the database with the most matches
     */
    public async filterSurveys(user: IUser, score_needed:number): Promise<ISurvey[] | undefined | any> {

        if(user){
            LogSuccess(`[api/surveys/for_user] Get surveys for user]`)
            return await targetedSurveys(user, score_needed);
        }else{
           return {
               Message: "User is obligatory",
           }
        }
    }

}