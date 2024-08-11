import EventEmitter from "events";

export enum Events {
    QUALIFIED = 'QUESTION_QUALIFIED',
    SUBMIT = 'SUBMIT_EVALUATION',
    NEW_EVALUATION = 'NEW_EVALUATION'
}
export const eventEmitter = new EventEmitter()