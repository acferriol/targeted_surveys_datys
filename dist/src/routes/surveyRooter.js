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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const SurveyController_1 = require("../controller/SurveyController");
// * Body-Parser
const body_parser_1 = __importDefault(require("body-parser"));
const logger_1 = require("../utils/logger");
const user_entity_1 = require("../domain/entities/user.entity");
let jsonParser = body_parser_1.default.json();
// * Router for Express
let surveyRouter = express_1.default.Router();
//http://localhost:8000/api/surveys/
surveyRouter.route("/")
    .get((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //  Controller instance to execute method
    const controller = new SurveyController_1.SurveyController();
    const response = yield controller.getAll();
    //  send to client
    return res.status(200).json(response);
}));
surveyRouter.route('/for_user/:score_min')
    .post(jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userData = req.body;
        const user = new user_entity_1.userEntity(userData.provincia, userData.municipio, userData.sex, userData.age, userData.educational_level);
        if (!user.isValid()) {
            (0, logger_1.LogInfo)(`[ROOT] User not valid`);
            return res.status(400).json({
                message: 'Datos de usuario inválidos',
            });
        }
        const score_min = parseInt(req.params.score_min, 10);
        if (isNaN(score_min) || score_min < 0 || score_min > 100) {
            (0, logger_1.LogInfo)(`[ROOT] score invalid`);
            return res.status(400).json({
                message: 'Puntaje de coincidencia no valido'
            });
        }
        const controller = new SurveyController_1.SurveyController();
        const response = yield controller.filterSurveys(user, score_min);
        return res.status(200).json(response);
    }
    catch (err) {
        (0, logger_1.LogError)(`[ROOT ERROR]${err} ]`);
        return res.status(500).json(err);
    }
}));
exports.default = surveyRouter;
//# sourceMappingURL=surveyRooter.js.map