import mongoose, { Document, Schema } from 'mongoose';

export interface ITodo extends Document {
    userDetail: string;
    title: string;
    description: string;
}

const todoSchema = new Schema<ITodo>({
    userDetail: { type: String, required: true },
    title: { type: String, required: true },
    description: { type: String, required: true },
}, { timestamps: true });

const Todo = mongoose.model<ITodo>('Todo', todoSchema);

export default Todo;
