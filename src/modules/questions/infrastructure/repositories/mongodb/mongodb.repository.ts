import { QuestionRepository } from '../../../domain/question.repository';
import { Question, QuestionPrimitiveData } from '../../../domain/question.entity';
import { QuestionModel } from './question.schema';

export class MongoQuestionRepository implements QuestionRepository {
    async create(question: Question): Promise<void> {
        const questionData = new QuestionModel(question.toValue());
        await questionData.save();
    }

    async findById(id: string): Promise<QuestionPrimitiveData | null> {
        const question = await QuestionModel.findOne({ id }).exec();
        return question ? question.toObject() : null;
    }

    async findAll(): Promise<QuestionPrimitiveData[] | []> {
        const questions = await QuestionModel.find().exec();
        return questions.map(question => question.toObject());
    }

    async answer(id: string, answer: string): Promise<QuestionPrimitiveData | null> {
        const question = await QuestionModel.findOneAndUpdate(
            { id },
            { $set: { answer } },
            { new: true }
        ).exec();

        return question ? question.toObject() : null;
    }

    async qualify(id: string, score: number): Promise<QuestionPrimitiveData | null> {
        const question = await QuestionModel.findOneAndUpdate(
            { id },
            { $set: { score } },
            { new: true }
        ).exec();

        return question ? question.toObject() : null;
    }

    async findByEvaluation(evaluationId: string): Promise<QuestionPrimitiveData[]> {
        const questions = await QuestionModel.find({ evaluationId }).exec();
        return questions.map(question => question.toObject());
    }
}
