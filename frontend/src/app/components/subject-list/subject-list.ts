import { Component, OnInit, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SubjectService } from '../../services/subject-service';
import { Subject } from '../../models/subject';

@Component({
  selector: 'app-subject-list',
  imports: [CommonModule, RouterLink],
  templateUrl: './subject-list.html',
  styleUrl: './subject-list.css',
})
export class SubjectList implements OnInit {
  subjects = signal<Subject[]>([]);

  constructor(private subjectService: SubjectService) {}

  ngOnInit() {
    this.carregarSubjects();
  }

  carregarSubjects() {
    this.subjectService.listar().subscribe({
      next: (dados) => {
        this.subjects.set(dados);
      },
      error: (err) => console.error('Erro ao carregar autores', err)
    });
  }

  deleteSubject(id: number) {
    if (confirm('Deseja realmente excluir?')) {
      this.subjectService.excluir(id).subscribe({
        next: () => this.carregarSubjects(),
        error: (err) => console.error('Erro ao excluir', err)
      });
    }
  }
}
