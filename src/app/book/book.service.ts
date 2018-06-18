import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Book } from './book';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class BookService {
  private apiUrl: string;
  constructor(private http: HttpClient) {
    this.apiUrl = environment.apiUrl;
  }

  viewListBooks(book?: Book): Observable<Book> {
    if (book == null) {
      return this.http.get<Book>(`${this.apiUrl}/library/`);
    } else {
      const queryParams = new HttpParams()
        .set('title', book.title || '.')
        .set('author', book.author || '.');

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
