import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { BookService } from '../../book.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Book } from '../../book';
import {
    BookActionTypes, LoadSuccess, ViewSuccess, EditSuccess, DeleteSuccess,
    PaginationEventSuccess
} from '../actions/actions';

interface Action {
    type: string; payload?: any; bookFilter?: any;
}

@Injectable()
export class BooksEffects {
    constructor(private bookService: BookService, private actions$: Actions) { }

    @Effect()
    load$: Observable<any> = this.actions$.pipe(
        ofType(BookActionTypes.Load),
        switchMap((action: Action) => this.bookService.viewListBooks(action.payload).pipe(
            map((books: Book[]) => new LoadSuccess(books))
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

    @Effect()
    pagination$: Observable<any> = this.actions$.pipe(
        ofType(BookActionTypes.PaginationEvent),
        map((action: Action) => new PaginationEventSuccess(action.payload))
    );
}
