import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { BookService } from '../../book.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { IBookListItems, Book } from '../../book';
import { BookActionTypes, LoadBooksSuccess, DeleteSuccess } from '../actions/books-actions';
import { Go } from '../../../common/store/actions/navigate-actions';

interface Action {
  type: string; payload?: any; nextActionType?: any;
}

@Injectable()
export class BooksEffects {
  constructor(private actions$: Actions,
              private bookService: BookService) { }

  @Effect()
  load$: Observable<LoadBooksSuccess> = this.actions$.pipe(
    ofType(BookActionTypes.LoadBooks),
    switchMap((action: Action) => this.bookService.viewListBooks(action.payload).pipe(
      map((result: IBookListItems) => new LoadBooksSuccess(result))
    ))
  );

  @Effect()
  singleLoad$: Observable<Book> = this.actions$.pipe(
    ofType(BookActionTypes.SingleLoad),
    switchMap((action: Action) => this.bookService.viewBook(action.payload).pipe(
      map((result) => new action.nextActionType(result)))));

  @Effect()
  delete$: Observable<DeleteSuccess> = this.actions$.pipe(
    ofType(BookActionTypes.Delete),
    switchMap((action: Action) => this.bookService.deleteBook(action.payload).pipe(
      map(() => new DeleteSuccess()))
    ));

  @Effect()
  editService$: Observable<Go> = this.actions$.pipe(
    ofType(BookActionTypes.EditBookService),
    switchMap((action: Action) => this.bookService.editBook(action.payload._id, action.payload).pipe(
      map((result: Book) => new Go({
        path: ['/books/viewbook/', result._id],
        extras: { skipLocationChange: true }
      })))));


  @Effect()
  addService$: Observable<Go> = this.actions$.pipe(
    ofType(BookActionTypes.AddBookService),
    switchMap((action: Action) => this.bookService.addBook(action.payload).pipe(
      map((result: Book) => new Go({
        path: ['/books/viewbook/', result._id],
        extras: { skipLocationChange: true }
      })))));
}
