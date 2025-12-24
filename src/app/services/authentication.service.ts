import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { TokenPayload, UserData } from '../core/models/api-response.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {

  private token: string | null = null;
  private payload: TokenPayload | null = null;

  private readonly isAuthenticated = new BehaviorSubject<boolean>(false);
  public isAuthenticated$ = this.isAuthenticated.asObservable();

  private readonly isAdmin = new BehaviorSubject<boolean>(false);
  public isAdmin$ = this.isAdmin.asObservable();

  public isTokenRefreshAllowed: boolean = true;

  public getIsAuthenticated() {
    return this.isAuthenticated.value;
  }
  public setIsAuthenticated(isAuthenticated: boolean) {
    this.isAuthenticated.next(isAuthenticated);
  }

  public getIsAdmin() {
    return this.isAdmin.value;
  }
  public setIsAdmin(isAdmin: boolean) {
    this.isAdmin.next(isAdmin);
  }

  public init () {
    try {
      this.token = localStorage.getItem('token');

      if (!this.token) return;

      this.payload = jwtDecode(this.token) as TokenPayload;

      this.setIsAuthenticated(true);
      this.payload.roles.includes('admin') ? this.setIsAdmin(true) : this.setIsAdmin(false);
    } catch (error) {
      console.error(error);
      // add external service like Sentry to save the error
    }
  }

  /**
   * Used to set connected state in front end app and to save refreshed token
   * @function connected
   * 
   * @param {string} authHeader - The value of Authorization header in response 
   * 
   * @returns {void}
   * 
   * @description
   * - check that token is Brearer token format
   * - store the Authorization header response value in local storage
   * - check if user is admin or not
   */
  public connected(authHeader: string) {
    try {
      const [type, token] = authHeader.split(' ');
      if (type.toLowerCase() !== 'bearer' || !token) throw new Error('token is not in format "Bearer token"');
      localStorage.setItem('token', authHeader);
      this.token = token;
      this.payload = jwtDecode(this.token) as UserData;
      this.setIsAuthenticated(true);
      this.payload.roles.includes('admin') ? this.setIsAdmin(true) : this.setIsAdmin(false);
    } catch (error) {
      console.error(error);
      // add external service like Sentry to save the error
    }
  }

  /**
   * Used to set disconnected state in front end app
   * @function disconnected
   * 
   * @returns {void}
   * 
   * @description
   * - remove token in local storage
   */
  public disconnected() {
    localStorage.removeItem('token');
    this.token = null;
    this.setIsAuthenticated(false);
    this.setIsAdmin(false);
  }

  /**
   * Used to block token refresh 2 secondes to not spam the connected function for each response
   * @function freezeTokenRefresh
   * 
   * @returns {void}
   */
  public freezeTokenRefresh() {
    this.isTokenRefreshAllowed = false;
    setTimeout(() => {
      this.isTokenRefreshAllowed = true;
    }, 1000 * 2);
  }
}
