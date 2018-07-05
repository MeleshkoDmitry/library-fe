import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book, QueryParams, IBookListItems } from './book';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  private apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  viewListBooks(queryParams: QueryParams): Observable<IBookListItems> {
    const httpParams = new HttpParams()
      .set('title', queryParams.title || '.')
      .set('author', queryParams.author || '.')
      .set('page', queryParams.page.toString())
      .set('pageSize', queryParams.pageSize.toString())
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
