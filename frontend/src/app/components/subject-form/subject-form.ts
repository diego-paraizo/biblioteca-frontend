import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { SubjectService } from '../../services/subject-service';
import { Subject } from '../../models/subject';

@Component({
  selector: 'app-subject-form',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './subject-form.html',
  styleUrl: './subject-form.css',
})
export class SubjectForm implements OnInit {
  subject = signal<Subject>({ id: 0, description: '' });
  isEditing = signal(false);

  constructor(
    private subjectService: SubjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditing.set(true);
      this.carregarSubject(+id);
    }
  }

  carregarSubject(id: number) {
    this.subjectService.buscarPorId(id).subscribe({
      next: (data) => {
        this.subject.set(data); 
      },
      error: (err) => console.error('Erro:', err)
    });
  }

  salvar() {
    this.subjectService.salvar(this.subject()).subscribe({
      next: () => this.router.navigate(['/subject-list']),
      error: (err) => console.error('Erro ao salvar:', err)
    });
  }
}