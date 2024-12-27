
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
 
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) { }
 
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const token = localStorage.getItem('token');
 
    if (token) {
      // Check if token is expired
      try {
        const payload = JSON.parse(atob(token.split('.')[1]));
        const isTokenExpired = payload.exp * 1000 < Date.now();
        const userRole = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']; 
        const allowedRoles: string[] = route.data['roles'];
        if (!isTokenExpired && allowedRoles.includes(userRole)) {
          return true; // Token is valid
        }
      } catch (e) {
        console.error('Invalid token:', e);
      }
    }
    alert("You Are Not Authorized OR Your Are Logged out, Please Login!");
    // Redirect to login if not authenticated
    setTimeout(() => {
      this.router.navigateByUrl("/login");
    }, 1000);
    return false;
  }
}