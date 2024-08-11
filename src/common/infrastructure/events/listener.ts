import { EvaluationPrimitiveData, EvaluationStatus } from "../../../modules/evaluations/domain/evaluation.entity";
import { evaluationUseCases } from "../../../modules/evaluations/infrastructure/dependencies-injection";
import { questionUseCases } from "../../../modules/questions/infrastructure/dependencies-injection";
import { UserRole } from "../../../modules/users/domain/user.entity";
import { userUseCases } from "../../../modules/users/infrastructure/dependencies-injection";
import { MailSender } from "../mail/mail-sender";
import { generateAssignmentEmailTemplate, generateUserEvaluationTemplate } from "../mail/mail-template";
import { eventEmitter, Events } from "./emitter";

export function eventListener() {
    eventEmitter.on(Events.QUALIFIED, async (questionId: string) => {
        try {
            const question = await questionUseCases.findById(questionId);
            if (!question) {
                console.error(`Question with ID ${questionId} not found`);
                return;
            }
            
            const evaluation = await evaluationUseCases.findById(question.evaluationId);
            if (!evaluation) {
                console.error(`Evaluation for question ID ${questionId} not found`);
                return;
            }
            
            const allQuestionsInEvaluation = await questionUseCases.findByEvaluation(evaluation.id)
            const allAnswered = allQuestionsInEvaluation.every(q => q.score !== null);
    
            if (!allAnswered) return

            const totalScore = allQuestionsInEvaluation.reduce((acc, q) => acc + (q.score || 0), 0);
            const averageScore = totalScore / allQuestionsInEvaluation.length;
            evaluation.score = averageScore;
            evaluation.status = EvaluationStatus.COMPLETED;
            
            await evaluationUseCases.update(evaluation.id, evaluation);
            console.log(`Evaluation ${evaluation.id} completed with average score ${averageScore}`);                
        } catch (error) {
            console.error(`Error processing event ${Events.QUALIFIED} for question ID ${questionId}:`, error);
        }
    });

    eventEmitter.on(Events.SUBMIT, async (evaluation: EvaluationPrimitiveData) => {
        const { evaluator, userId, id } = evaluation
        if(!evaluator) return

        try {
            const manager = await userUseCases.findById(evaluator);
            const employee = await userUseCases.findById(userId);
            if (!manager) {
                console.error(`User with ID ${evaluation} not found`);
                return;
            }
            if (!employee) {
                console.error(`User with ID ${employee} not found`);
                return;
            }
            if(manager.role !== UserRole.MANAGER) {
                console.error(`User with ID ${evaluation} is not a manager`);
                return;
            }

            const template = generateAssignmentEmailTemplate(manager.name, employee.name, id)
            const subject = 'Evaluación Asignada para Revision'

            await MailSender.send(manager.email, subject, template)                           
        } catch (error) {
            console.error(`Error processing event ${Events.QUALIFIED} for question ID ${evaluation}:`, error);
        }
    });

    eventEmitter.on(Events.NEW_EVALUATION, async (evaluation: EvaluationPrimitiveData) => {
        const { userId, id } = evaluation

        try {
            const employee = await userUseCases.findById(userId);
            if (!employee) {
                console.error(`User with ID ${employee} not found`);
                return;
            }

            const template = generateUserEvaluationTemplate(employee.name, id)
            const subject = 'Nueva Evaluación Asignada'

            await MailSender.send(employee.email, subject, template)                  
        } catch (error) {
            console.error(`Error processing event ${Events.QUALIFIED} for question ID ${evaluation}:`, error);
        }
    });
}
