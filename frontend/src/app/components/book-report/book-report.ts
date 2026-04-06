import { Component, OnInit, signal, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BookReportService } from '../../services/book-report-service';
import { BookReportDTO } from '../../models/book-report-dto'; 
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-book-report',
  imports: [CommonModule],
  templateUrl: './book-report.html',
  styleUrl: './book-report.css',
})
export class BookReport implements OnInit {
  private bookReportService = inject(BookReportService);
  
  data = signal<BookReportDTO[]>([]);
  generatedAt = new Date();

  totalBooks = computed(() => this.data().length);
  totalValue = computed(() => this.data().reduce((acc, item) => acc + (item.valor || 0), 0));

  ngOnInit() {
    this.bookReportService.getRelatorio().subscribe(res => this.data.set(res));
  }
}