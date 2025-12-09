import { Component } from '@angular/core';
import { ApiResponse, CursusData, LessonData, ThemeData, UserCursusData, UserLessonData } from '../../core/models/api-response.model';
import { firstValueFrom } from 'rxjs';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { StripePayment } from "../../components/stripe-payment/stripe-payment";

@Component({
  selector: 'app-all-courses',
  imports: [CommonModule, FontAwesomeModule, StripePayment],
  templateUrl: './all-courses.html',
  styleUrl: './all-courses.scss'
})
export class AllCourses {
  isAuthenticated: boolean = false;
  isVerified: boolean = false;

  allThemes: ThemeData[] = [];
  allCursus: CursusData[] = [];
  allLessons: LessonData[] = [];

  faSquarePlus: IconDefinition = faSquarePlus;
  faSquareMinus: IconDefinition = faSquareMinus;

  areThemesOpen = new Map<number, boolean>();
  areCursusOpen = new Map<number, boolean>();

  isStripeModalOpen = false;

  courseToPay: {
    type: 'cursus' | 'lesson';
    id: number;
    price: number;
  } = {
    type: 'cursus',
    id: 0,
    price: 0,
  }

  constructor (private http: HttpClient) {};

  async ngOnInit() {
    // Check user authentication and email verification
    try {
      const isAuthenticatedResponse = await firstValueFrom(this.http.get<ApiResponse>(environment.backUrl + '/api/utilisateurs/isAuthenticated', { withCredentials: true }));
      this.isAuthenticated = isAuthenticatedResponse.success;
      if (this.isAuthenticated) {
        const isVerifiedResponse = await firstValueFrom(this.http.get<ApiResponse<boolean>>(environment.backUrl + '/api/utilisateurs/isVerified', { withCredentials: true }));
        isVerifiedResponse.data ? this.isVerified = isVerifiedResponse.data : this.isVerified = false;
      }
    } catch (error) {
      if (error instanceof HttpErrorResponse) {
        const isAuthenticatedResponse = error.error as ApiResponse;
        this.isAuthenticated = false;
        alert(isAuthenticatedResponse.message);
      } else {
        alert("Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée."); 
      }
      console.error(error);
      // add external service like Sentry to save the error
    }

    // Get all themes, cursus and lessons
    try {
      const allThemesResponse = await firstValueFrom(this.http.get<ApiResponse<ThemeData[]>>(environment.backUrl + '/api/content/theme/all'));
      if (allThemesResponse.data) this.allThemes = allThemesResponse.data.sort((a, b) => a.order - b.order);
      
      const allCursusResponse = await firstValueFrom(this.http.get<ApiResponse<CursusData[]>>(environment.backUrl + '/api/content/cursus/all'));
      if (allCursusResponse.data) this.allCursus = allCursusResponse.data.sort((a, b) => a.order - b.order);

      const allLessonsResponse = await firstValueFrom(this.http.get<ApiResponse<LessonData[]>>(environment.backUrl + '/api/content/lesson/all'));
      if (allLessonsResponse.data) this.allLessons = allLessonsResponse.data.sort((a, b) => a.order - b.order);
    } catch (error) {
      console.error(error);
      // add external service like Sentry to save the error
      alert("Notre serveur est actuellement hors service, nous mettons tout en oeuvre pour qu'il soit de nouveau disponible.\nVeuillez nous excuser pour la gène occasionnée.");
    }

    // Set maps
    this.allThemes.forEach(theme => {
      this.areThemesOpen.set(theme.id, false);
    });
    this.allCursus.forEach(cursus => {
      this.areCursusOpen.set(cursus.id, false);
    });

     this.setCursusAndLessonPrices();
  }

  // Set the cursus and lessons prices according to what the user already purchased
  async setCursusAndLessonPrices() {
    // Get all user-cursus and user-lesson
    if (this.isAuthenticated) {
      const getUserLessonResponse = await firstValueFrom(this.http.get<ApiResponse>(environment.backUrl + '/api/user-lesson/some', { withCredentials: true }));
      let userLessons: UserLessonData[] = [];
      if (getUserLessonResponse.data) userLessons = getUserLessonResponse.data as UserLessonData[];


      // Set price of lesson already bought to zero
      for (const userLesson of userLessons) {
        const lessonIndex = this.allLessons.findIndex(lesson => lesson.id === userLesson.lessonId);
        if (lessonIndex !== -1) {
          this.allLessons[lessonIndex].price = 0;
        }
      }

      const getUserCursusResponse = await firstValueFrom(this.http.get<ApiResponse>(environment.backUrl + '/api/user-cursus/some', { withCredentials: true }));
      let userCursus: UserCursusData[] = [];
      if (getUserCursusResponse.data) userCursus = getUserCursusResponse.data as UserCursusData[];

      // Set price of cursus to zero if at least one lesson but not all has been bought and -1 if all lessons in the cursus has been bought
      for (const oneUserCursus of userCursus) {
        const cursusId = oneUserCursus.cursusId;
        const lessonInThisCursus = this.allLessons.filter(lesson => lesson.cursusId === cursusId);
        const numberOfLessonsToBuyInThisCursus = lessonInThisCursus.filter(lesson => lesson.price !== 0);

        const cursusIndex = this.allCursus.findIndex(cursus => cursus.id === cursusId);
        if (cursusIndex !== -1) {
          if (numberOfLessonsToBuyInThisCursus.length > 0) {
            this.allCursus[cursusIndex].price = 0;
          } else {
            this.allCursus[cursusIndex].price = -1;
          }
        }
      }
    }
  }

  getCursusByThemeId(themeId: number): CursusData[] {
    return this.allCursus.filter(cursus => cursus.themeId === themeId);
  }

  getLessonByCursusId(cursusId: number): LessonData[] {
    return this.allLessons.filter(lesson => lesson.cursusId === cursusId);
  }

  toggleOpenThemeValue(themeId: number) {
    const isThemeOpen = this.areThemesOpen.get(themeId) ?? false;
    this.areThemesOpen.set(themeId, !isThemeOpen);

    this.allCursus.forEach(cursus => {
      if (cursus.themeId === themeId) this.areCursusOpen.set(cursus.id, false);
    });
  }

  toggleOpenCursusValue(cursusId: number) {
    const isCursusOpen = this.areCursusOpen.get(cursusId) ?? false;
    this.areCursusOpen.set(cursusId, !isCursusOpen);
  }

  openStripeModal(courseType: 'cursus' | 'lesson', courseId: number) {
    this.courseToPay.type = courseType;
    this.courseToPay.id = courseId;
    this.isStripeModalOpen = true;
  }

  handlePaymentSuccess() {
    this.setCursusAndLessonPrices();
  }

  closeStripeModal() {
    this.isStripeModalOpen = false;
  }
}
