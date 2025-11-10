import { Injectable } from '@angular/core';
import { BehaviorSubject, firstValueFrom } from 'rxjs';
import { ApiResponse, CursusData, ElementData, LessonData, ThemeData, UserCursusData, UserLessonData, UserThemeData } from '../core/models/api-response.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserCourses {

  constructor(private http: HttpClient) {}

  // -------------------------
  // Service initialisation
  // -------------------------

  public initPromised: Promise<void> | null = null;
  public isInitialized: boolean = false;

  // All components using this service have to launch this method in their ngOnInit() before any other use of this service
  public async init() {
    if (this.isInitialized) return;
    if (this.initPromised) return this.initPromised;

    this.initPromised = (async () => {
      await this.syncAllThemesAvailable();
      await this.syncAllCursusAvailable();
      await this.syncAllLessonsAvailable();
      await this.syncAllElementsAvailable();
      await this.syncUserThemesForThisUser();
      await this.syncUserCursusForThisUser();
      await this.syncUserLessonsForThisUser();
      this.isInitialized = true;
    })();
    
    return this.initPromised;
  }

  // --------------------------------------------------------
  // All Themes / Cursus / Lessons available for this user
  // --------------------------------------------------------

  public allThemesAvailable: ThemeData[] = [];
  public allCursusAvailable: CursusData[] = [];
  public allLessonsAvailable: LessonData[] = [];
  public allElementsAvailable: ElementData[] = [];

  // ---------------------------------------------------------------------
  // All UserThemes / UserCursus / UserLessons available for this user
  // ---------------------------------------------------------------------

  public userThemesForThisUser: UserThemeData[] = [];
  public userCursusForThisUser: UserCursusData[] = [];
  public userLessonsForThisUser: UserLessonData[] = [];

  // ----------------------------------
  // Current Theme / Cursus / Lesson
  // ----------------------------------

  private currentTheme = new BehaviorSubject<ThemeData | null>(null);
  public currentTheme$ = this.currentTheme.asObservable();

  private currentCursus = new BehaviorSubject<CursusData | null>(null);
  public currentCursus$ = this.currentCursus.asObservable();
  
  private currentLesson = new BehaviorSubject<LessonData | null>(null);
  public currentLesson$ = this.currentLesson.asObservable();
  
  // ---------------------------------------------
  // Current UserTheme / UserCursus / UserLesson
  // ---------------------------------------------

  public currentUserTheme: UserThemeData | null = null;

  public currentUserCursus: UserCursusData | null = null;
  
  public currentUserLesson: UserLessonData | null = null;

  // -----------------------------------------------------
  // Cursus in current theme / Lessons in current cursus / Elements in current Lesson
  // -----------------------------------------------------

  public cursusInCurrentTheme: CursusData[] = [];
  public lessonsInCurrentCursus: LessonData[] = [];
  public elementsInCurrentLesson: ElementData[] = [];

  // --------
  // Methods
  // --------

  private setCurrentTheme(newTheme: ThemeData | null) {
    this.currentTheme.next(newTheme);
  }

  private setCurrentCursus(newCursus: CursusData | null) {
    this.currentCursus.next(newCursus);
  }

  private setCurrentLesson(newLesson: LessonData | null) {
    this.currentLesson.next(newLesson);
  }

  getCurrentTheme() {
    return this.currentTheme.value;
  }

  getCurrentCursus() {
    return this.currentCursus.value;
  }

  getCurrentLesson() {
    return this.currentLesson.value;
  }

  async syncAllThemesAvailable() {
    const getAllThemesAvailableRepsonse = await firstValueFrom(this.http.get<ApiResponse>(environment.backUrl + '/api/user-theme/theme/all', { withCredentials: true }));
    if (getAllThemesAvailableRepsonse.data) this.allThemesAvailable = (getAllThemesAvailableRepsonse.data as ThemeData[]).sort((a, b) => a.order - b.order);
  }

  async syncAllCursusAvailable() {
    const getAllCursusAvailableRepsonse = await firstValueFrom(this.http.get<ApiResponse>(environment.backUrl + '/api/user-cursus/cursus/all', { withCredentials: true }));
    if (getAllCursusAvailableRepsonse.data) this.allCursusAvailable = (getAllCursusAvailableRepsonse.data as CursusData[]).sort((a, b) => a.order - b.order);
  }

  async syncAllLessonsAvailable() {
    try {
      const getAllLessonsAvailableRepsonse = await firstValueFrom(this.http.get<ApiResponse>(environment.backUrl + '/api/user-lesson/lesson/all', { withCredentials: true }));
      if (getAllLessonsAvailableRepsonse.data) this.allLessonsAvailable = (getAllLessonsAvailableRepsonse.data as LessonData[]).sort((a, b) => a.order - b.order);
    } catch (error) {
      alert('Nous ne sommes pas en mesure de récupérer les données sur notre serveur pour le moment, veuillez ré-essayer utlérieurement.');
      console.error(error);
      // add external service like Sentry to save the error   
    }
  }

  async syncAllElementsAvailable() {
    try {
      const getAllElementsAvailableRepsonse = await firstValueFrom(this.http.get<ApiResponse>(environment.backUrl + '/api/content/element/user/all', { withCredentials: true }));
      if (getAllElementsAvailableRepsonse.data) this.allElementsAvailable = (getAllElementsAvailableRepsonse.data as ElementData[]).sort((a, b) => a.order - b.order);
    } catch (error) {
      alert('Nous ne sommes pas en mesure de récupérer les données sur notre serveur pour le moment, veuillez ré-essayer utlérieurement.');
      console.error(error);
      // add external service like Sentry to save the error   
    }
  }

  async syncUserThemesForThisUser() {
    try {
      const getUserThemesForThisUserResponse = await firstValueFrom(this.http.get<ApiResponse>(environment.backUrl + '/api/user-theme/some', { withCredentials: true }));
      if (getUserThemesForThisUserResponse.data) this.userThemesForThisUser = getUserThemesForThisUserResponse.data;
    } catch (error) {
      alert('Nous ne sommes pas en mesure de récupérer les données sur notre serveur pour le moment, veuillez ré-essayer utlérieurement.');
      console.error(error);
      // add external service like Sentry to save the error   
    }
  }

  async syncUserCursusForThisUser() {
    try {
      const getUserCursusForThisUserResponse = await firstValueFrom(this.http.get<ApiResponse>(environment.backUrl + '/api/user-cursus/some', { withCredentials: true }));
      if (getUserCursusForThisUserResponse.data) this.userCursusForThisUser = getUserCursusForThisUserResponse.data;
    } catch (error) {
      alert('Nous ne sommes pas en mesure de récupérer les données sur notre serveur pour le moment, veuillez ré-essayer utlérieurement.');
      console.error(error);
      // add external service like Sentry to save the error   
    }
  }

  async syncUserLessonsForThisUser() {
    try {
      const getUserLessonsForThisUserResponse = await firstValueFrom(this.http.get<ApiResponse>(environment.backUrl + '/api/user-lesson/some', { withCredentials: true }));
      if (getUserLessonsForThisUserResponse.data) this.userLessonsForThisUser = getUserLessonsForThisUserResponse.data;
    } catch (error) {
      alert('Nous ne sommes pas en mesure de récupérer les données sur notre serveur pour le moment, veuillez ré-essayer utlérieurement.');
      console.error(error);
      // add external service like Sentry to save the error   
    }
  }

  selectCurrentTheme(newThemeId: number | null) {
    if (!newThemeId) {
      this.setCurrentTheme(null);
      this.currentUserTheme = null;
      this.cursusInCurrentTheme = [];
    }

    const themeSelected = this.allThemesAvailable.find(theme => theme.id === newThemeId);
    if (themeSelected) {
      this.setCurrentTheme(themeSelected);

      const userThemeSelected = this.userThemesForThisUser.find(userTheme => userTheme.themeId === themeSelected.id);
      if (userThemeSelected) this.currentUserTheme = userThemeSelected;
      
      this.cursusInCurrentTheme = [];
      for (const cursus of this.allCursusAvailable) {
        if (cursus.themeId === themeSelected.id) this.cursusInCurrentTheme.push(cursus);
      }
    }
  }

  selectCurrentCursus(newCursusId: number | null) {
    if (!newCursusId) {
      this.setCurrentCursus(null);
      this.currentUserCursus = null;
      this.lessonsInCurrentCursus = [];
    }

    const cursusSelected = this.allCursusAvailable.find(cursus => cursus.id === newCursusId);
    if (cursusSelected) {
      this.setCurrentCursus(cursusSelected);

      const userCursusSelected = this.userCursusForThisUser.find(userCursus => userCursus.cursusId === cursusSelected.id);
      if (userCursusSelected) this.currentUserCursus = userCursusSelected;

      this.lessonsInCurrentCursus = [];
      for (const lesson of this.allLessonsAvailable) {
        if (lesson.cursusId === cursusSelected.id) this.lessonsInCurrentCursus.push(lesson);
      }
    }
  }

  selectCurrentLesson(newLessonId: number | null) {
    if (!newLessonId) {
      this.setCurrentLesson(null);
      this.currentUserLesson = null;
      this.elementsInCurrentLesson = [];
    }

    const lessonSelected = this.allLessonsAvailable.find(lesson => lesson.id === newLessonId);
    if (lessonSelected) {
      this.setCurrentLesson(lessonSelected);

      const userLessonSelected = this.userLessonsForThisUser.find(userLesson => userLesson.lessonId === lessonSelected.id);
      if (userLessonSelected) this.currentUserLesson = userLessonSelected;
    
      this.elementsInCurrentLesson = [];
      for (const element of this.allElementsAvailable) {
        if (element.lessonId === lessonSelected.id) this.elementsInCurrentLesson.push(element);
      }
      this.elementsInCurrentLesson = this.elementsInCurrentLesson.sort((a, b) => a.order - b.order);
    }
  }
}
