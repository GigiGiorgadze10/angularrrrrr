import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.currentUser$.pipe(
      map(user => {
        // Check if the user is logged in
        if (user) {
          // Check if the user has the required roles or permissions (adjust this logic as needed)
          if (user.roles.includes('admin')) {
            return true; // Allow access
          } else {
            this.router.navigate(['/unauthorized']); // Redirect to unauthorized page
            return false;
          }
        } else {
          this.router.navigate(['/login']); // Redirect to login page
          return false;
        }
      })
    );
  }
}