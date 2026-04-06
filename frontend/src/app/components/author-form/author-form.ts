import { Component, OnInit, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { AuthorService } from '../../services/author-service';
import { Author } from '../../models/author';

@Component({
  selector: 'app-author-form',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './author-form.html'
})
export class AuthorForm implements OnInit {
  author = signal<Author>({ id: 0, name: '' });
  isEditing = signal(false);

  constructor(
    private authorService: AuthorService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing.set(true);
      this.carregarAuthor(+id);
    }
  }

  carregarAuthor(id: number) {
    this.authorService.buscarPorId(id).subscribe({
      next: (data) => {
        this.author.set(data); 
      },
      error: (err) => console.error('Erro:', err)
    });
  }

  salvar() {
    this.authorService.salvar(this.author()).subscribe({
      next: () => this.router.navigate(['/author-list']),
      error: (err) => console.error('Erro ao salvar:', err)
    });
  }
}