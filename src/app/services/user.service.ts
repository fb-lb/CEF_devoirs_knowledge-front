import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, UserData } from '../core/models/api-response.model';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient){
    this.retrieveAllUsers();
  }

  isInitialized: boolean = false;
  initPromise: Promise<void> | null = null;

  public async init(){
    if (this.isInitialized) return Promise.resolve();
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        await this.retrieveAllUsers();
        this.isInitialized = true;
      } catch (error) {
        this.isInitialized = false;
        this.initPromise = null;
      }
    })();

    return this.initPromise;
  }


  private allUsersSubject = new BehaviorSubject<UserData[]>([]);
  public allUsers$ = this.allUsersSubject.asObservable();

  public get getAllUsers() {
    return this.allUsersSubject.value;
  }

  /**
   * Fetches all users from the API and stores them.
   *
   * @async
   * @function retrieveAllUsers
   * @returns {Promise<void>}
   * 
   * @throws {Error} If an unexpected error occurs
   */
  public async retrieveAllUsers(){
    try {
      const response = await firstValueFrom(this.http.get<ApiResponse<UserData[]>>(environment.backUrl + '/api/utilisateurs/tous'));
      this.allUsersSubject.next(response.data ?? []);
    } catch (error) {
      console.error(error);
      // add external service like Sentry to save the error 
      throw error;
    }
  }
}
