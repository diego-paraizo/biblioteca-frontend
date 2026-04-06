import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BookReportDTO } from '../models/book-report-dto';

@Injectable({
  providedIn: 'root',
})
export class BookReportService {

  private readonly baseUrl = 'http://localhost:8080/api/reports';

  constructor(private http: HttpClient) {}

  getRelatorio(): Observable<BookReportDTO[]> {
    return this.http.get<BookReportDTO[]>(`${this.baseUrl}/books`);
  }

  downloadReport(): Observable<Blob> {
    return this.http.get(`${this.baseUrl}/download`, { 
      responseType: 'blob' 
    });
  }

}
