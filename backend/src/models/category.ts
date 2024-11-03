// models/category.ts
import mongoose, { Document, Schema } from 'mongoose';
import Todo from './todo';
// import sequenceFactory from 'mongoose-sequence';

export interface ICategory extends Document {
  name: string;
  slug: string;
  email: string; // Add the email field to associate categories with users

}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true, },
  email: { type: String, required: true }, // Ensure email is provided for each category

});

// Middleware to delete associated Todos when a Category is removed
// Post middleware to delete associated Todos after a Category is deleted
categorySchema.post('findOneAndDelete', async function (doc) {
  if (doc) {
      try {
          await Todo.deleteMany({ categories: doc._id });
      } catch (error) {
          console.error('Error deleting associated todos:', error);
      }
  }
});

categorySchema.index({ email: 1, name: 1, slug: 1 }, { unique: true });


categorySchema.on('index', error => {
  if (error) {
    console.error('Index creation error:', error);
  }
});
const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;
