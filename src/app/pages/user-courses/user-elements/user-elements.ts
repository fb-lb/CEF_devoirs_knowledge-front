import { Component } from '@angular/core';
import { UserCoursesTopMain } from "../../../components/user-courses-top-main/user-courses-top-main";
import { UserCourses } from '../../../services/user-courses';
import { ApiResponse, CursusData, ElementData, LessonData, ThemeData, UserLessonData } from '../../../core/models/api-response.model';
import { firstValueFrom, Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { environment } from '../../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-user-elements',
  imports: [UserCoursesTopMain],
  templateUrl: './user-elements.html',
  styleUrl: './user-elements.scss'
})
export class UserElements {
  environment = environment;

  currentLesson!: LessonData;

  currentTheme!: ThemeData;
  currentCursus!: CursusData;

  currentUserLesson!: UserLessonData;

  elementsInCurrentLesson: ElementData[] = [];

  constructor(private userCoursesService: UserCourses, private activatedRoute: ActivatedRoute, private http: HttpClient, private router: Router) {}

  async ngOnInit() {
    await this.userCoursesService.init();

    const currentThemeId = Number(this.activatedRoute.snapshot.paramMap.get("themeId"));
    const currentCursusId = Number(this.activatedRoute.snapshot.paramMap.get("cursusId"));
    const currentLessonId = Number(this.activatedRoute.snapshot.paramMap.get("lessonId"));

    this.userCoursesService.selectCurrentTheme(currentThemeId);
    this.userCoursesService.selectCurrentCursus(currentCursusId);
    this.userCoursesService.selectCurrentLesson(currentLessonId);
    
    const controlCurrentTheme = this.userCoursesService.getCurrentTheme();
    if (controlCurrentTheme) this.currentTheme = controlCurrentTheme;

    const controlCurrentCursus = this.userCoursesService.getCurrentCursus();
    if (controlCurrentCursus) this.currentCursus = controlCurrentCursus;

    const controlCurrentLesson = this.userCoursesService.getCurrentLesson();
    if (controlCurrentLesson) this.currentLesson = controlCurrentLesson;

    if (this.userCoursesService.currentUserLesson) this.currentUserLesson = this.userCoursesService.currentUserLesson;

    this.elementsInCurrentLesson = this.userCoursesService.elementsInCurrentLesson;
  }

  async validateLesson() {
    try {
      const validateResponse = await firstValueFrom(this.http.patch<ApiResponse>(environment.backUrl + `/api/user-lesson/${this.currentLesson.id}/validate`, {}, { withCredentials: true }));
      
      await this.userCoursesService.syncUserLessonsForThisUser();
      await this.userCoursesService.syncUserCursusForThisUser();
      await this.userCoursesService.syncUserThemesForThisUser();

      this.router.navigate(['mes-cours', 'theme', this.currentTheme.id, 'cursus', this.currentCursus.id]);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        alert (errorResponse.message);
      } else {
        alert("Nous ne sommes pas en mesure d'accéder à nos serveur pour valider cette leçon.");
      }
      console.error(error);
      // add external service like Sentry to save the error 
    }
  }

  async invalidateLesson() {
    try {
      const invalidateResponse = await firstValueFrom(this.http.patch<ApiResponse>(environment.backUrl + `/api/user-lesson/${this.currentLesson.id}/invalidate`, {}, { withCredentials: true }));
      
      await this.userCoursesService.syncUserLessonsForThisUser();
      await this.userCoursesService.syncUserCursusForThisUser();
      await this.userCoursesService.syncUserThemesForThisUser();

      this.router.navigate(['mes-cours', 'theme', this.currentTheme.id, 'cursus', this.currentCursus.id]);
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const errorResponse = error.error as ApiResponse;
        alert (errorResponse.message);
      } else {
        alert("Nous ne sommes pas en mesure d'accéder à nos serveur pour invalider cette leçon.");
      }
      console.error(error);
      // add external service like Sentry to save the error 
    }
  }
}
