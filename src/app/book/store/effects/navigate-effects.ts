import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { BookActionTypes } from '../actions/navigate-actions';
import { CustomAction } from '../reducers/book-reducer';

@Injectable()
export class RouterEffects {
    constructor(private actions$: Actions, private router: Router, private location: Location) { }

    @Effect({ dispatch: false })
    navigate$ = this.actions$.pipe(
        ofType(BookActionTypes.GO),
        map((action: CustomAction) => action.payload),
        tap(({ path, query: queryParams, extras }) =>
            this.router.navigate(path, { queryParams, ...extras })
        )
    );

    @Effect({ dispatch: false })
    navigateBack$ = this.actions$.pipe(
        ofType(BookActionTypes.BACK),
        tap(() => this.location.back())
    );

    @Effect({ dispatch: false })
    navigateForward$ = this.actions$.pipe(
        ofType(BookActionTypes.FORWARD),
        tap(() => this.location.forward())
    );
}
