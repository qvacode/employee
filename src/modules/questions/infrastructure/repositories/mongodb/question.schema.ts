import mongoose, { Schema, Document } from 'mongoose';

export interface QuestionDocument extends Document {
    id: string;
    question: string;
    answer: string | null;
    score: number | null;
    evaluationId: string;
}

const QuestionSchema: Schema<QuestionDocument> = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    question: {
        type: String,
        required: true,
    },
    answer: {
        type: String,
        default: null,
    },
    score: {
        type: Number,
        default: null,
    },
    evaluationId: {
        type: String,
        required: true,
    },
}, { timestamps: true, versionKey: false });

export const QuestionModel = mongoose.model<QuestionDocument>('Question', QuestionSchema);
