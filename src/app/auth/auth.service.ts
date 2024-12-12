import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient) {}

  // Method for user login
  login(username: string, password: string): Observable<boolean> {
    return this.http.post<{ token: string, user: Partial<User> }>('backend/api/auth', { username, password }).pipe(
      map(response => {
        if (response.token) {
          // Store user data locally and in currentUserSubject
          const user: User = {
            id: response.user.id || undefined, // Provide a default value if undefined
            username: response.user.username || undefined,
            token: response.token,
            roles: response.user.roles || undefined
          };
          localStorage.setItem('token', response.token);
          this.currentUserSubject.next(user);
          return true;
        } else {
          return false;
        }
      })
    );
  }

  // Method for user logout
  logout() {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
  }
}
