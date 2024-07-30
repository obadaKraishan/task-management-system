// src/app/core/services/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5002/api/auth';

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string, phone: string, role: string, department: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, { name, email, password, phone, role, department });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, { email, password });
  }

  logout(): void {
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token') || !!sessionStorage.getItem('token');
  }

  getUsers(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users`);
  }

  createUser(name: string, email: string, password: string, phone: string, role: string, department: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/create-user`, { name, email, password, phone, role, department });
  }

  getCurrentUser(): any {
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    if (token) {
      return JSON.parse(atob(token.split('.')[1])).user;
    }
    return null;
  }
}
