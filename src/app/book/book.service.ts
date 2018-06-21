import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from './book';
import { environment } from '../../environments/environment';
import { BookFilter } from './book.filter';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  private apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  viewListBooks(bookFilter: BookFilter): Observable<Book> {
    if (!(bookFilter.title || bookFilter.author)) {
      const queryParams = new HttpParams()
        .set('page', bookFilter.page.toString())
        .set('pageSize', bookFilter.pageSize.toString())
        .set('sort', bookFilter.sort);
      return this.http.get<Book>(`${this.apiUrl}/library/?${queryParams}`);
    } else {
      const queryParams = new HttpParams()
        .set('title', bookFilter.title || '.')
        .set('author', bookFilter.author || '.')
        .set('page', bookFilter.page.toString())
        .set('pageSize', bookFilter.pageSize.toString())
        .set('sort', bookFilter.sort);

      return this.http.get<Book>(`${this.apiUrl}/library/?${queryParams}`);
    }
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
