// models/todo.ts
import mongoose, { Document, Schema } from 'mongoose';
import { ICategory } from './category';

export interface ITodo extends Document {
    email: string;
    text: string;
    done: boolean;
    categories: mongoose.Types.ObjectId[]; // Reference to Category _id
}
export interface CreateTodoInput {
    email: string;
    text: string;
    done: boolean;
    categories: { _id: mongoose.Types.ObjectId; name: string; slug: string }[]; // Include _id here for category

}




const todoSchema = new Schema<ITodo>({
    email: { type: String, required: true },
    text: { type: String, required: true },
    done: { type: Boolean, default: false },
    categories: [{ type: Schema.Types.ObjectId, ref: 'Category' }],
}, { timestamps: true });

const Todo = mongoose.model<ITodo>('Todo', todoSchema);
export default Todo;
