import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { switchMap, map, tap } from 'rxjs/operators';
import { BookService } from '../../book.service';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Book, IBookListItems } from '../../book';
import {
    BookActionTypes, LoadBooksSuccess, ViewSuccess, EditSuccess, DeleteSuccess,
} from '../actions/books-actions';
import { Router } from '../../../../../node_modules/@angular/router';

interface Action {
    type: string; payload?: any; modifyType?: string;
}

@Injectable()
export class BooksEffects {
    constructor(private actions$: Actions, private bookService: BookService, private router: Router) { }

    @Effect()
    load$: Observable<LoadBooksSuccess> = this.actions$.pipe(
        ofType(BookActionTypes.LoadBooks),
        switchMap((action: Action) => this.bookService.viewListBooks(action.payload).pipe(
            map((result: IBookListItems) => new LoadBooksSuccess(result))
        ))
    );

    @Effect()
    view$: Observable<ViewSuccess> = this.actions$.pipe(
        ofType(BookActionTypes.View),
        switchMap((action: Action) => this.bookService.viewBook(action.payload).pipe(
            map((book: Book) => new ViewSuccess(book))
        ))
    );


    @Effect()
    modify$: Observable<any> = this.actions$.pipe(
        ofType(BookActionTypes.Modify),
        switchMap((action: Action) => this.bookService.viewBook(action.payload).pipe(
            map((result) => {
                if (action.modifyType === BookActionTypes.View) {
                    return new ViewSuccess(result);
                } else if (action.modifyType === BookActionTypes.Edit) {
                    return new EditSuccess(result);
                }
            })
        )));

    @Effect()
    editService$: Observable<any> = this.actions$.pipe(
        ofType(BookActionTypes.EditBookService),
        switchMap((action: Action) => this.bookService.editBook(action.payload._id, action.payload).pipe(
            tap((result) => {
                this.router.navigate(['/books/viewbook/', result._id]);
            }),
            map(result => new ViewSuccess(result)))));

    @Effect({ dispatch: false })
    addService$: Observable<any> = this.actions$.pipe(
        ofType(BookActionTypes.AddBookService),
        switchMap((action: Action) => this.bookService.addBook(action.payload).pipe(
            tap((result) => this.router.navigate(['/books/viewbook/', result._id]))
        )));
}
