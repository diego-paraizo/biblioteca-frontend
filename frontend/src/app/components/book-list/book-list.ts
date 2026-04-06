import { Component, OnInit, signal } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { BookService } from '../../services/book-service';
import { Book } from '../../models/book';
import { Author } from '../../models/author';
import { Subject } from '../../models/subject';

@Component({
  selector: 'app-book-list',
  imports: [CommonModule, CurrencyPipe, RouterLink],
  templateUrl: './book-list.html',
  styleUrl: './book-list.css',
})
export class BookList {
  books = signal<Book[]>([]);

  constructor(private bookService: BookService) {}

  ngOnInit() {
    this.carregarLivros();
  }

  carregarLivros() {
    this.bookService.listar().subscribe({
      next: (dados) => this.books.set(dados),
      error: (err) => console.error('Erro ao buscar livros', err)
    });
  }

  getAuthorsNames(authors: Author[]): string {
    if (!authors || authors.length === 0) return 'Sem autor definido';
    return authors.map(a => a.name).join(', ');
  }

  getSubjectsNames(subjects: Subject[]): string {
    if (!subjects || subjects.length === 0) return 'Geral';
    return subjects.map(s => s.description).join(', ');
  }

  deleteBook(id: number) {
    if (confirm('Deseja realmente excluir?')) {
      this.bookService.excluir(id).subscribe(() => this.carregarLivros());
    }
  }

}
