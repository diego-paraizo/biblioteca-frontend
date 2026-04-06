import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Subject } from '../models/subject';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private readonly baseUrl = 'http://localhost:8080/api/subjects';

  constructor(private http: HttpClient) {}

  listar(): Observable<Subject[]> {
    return this.http.get<Subject[]>(this.baseUrl);
  }

  excluir(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
  
  buscarPorId(id: number): Observable<Subject> {
    return this.http.get<Subject>(`${this.baseUrl}/${id}`);
  }

  salvar(record: Subject): Observable<Subject> {
    if (record.id) return this.http.put<Subject>(`${this.baseUrl}/${record.id}`, record);
    return this.http.post<Subject>(this.baseUrl, record);
  }
}