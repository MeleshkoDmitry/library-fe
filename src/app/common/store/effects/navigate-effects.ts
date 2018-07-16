import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { Effect, Actions, ofType } from '@ngrx/effects';
import { map, tap } from 'rxjs/operators';
import { RouterActionTypes } from '../actions/navigate-actions';

interface Action { payload?: any; }

@Injectable()
export class RouterEffects {
    constructor(private actions$: Actions, private router: Router, private location: Location) { }

    @Effect({ dispatch: false })
    navigate$ = this.actions$.pipe(
        ofType(RouterActionTypes.GO),
        map((action: Action) => action.payload),
        tap(({ path, query: queryParams, extras }) =>
            this.router.navigate(path, { queryParams, ...extras })
        )
    );

    @Effect({ dispatch: false })
    navigateBack$ = this.actions$.pipe(
        ofType(RouterActionTypes.BACK),
        tap(() => this.location.back())
    );

    @Effect({ dispatch: false })
    navigateForward$ = this.actions$.pipe(
        ofType(RouterActionTypes.FORWARD),
        tap(() => this.location.forward())
    );
}
