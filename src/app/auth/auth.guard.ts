import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { map, Observable } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  // This method is used to determine if the route can be activated (i.e., accessed)
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');
    
    if (token) {
      // Decode the token and check for roles (pseudo-code)
      const userRoles = this.decodeToken(token).roles;
      
      if (userRoles.includes('admin')) {
        return true; // Allow access to the route
      } else {
        this.router.navigate(['/unauthorized']); // Redirect to unauthorized page
        return false;
      }
    } else {
      this.router.navigate(['/login']); // Redirect to login page if no token
      return false;
    }
  }

  // Pseudo method for token decoding, use a proper JWT decoding library in production
  private decodeToken(token: string) {
    try {
      const payload = JSON.parse(atob(token.split('.')[1]));
      return payload;
    } catch (error) {
      return null;
    }
  }
}
