import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ApiResponse, CursusData, LessonData, ThemeData } from '../core/models/api-response.model';
import { environment } from '../../environments/environment';
import { firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoursesService {
  constructor(private http: HttpClient){
    this.init();
  }

  public isInitialized: boolean = false;
  public initPromise: Promise<void> | null = null;

  public allThemes: ThemeData[] = [];
  public allCursus: CursusData[] = [];
  public allLessons: LessonData[] = [];

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
    await Promise.all([
      this.retrieveAllThemes(),
      this.retrieveAllCursus(),
      this.retrieveAllLessons(),
    ]);
  }

  public async retrieveAllThemes(){
    try {
      const response = await firstValueFrom(this.http.get<ApiResponse<ThemeData[]>>(environment.backUrl + '/api/content/theme/all'));
      if (response.data) this.allThemes = response.data.sort((a,b) => a.order - b.order);
    } catch (error) {
      console.error(error);
      // add external service like Sentry to save the error 
    }
  }

  public async retrieveAllCursus(){
    try {
      const response = await firstValueFrom(this.http.get<ApiResponse<CursusData[]>>(environment.backUrl + '/api/content/cursus/all'));
      if (response.data) this.allCursus = response.data.sort((a,b) => a.order - b.order);
    } catch (error) {
      console.error(error);
      // add external service like Sentry to save the error 
    }
  }

  public async retrieveAllLessons(){
    try {
      const response = await firstValueFrom(this.http.get<ApiResponse<LessonData[]>>(environment.backUrl + '/api/content/lesson/all'));
      if (response.data) this.allLessons = response.data.sort((a,b) => a.order - b.order);
    } catch (error) {
      console.error(error);
      // add external service like Sentry to save the error 
    }
  }
}
