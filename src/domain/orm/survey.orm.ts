
import {surveyEntity} from "../entities/survey.entity";
import {ISurvey, IUser} from "../interfaces";
import {LogError, LogInfo} from "../../utils/logger";

//CRUD
/**
 * Method to obtain all Surveys from Collection "Surveys" in Mongo Server
 */
export const getALlSurveys = async ():Promise<ISurvey[] | undefined | any> => {
    try {
        let surveyModel = surveyEntity();

        // Search all surveys
        return await surveyModel.find()
    }catch (err){
        LogError(`[ORM ERROR] Getting all surveys : ${err}`)

        return {
            "status": "error",
            "err" : err
        }
    }
}

/**
 * Method to get all the surveys with the most matches with the user from the "Surveys" collection in Mongo Server
 */
export const targetedSurveys = async (user:IUser, score_needed:number):Promise<ISurvey[]| undefined | any> => {
    try {
        let surveyModel = surveyEntity();
        const currentTimestamp = Date.now(); // Timestamp actual

        // Buscar encuestas disponibles
        let surveys = await surveyModel.find()

        surveys = surveys.filter(survey => {

            return calculateSurveyScore(user, survey, score_needed)
        });

        return surveys; // Devuelve las encuestas encontradas
    } catch (err) {
        LogError(`[ORM ERROR] Getting targeted surveys: ${err}`);
        return {
            "status": "error",
            "err": err
        };
    }
};

function isAgeInGroup(userAge :number, ageGroup: string): boolean {

    if (ageGroup === null)
        return true;

    const rangeMatch = ageGroup.match(/^(\d+)\s*a\s*(\d+)$/);
    if (rangeMatch) {
        const minAge = parseInt(rangeMatch[1], 10);
        const maxAge = parseInt(rangeMatch[2], 10);
        return userAge >= minAge && userAge <= maxAge;
    }

    const minAgeMatch = ageGroup.match(/^(\d+)\s*años\s*o\s*mas$/);
    if (minAgeMatch) {
        const minAge = parseInt(minAgeMatch[1], 10);
        return userAge >= minAge;
    }
    return false;

}

function calculateSurveyScore(user: IUser, survey: ISurvey , score_needed: number): boolean {

    let score = 0;


    // check provincia
    if (survey.characterization.provincia.includes(user.provincia || ""))
        score += 35;
    if(score>=score_needed ) return true

    // check educational level
    if (survey.characterization.educational_level === user.educational_level || survey.characterization.educational_level === null) {}
        score += 25;
    if(score>=score_needed ) return true

    // check minicipio
    if (survey.characterization.municipio.includes(user.municipio || ""))
        score += 15;
    if(score>=score_needed ) return true

    // check age group
    if (survey.characterization.age_group === null || isAgeInGroup(user.age, survey.characterization.age_group))
        score += 15;
    if(score>=score_needed ) return true

    // check sex
    if (survey.characterization.sex === user.sex || survey.characterization.sex === null)
        score += 10;

    // LogInfo(`survey :${survey.id} \n score: ${score}`)
    return score>=score_needed;

}