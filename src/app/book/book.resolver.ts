import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Book } from './book';
import { BookService } from './book.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

@Injectable()

export class BookResolver implements Resolve<Book> {
    result: any;
    constructor(private store: Store<Book>, private bookService: BookService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book> {
/*         this.bookService.viewBook(route.params.id).subscribe(result => {
            this.store.dispatch({ type: 'VIEW_BOOK_SUCCESS', payload: result });
        });
        this.result = this.store.select('book'); */
    }
}
