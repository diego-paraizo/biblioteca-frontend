import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly user = 'admin';
  private readonly pass = 'admin';

  getAuthToken(): string {
    return btoa(`${this.user}:${this.pass}`);
  }
}
