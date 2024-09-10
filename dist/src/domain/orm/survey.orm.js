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
exports.targetedSurveys = exports.getALlSurveys = void 0;
const survey_entity_1 = require("../entities/survey.entity");
const logger_1 = require("../../utils/logger");
//CRUD
/**
 * Method to obtain all Surveys from Collection "Surveys" in Mongo Server
 */
const getALlSurveys = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let surveyModel = (0, survey_entity_1.surveyEntity)();
        // Search all surveys
        return yield surveyModel.find();
    }
    catch (err) {
        (0, logger_1.LogError)(`[ORM ERROR] Getting all surveys : ${err}`);
        return {
            "status": "error",
            "err": err
        };
    }
});
exports.getALlSurveys = getALlSurveys;
/**
 * Method to get all the surveys with the most matches with the user from the "Surveys" collection in Mongo Server
 */
const targetedSurveys = (user, score_needed) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let surveyModel = (0, survey_entity_1.surveyEntity)();
        const currentTimestamp = Date.now(); // Timestamp actual
        // Buscar encuestas disponibles
        let surveys = yield surveyModel.find();
        surveys = surveys.filter(survey => {
            return calculateSurveyScore(user, survey, score_needed);
        });
        return surveys; // Devuelve las encuestas encontradas
    }
    catch (err) {
        (0, logger_1.LogError)(`[ORM ERROR] Getting targeted surveys: ${err}`);
        return {
            "status": "error",
            "err": err
        };
    }
});
exports.targetedSurveys = targetedSurveys;
function isAgeInGroup(userAge, ageGroup) {
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
function calculateSurveyScore(user, survey, score_needed) {
    let score = 0;
    // check provincia
    if (survey.characterization.provincia.includes(user.provincia || ""))
        score += 35;
    if (score >= score_needed)
        return true;
    // check educational level
    if (survey.characterization.educational_level === user.educational_level || survey.characterization.educational_level === null) { }
    score += 25;
    if (score >= score_needed)
        return true;
    // check minicipio
    if (survey.characterization.municipio.includes(user.municipio || ""))
        score += 15;
    if (score >= score_needed)
        return true;
    // check age group
    if (survey.characterization.age_group === null || isAgeInGroup(user.age, survey.characterization.age_group))
        score += 15;
    if (score >= score_needed)
        return true;
    // check sex
    if (survey.characterization.sex === user.sex || survey.characterization.sex === null)
        score += 10;
    // LogInfo(`survey :${survey.id} \n score: ${score}`)
    return score >= score_needed;
}
//# sourceMappingURL=survey.orm.js.map