import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Book } from './book';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectViewBook } from './store/reducers/book.reducer';
import { take, filter } from 'rxjs/operators';

@Injectable()

export class BookResolver implements Resolve<Book> {
    constructor(private store: Store<Book>) { }
    book$: any;
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book> {
        this.store.dispatch({ type: 'VIEW_BOOK', payload: route.params.id });
        this.book$ = this.store.select(selectViewBook).pipe(filter(book => !!book), take(1));
        this.store.subscribe(console.log);
        return this.book$;
    }
}
