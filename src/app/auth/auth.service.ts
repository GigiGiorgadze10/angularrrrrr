import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { User } from './user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  login(username: string, password: string): Observable<boolean> {
    // Simulate login with backend API call (replace with actual backend logic)
    // Simulate login with fake credentials
    if (username === 'user' && password === 'password') {
        // If login successful, update the current user subject
      const user: User = {
        id: 1,
        username: 'user',
        token: 'fake_token',
        roles: ['user']
      };
      localStorage.setItem('user', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return of(true);
    } else {
      return of(false);
    }
  }

  logout() {
    // Clear the current user and token
    localStorage.removeItem('user');
    this.currentUserSubject.next(null);
  }
}