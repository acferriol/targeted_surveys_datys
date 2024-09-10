import { ISurvey, IUser } from "../../domain/interfaces";

export interface ISurveyController{
    getAll() :Promise<ISurvey[] | undefined>;

    filterSurveys(user: IUser, score_needed:number) : Promise<ISurvey[] | undefined>;
}