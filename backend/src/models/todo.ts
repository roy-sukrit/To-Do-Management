// models/todo.ts
import mongoose, { Document, Schema } from 'mongoose';
import Category, { ICategory } from './category';

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


// Middleware to check if category IDs are valid before creating a Todo
todoSchema.pre('validate', async function (next) {
    if (this.categories && this.categories.length > 0) {
        const categoryIds = this.categories;
        
        // Find categories matching these IDs
        const existingCategories = await Category.find({ _id: { $in: categoryIds } , email: this.email});
        
        // Check if all provided categories exist
        if (existingCategories.length !== categoryIds.length) {
            return next(new Error('One or more categories do not exist.'));
        }
    }
    next();
});

// todoSchema.pre('validate', async function (next) {
//     console.log('Validating categories:', this.categories); // Log the categories being validated
//     if (this.categories && this.categories.length > 0) {
//         const categoryIds = this.categories;
//         const existingCategories = await Category.find({ _id: { $in: categoryIds } });
//         console.log('Existing Categories:', existingCategories); // Log the existing categories found

//         if (existingCategories.length !== categoryIds.length) {
//             return next(new Error('One or more categories do not exist.'));
//         }
//     }
//     next();
// });

const Todo = mongoose.model<ITodo>('Todo', todoSchema);
export default Todo;
