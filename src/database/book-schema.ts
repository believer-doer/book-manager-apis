import mongoose, {model} from 'mongoose';

const bookSchema = new mongoose.Schema({
  title: {type: String, required: true, unique: true},
  author: {type: String, required: true},
  summary: {type: String},
}, {
  collection: 'books',
  timestamps: true,
});

export const Book = model('book', bookSchema);
