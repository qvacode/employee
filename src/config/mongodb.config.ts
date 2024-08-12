import mongoose, { connect } from 'mongoose';
import { Env } from './env.config';

export const dbConnect = async (): Promise<void> => {
    await connect(Env.MONGO_URL);
};

mongoose.set('strictQuery', true)