import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth-service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.getAuthToken();

  const authReq = req.clone({
    setHeaders: {
      Authorization: `Basic ${token}`
    }
  });

  return next(authReq);
};
