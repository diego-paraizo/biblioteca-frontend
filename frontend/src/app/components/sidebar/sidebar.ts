import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { BookReportService } from '../../services/book-report-service';

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {
  private bookReportService = inject(BookReportService);

  exportarPdf() {
    this.bookReportService.downloadReport().subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        window.open(url);
        setTimeout(() => window.URL.revokeObjectURL(url), 100);
      },
      error: (err) => {
        console.error('Erro ao exportar PDF:', err);
        alert('Não foi possível gerar o PDF no momento.');
      }
    });
  }
}