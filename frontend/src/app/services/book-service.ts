import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Book } from '../models/book';

@Injectable({
  providedIn: 'root'
})
export class BookService {
  private readonly baseUrl = 'http://localhost:8080/api/books';

  constructor(private http: HttpClient) {}

  listar(): Observable<Book[]> {
    return this.http.get<Book[]>(this.baseUrl);
  }

  buscarPorId(id: number): Observable<Book> {
    return this.http.get<Book>(`${this.baseUrl}/${id}`);
  }

  salvar(record: Book): Observable<Book> {
    if (record.id && record.id > 0) {
      return this.http.put<Book>(`${this.baseUrl}/${record.id}`, record);
    }
    
    return this.http.post<Book>(this.baseUrl, record);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}