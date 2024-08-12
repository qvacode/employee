import mongoose, { Schema, Document } from 'mongoose';
import { UserRole, UserStatus } from '../../../domain/user.entity';

export interface UserDocument extends Document {
    id: string;
    name: string;
    email: string;
    role: UserRole;
    password: string;
    status: UserStatus;
    position: string;
    department: string;
}

const UserSchema: Schema<UserDocument> = new Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
    },
    role: {
        type: String,
        enum: Object.values(UserRole),
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        enum: Object.values(UserStatus),
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    department: {
        type: String,
        required: true,
    },
}, { timestamps: true, versionKey: false });

export const UserModel = mongoose.model<UserDocument>('User', UserSchema);
