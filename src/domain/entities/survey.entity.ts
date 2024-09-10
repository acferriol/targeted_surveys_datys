import mongoose from "mongoose";
import {ISurvey} from "../interfaces";


export const surveyEntity = ()=> {
    let surveySchema = new mongoose.Schema<ISurvey>({
        name: { type: String, required: true },
        id_project: { type: Number, required: true },
        id_anonymous_participation: { type: String, required: true },
        url: { type: String, required: true },
        description: { type: String, required: true },
        workgroup: { type: String, required: true },
        id_workgroup: { type: Number, required: true },
        icon: { type: String, required: true },
        fill_by_device: { type: Boolean, required: true },
        responses: {
            valid: { type: Number, required: true },
            noValid: { type: Number, required: true },
        },
        recopilationPeriod: {
            startedAt: { type: Number, required: true },
            endAt: { type: Number, required: true },
        },
        sphere: { type: String, required: true },
        id: { type: Number, required: true },
        characterization: {
            provincia: { type: [String], required: true },
            municipio: { type: [String], required: true },
            sex: { type: String, enum: ['Masculino', 'Femenino', null], default: null },
            age_group: { type: String, default: null },
            educational_level: { type: String, default: null },
        },
    })
    return mongoose.models.Surveys || mongoose.model<ISurvey>('Surveys', surveySchema)
}