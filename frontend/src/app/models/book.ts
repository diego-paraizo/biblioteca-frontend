import { Author } from './author';
import { Subject } from './subject';

export interface Book {
  id: number;
  title: string;
  publisher: string;
  edition: number;
  yearPublication: string; 
  price: number;
  
  authors: Author[];
  subjects: Subject[];
}