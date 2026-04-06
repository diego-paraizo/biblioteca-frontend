import { Component, OnInit, signal, inject } from '@angular/core';
import { DashboardService } from '../../services/dashboard-service'; 

@Component({
  selector: 'app-dashboard',
  imports: [],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css',
})
export class Dashboard implements OnInit {
  private service = inject(DashboardService);
  
  stats = signal({ totalBooks: 0, totalAuthors: 0, totalSubjects: 0 });

  ngOnInit() {
    this.service.getDashboardStats().subscribe(data => {
      this.stats.set(data);
    });
  }
}