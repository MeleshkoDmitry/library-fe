import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book, IBookListItems } from './book';
import { environment } from '../../environments/environment';
import { IBookListStateQuery } from './store/reducers/book.reducer';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  private apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  viewListBooks(queryParams: IBookListStateQuery): Observable<IBookListItems> {
    const httpParams = new HttpParams()
      .set('title', queryParams.filter.title || '.')
      .set('author', queryParams.filter.author || '.')
      .set('page', queryParams.pagination.page.toString())
      .set('pageSize', queryParams.pagination.pageSize.toString())
      .set('sort', '-1');
    return this.http.get<IBookListItems>(`${this.apiUrl}/library/?${httpParams}`);
  }

  viewBook(_id: string): Observable<Book> {
    return this.http.get<Book>(`${this.apiUrl}/library/${_id}`);
  }

  addBook(book: Book): Observable<Book> {
    return this.http.post<Book>(`${this.apiUrl}/library`, book);
  }

  deleteBook(_id: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/library/${_id}`);
  }

  editBook(_id: string, book: Book): Observable<Book> {
    return this.http.put<Book>(`${this.apiUrl}/library/${_id}`, book);
  }
}
