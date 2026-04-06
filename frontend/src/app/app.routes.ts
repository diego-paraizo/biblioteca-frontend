import { Routes } from '@angular/router';
import { Dashboard } from './components/dashboard/dashboard';
import { BookList } from './components/book-list/book-list';
import { BookForm } from './components/book-form/book-form';
import { AuthorList } from './components/author-list/author-list';
import { AuthorForm } from './components/author-form/author-form';
import { SubjectList } from './components/subject-list/subject-list';
import { SubjectForm } from './components/subject-form/subject-form';
import { BookReport } from './components/book-report/book-report';

export const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: Dashboard },
  { path: 'book-report', component: BookReport },
  
  // Rotas de Autores
  { path: 'author-list', component: AuthorList },
  { path: 'author-form', component: AuthorForm },
  { path: 'author-form/:id', component: AuthorForm }, // Rota para edição

  // Rotas de Assuntos
  { path: 'subject-list', component: SubjectList },
  { path: 'subject-form', component: SubjectForm },
  { path: 'subject-form/:id', component: SubjectForm }, // Rota para edição

  // Rotas de Livros
  { path: 'book-list', component: BookList },
  { path: 'book-form', component: BookForm },
  { path: 'book-form/:id', component: BookForm }, // Rota para edição
];