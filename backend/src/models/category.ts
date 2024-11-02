// models/category.ts
import mongoose, { Document, Schema } from 'mongoose';
// import sequenceFactory from 'mongoose-sequence';

export interface ICategory extends Document {
  name: string;
  slug: string;
  email: string; // Add the email field to associate categories with users

}

const categorySchema = new Schema<ICategory>({
  name: { type: String, required: true },
  slug: { type: String, required: true },
  email: { type: String, required: true }, // Ensure email is provided for each category

});


const Category = mongoose.model<ICategory>('Category', categorySchema);
export default Category;
