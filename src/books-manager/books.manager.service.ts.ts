import {Book} from '../database/book-schema';
import {BookDto} from './dto/book.dto';


export default class BookManagerService {
  addBook = async (addBookData: BookDto): Promise<{_id: string}> => {
    const existingBook = await Book.findOne({title: addBookData.title})
        .select({title: 1, _id: 0})
        .lean();
    if (existingBook) {
      throw new Error(`A book with title: ${existingBook.title} already exists`);
    }
    const book = new Book({
      title: addBookData.title,
      author: addBookData.author,
      summary: addBookData.summary,
    });
    await book.save();
    return {_id: book._id.toString()};
  };

  getBooks = async (getBooksData: { seed: number; count: number; }): Promise<any> => {
    const seed = getBooksData.seed ?? 0;
    const count = getBooksData.count ?? 10;
    const list = await Book.find()
        .skip(seed)
        .limit(count)
        .lean();
    const total = await Book.countDocuments({});
    return {list, total};
  };

  updateBook = async (
      id: string,
      bookData: BookDto
  ): Promise<void> => {
    const book = await Book.findByIdAndUpdate(id, bookData, {new: true})
        .lean();
    if (!book) {
      throw new Error(`Book with provided id does not exist`);
    }
  };


  getBookById = async (id: string): Promise<any> => {
    const book = await Book.findById(id)
        .lean();
    if (!book) {
      throw new Error(`Book with provided id does not exist`);
    }
    return book;
  };

  deleteBookById = async (id: string): Promise<void> => {
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      throw new Error(`Book with provided id does not exist`);
    }
  };
}
