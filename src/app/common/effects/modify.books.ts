import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { BookService } from '../../book/book.service';
import { Observable, of } from 'rxjs';
import { mergeMap, map, catchError } from 'rxjs/operators';

@Injectable()
export class ModifyEffects {
    @Effect()
    loadBook$: Observable<any> = this.actions$.pipe(
        ofType('VIEW_LIST_BOOKS'),
        mergeMap((action: any) => {
            return this.bookService.viewListBooks(action.payload).pipe(
                map(data => {
                    console.log(`data`, data);
                    return { type: 'VIEW_LIST_BOOKS', payload: data };
                }),
                catchError(() => of({ type: 'LOGIN_FAILED' }))
            );
        })
    );
    constructor(private actions$: Actions, private bookService: BookService) { }
}
