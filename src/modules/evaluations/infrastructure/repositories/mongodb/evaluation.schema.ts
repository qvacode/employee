import mongoose, { Schema, Document } from 'mongoose';
import { EvaluationStatus } from '../../../domain/evaluation.entity';

export interface EvaluationDocument extends Document {
    period: string;
    status: EvaluationStatus;
    type: string;
    score: number | null;
    userId: string;
    evaluator: string | null;
}

const EvaluationSchema: Schema<EvaluationDocument> = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    period: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(EvaluationStatus),
        default: EvaluationStatus.PENDING,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    score: {
        type: Number,
        default: null,
    },
    userId: {
        type: String,
        required: true,
    },
    evaluator: {
        type: String,
        default: null,
    },
}, { timestamps: true, versionKey: false });

export const EvaluationModel = mongoose.model<EvaluationDocument>('Evaluation', EvaluationSchema);
