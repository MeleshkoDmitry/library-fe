import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Book } from './book';
import { BookService } from './book.service';
import { Observable } from 'rxjs';

@Injectable()

export class BookResolver implements Resolve<Book> {

    constructor(private bookService: BookService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Book> {
        return this.bookService.viewBook(route.params.id);
    }

}
