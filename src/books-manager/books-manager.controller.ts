
import express from 'express';
import httpStatusCodes from 'http-status-codes';
import BookManagerService from './books.manager.service.ts.js';
import {RequestProperty, ValidationMiddleware} from '../middlewares/validator.js';
import {BookDto} from './dto/book.dto.js';
import {GetBooksDto} from './dto/get-books.dto.js';
import {BookIdDto} from './dto/book-id.dto.js';
import {UpdateBookDto} from './dto/update-book.dto.js';

export default class BookManagerController {
  public path = '/books';
  public app: express.Application;
  public bookManagerService : BookManagerService;

  constructor(bookManagerService: BookManagerService) {
    this.app = express();
    this.initializeRoutes();
    this.bookManagerService = bookManagerService;
  }

  public initializeRoutes() {
    this.app.post(
        `${this.path}`,
        ValidationMiddleware.validateDto(RequestProperty.Body, BookDto),
        this.addBook
    );
    this.app.get(
        `${this.path}`,
        ValidationMiddleware.validateDto(RequestProperty.Query, GetBooksDto),
        this.getBooks
    );
    this.app.put(
        `${this.path}/:id`,
        ValidationMiddleware.validateDto(RequestProperty.Params, BookIdDto),
        ValidationMiddleware.validateDto(RequestProperty.Body, UpdateBookDto),
        this.updateBook
    );
    this.app.get(
        `${this.path}/:id`,
        ValidationMiddleware.validateDto(RequestProperty.Params, BookIdDto),
        this.getBookById
    );
    this.app.delete(
        `${this.path}/:id`,
        ValidationMiddleware.validateDto(RequestProperty.Params, BookIdDto),
        this.deleteBookById
    );
  }

  private addBook = async ( request: express.Request,
      response: express.Response, next : express.NextFunction) => {
    try {
      const addBookData = request.body;
      const result = await this.bookManagerService.addBook(addBookData);
      response.status(httpStatusCodes.CREATED).json({message: 'success', data: result});
    } catch (error) {
      next(error);
    }
  };

  private getBooks = async ( request: express.Request,
      response: express.Response, next : express.NextFunction) => {
    try {
      const getBooks = request.query as any;
      const result = await this.bookManagerService.getBooks(getBooks);
      response.status(httpStatusCodes.OK).json({message: 'success', data: result});
    } catch (error) {
      next(error);
    }
  };

  private updateBook = async ( request: express.Request,
      response: express.Response, next : express.NextFunction) => {
    try {
      const bookId = request.params.id;
      const booksData = request.body;
      const result = await this.bookManagerService.updateBook(bookId, booksData);
      response.status(httpStatusCodes.OK).json({message: 'success', data: result});
    } catch (error) {
      next(error);
    }
  };

  private getBookById = async ( request: express.Request,
      response: express.Response, next : express.NextFunction) => {
    try {
      const id = request.params.id;
      const result = await this.bookManagerService.getBookById(id);
      response.status(httpStatusCodes.OK).json({message: 'success', data: result});
    } catch (error) {
      next(error);
    }
  };
  private deleteBookById = async ( request: express.Request,
      response: express.Response, next : express.NextFunction) => {
    try {
      const id = request.params.id;
      const result = await this.bookManagerService.deleteBookById(id);
      response.status(httpStatusCodes.OK).json({message: 'success', data: result});
    } catch (error) {
      next(error);
    }
  };
}

