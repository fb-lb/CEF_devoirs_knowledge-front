import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, CursusData, ElementData, LessonData, ThemeData } from '../core/models/api-response.model';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient, private authService: AuthenticationService){
    this.init();
    this.authService.init();
  }

  public isInitialized: boolean = false;
  public initPromise: Promise<void> | null = null;

  public allThemes: ThemeData[] = [];
  public allCursus: CursusData[] = [];
  public allLessons: LessonData[] = [];
  public allElements: ElementData[] = [];

  //-------------------
  // Initialization
  //-------------------

  public async init(): Promise<void> {
    if (this.isInitialized) return Promise.resolve();
    if (this.initPromise) return this.initPromise;

    this.initPromise = (async () => {
      try {
        await this.retrieveAllData();

        this.isInitialized = true;
      } catch (error) {
        this.initPromise = null;
        this.isInitialized = false;
        throw error;
      }
      
    })();

    return this.initPromise;
  }

  //-------------------
  // Data retrieving
  //-------------------
  public async retrieveAllData(){
    if (this.authService.getIsAuthenticated() && this.authService.getIsAdmin()) {
      await Promise.all([
        this.retrieveAllThemes(),
        this.retrieveAllCursus(),
        this.retrieveAllLessons(),
        this.retrieveAllElements(),
      ]);
    } else {
      await Promise.all([
        this.retrieveAllThemes(),
        this.retrieveAllCursus(),
        this.retrieveAllLessons(),
      ]);
    }
  }

  /**
   * Fetches all themes from the API and stores them sorted by order.
   *
   * @async
   * @function retrieveAllThemes
   * @returns {Promise<void>}
   * 
   * @throws {Error} If an unexpected error occurs
   */
  public async retrieveAllThemes(){
    try {
      const response = await firstValueFrom(this.http.get<ApiResponse<ThemeData[]>>(environment.backUrl + '/api/content/theme/all'));
      if (response.data) this.allThemes = response.data.sort((a,b) => a.order - b.order);
    } catch (error) {
      console.error(error);
      // add external service like Sentry to save the error 
    }
  }

  /**
   * Fetches all cursus from the API and stores them sorted by order.
   *
   * @async
   * @function retrieveAllCursus
   * @returns {Promise<void>}
   * 
   * @throws {Error} If an unexpected error occurs
   */
  public async retrieveAllCursus(){
    try {
      const response = await firstValueFrom(this.http.get<ApiResponse<CursusData[]>>(environment.backUrl + '/api/content/cursus/all'));
      if (response.data) this.allCursus = response.data.sort((a,b) => a.order - b.order);
    } catch (error) {
      console.error(error);
      // add external service like Sentry to save the error 
    }
  }

  /**
   * Fetches all lessons from the API and stores them sorted by order.
   *
   * @async
   * @function retrieveAllLessons
   * @returns {Promise<void>}
   * 
   * @throws {Error} If an unexpected error occurs
   */
  public async retrieveAllLessons(){
    try {
      const response = await firstValueFrom(this.http.get<ApiResponse<LessonData[]>>(environment.backUrl + '/api/content/lesson/all'));
      if (response.data) this.allLessons = response.data.sort((a,b) => a.order - b.order);
    } catch (error) {
      console.error(error);
      // add external service like Sentry to save the error 
    }
  }

  /**
   * Fetches all elements from the API and stores them sorted by order.
   *
   * @async
   * @function retrieveAllElements
   * @returns {Promise<void>}
   * 
   * @throws {Error} If an unexpected error occurs
   */
  public async retrieveAllElements(){
    try {
      const response = await firstValueFrom(this.http.get<ApiResponse<ElementData[]>>(environment.backUrl + '/api/content/element/all'));
      if (response.data) this.allElements = response.data.sort((a,b) => a.order - b.order);
    } catch (error) {
      console.error(error);
      // add external service like Sentry to save the error 
    }
  }
}
