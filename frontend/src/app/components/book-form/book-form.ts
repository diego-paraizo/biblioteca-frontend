import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';

import { BookService } from '../../services/book-service';
import { AuthorService } from '../../services/author-service';
import { SubjectService } from '../../services/subject-service';

import { Book } from '../../models/book';
import { Author } from '../../models/author';
import { Subject } from '../../models/subject';

@Component({
  selector: 'app-book-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './book-form.html',
  styleUrl: './book-form.css',
})
export class BookForm implements OnInit {
  book = signal<Book>({
    id: 0,
    title: '',
    publisher: '',
    edition: 0,
    yearPublication: '',
    price: 0,
    authors: [],
    subjects: []
  });

  authorsList = signal<Author[]>([]);
  subjectsList = signal<Subject[]>([]);
  isEditing = signal(false);

  constructor(
    private bookService: BookService,
    private authorService: AuthorService,
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.carregarDadosAuxiliares();

    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing.set(true);
      this.carregarLivro(+id);
    }
  }

  private carregarDadosAuxiliares() {
    this.authorService.listar().subscribe({
      next: (dados) => this.authorsList.set(dados),
      error: (err) => console.error('Erro ao carregar autores', err)
    });

    this.subjectService.listar().subscribe({
      next: (dados) => this.subjectsList.set(dados),
      error: (err) => console.error('Erro ao carregar assuntos', err)
    });
  }

  private carregarLivro(id: number) {
    this.bookService.buscarPorId(id).subscribe({
      next: (data) => this.book.set(data),
      error: (err) => console.error('Erro ao buscar livro', err)
    });
  }

  updateBook(field: keyof Book, value: any) {
    this.book.set({ ...this.book(), [field]: value });
  }

  compareObjects(o1: any, o2: any): boolean {
    if (o1 && o2) {
      if (o1.id && o2.id) return o1.id === o2.id;
      if (typeof o1 === 'number') return o1 === o2.id;
      if (typeof o2 === 'number') return o1.id === o2;
    }
    return o1 === o2;
  }

  salvar() {
    const livro = this.book();
    
    const payload: any = {
      title: livro.title,
      publisher: livro.publisher,
      edition: livro.edition,
      yearPublication: livro.yearPublication,
      price: livro.price,
      authorsIds: livro.authors.map((a: any) => a.id || a.codAu),
      subjectsIds: livro.subjects.map((s: any) => s.id || s.codAs)
    };

    if (this.isEditing()) {
      payload.id = livro.id;
    }

    this.bookService.salvar(payload).subscribe({
      next: () => {
        alert('Operação realizada com sucesso!');
        this.router.navigate(['/book-list']);
      },
      error: (err) => {
        console.error('Erro na operação:', err);
        alert('Erro ao processar a requisição.');
      }
    });
  }
}