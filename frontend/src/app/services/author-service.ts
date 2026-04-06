import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Author } from '../models/author';

@Injectable({ providedIn: 'root' })
export class AuthorService {
  private readonly baseUrl = 'http://localhost:8080/api/authors';

  constructor(private http: HttpClient) {}

  listar(): Observable<Author[]> {
    return this.http.get<Author[]>(this.baseUrl);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
  buscarPorId(id: number): Observable<Author> {
    return this.http.get<Author>(`${this.baseUrl}/${id}`);
  }

  salvar(record: Author): Observable<Author> {
    if (record.id) return this.http.put<Author>(`${this.baseUrl}/${record.id}`, record);
    return this.http.post<Author>(this.baseUrl, record);
  }
}