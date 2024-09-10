"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SurveyController = void 0;
// ORM
const survey_orm_1 = require("../domain/orm/survey.orm");
const logger_1 = require("../utils/logger");
class SurveyController {
    /**
     * Endpoint to retrieve the all surveys in Collection "Surveys" of DB
     * @return { Promise <I Survey[] | undefined > } all surveys of db
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            (0, logger_1.LogSuccess)(`[api/users/] Get all Users`);
            return yield (0, survey_orm_1.getALlSurveys)();
        });
    }
    /**
     * Endpoint to retrieve surveys that have the most matches with the user from the "Surveys" collection in the database
     * @param { IUser } user User for whom surveys are being sought
     * @param { number }score_needed minimum match score decided
     * @return { Promise <I Survey[] | undefined > } surveys in the database with the most matches
     */
    filterSurveys(user, score_needed) {
        return __awaiter(this, void 0, void 0, function* () {
            if (user) {
                (0, logger_1.LogSuccess)(`[api/surveys/for_user] Get surveys for user]`);
                return yield (0, survey_orm_1.targetedSurveys)(user, score_needed);
            }
            else {
                return {
                    Message: "User is obligatory",
                };
            }
        });
    }
}
exports.SurveyController = SurveyController;
//# sourceMappingURL=SurveyController.js.map