import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map } from 'rxjs/operators';
import { BookService } from '../../book.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Book, IBookListItems } from '../../book';
import {
    BookActionTypes, LoadBooksSuccess, ViewSuccess, EditSuccess, DeleteSuccess,
} from '../actions/books-actions';

interface Action {
    type: string; payload?: any; bookFilter?: any;
}

@Injectable()
export class BooksEffects {
    constructor(private bookService: BookService, private actions$: Actions) { }

    @Effect()
    load$: Observable<any> = this.actions$.pipe(
        ofType(BookActionTypes.LoadBooks),
        switchMap((action: Action) => this.bookService.viewListBooks(action.payload).pipe(
            map((result: IBookListItems) => new LoadBooksSuccess(result))
        ))
    );

    @Effect()
    view$: Observable<any> = this.actions$.pipe(
        ofType(BookActionTypes.View),
        switchMap((action: Action) => this.bookService.viewBook(action.payload).pipe(
            map((book: Book) => new ViewSuccess(book))
        ))
    );

    @Effect()
    edit$: Observable<any> = this.actions$.pipe(
        ofType(BookActionTypes.Edit),
        switchMap((action: Action) => this.bookService.viewBook(action.payload).pipe(
            map((book: Book) => new EditSuccess(book))
        ))
    );

    @Effect()
    delete$: Observable<any> = this.actions$.pipe(
        ofType(BookActionTypes.Delete),
        switchMap((action: Action) => this.bookService.deleteBook(action.payload).pipe(
            map(() => new DeleteSuccess()))
        ));

    @Effect({ dispatch: false })
    addService$: Observable<any> = this.actions$.pipe(
        ofType(BookActionTypes.AddBookService),
        switchMap((action: Action) => this.bookService.addBook(action.payload).pipe(
            map((result) => new ViewSuccess(result)))
        ));

    @Effect({ dispatch: false })
    editService$: Observable<Book> = this.actions$.pipe(
        ofType(BookActionTypes.EditBookService),
        switchMap((action: Action) => this.bookService.editBook(action.payload._id, action.payload)
        ));
}
