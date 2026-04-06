import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AuthorService } from '../../services/author-service';
import { Author } from '../../models/author';

@Component({
  selector: 'app-author-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './author-list.html',
  styleUrl: './author-list.css',
})
export class AuthorList implements OnInit {
  authors = signal<Author[]>([]);

  constructor(private authorService: AuthorService) {}

  ngOnInit() {
    this.carregarAuthors();
  }

  carregarAuthors() {
    this.authorService.listar().subscribe({
      next: (dados) => {
        this.authors.set(dados);
      },
      error: (err) => console.error('Erro ao carregar autores', err)
    });
  }

  deleteAuthor(id: number) {
    if (confirm('Deseja realmente excluir?')) {
      this.authorService.excluir(id).subscribe(() => this.carregarAuthors());
    }
  }
}