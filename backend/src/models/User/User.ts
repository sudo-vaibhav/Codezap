import { Schema, Document, model } from 'mongoose';
const userSchema = new Schema(
    {
        user_id: {
            type: String,
            required: true,
            unique: true,
            validate: /^.{28}$/,
            immutable: true,
            index: true,
        },
        email: {
            type: String,
            trim: true,
            validate: /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            required: true,
            unique: true,
            immutable: true,
        },
        profilePhoto: {
            type: String,
            validate: /data:image\/[^;]+;base64[^"]+$/,
        },
        username: {
            type: String,
            unique: true,
            required: true,
            immutable: true,
            index: true,
            trim: true,
        },
        bio: {
            type: String,
            required: true,
            trim: true,
        },
    },
    {
        timestamps: true,
    },
);

export interface IBaseUser {
    user_id: string;
    email: string;
    profilePhoto: string;
    username: string;
    bio: string;
}
export interface IUser extends IBaseUser, Document {}
const User = model<IUser>('User', userSchema);
export default User;
