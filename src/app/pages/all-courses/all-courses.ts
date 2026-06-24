import { Component, ChangeDetectionStrategy } from '@angular/core';
import { CursusData, LessonData, ThemeData, UserCursusData, UserLessonData } from '../../core/models/api-response.model';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faSquareMinus, faSquarePlus } from '@fortawesome/free-solid-svg-icons';
import { StripePayment } from "../../components/stripe-payment/stripe-payment";
import { UserCourses } from '../../services/user-courses';
import { CoursesService } from '../../services/courses.service.ts';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-all-courses',
  imports: [CommonModule, FontAwesomeModule, StripePayment],
  templateUrl: './all-courses.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './all-courses.scss'
})
export class AllCourses {
  isAuthenticated: boolean = false;
  isVerified: boolean = false;

  userAuthSub!: Subscription;

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

  constructor (private userCoursesService: UserCourses, private coursesService: CoursesService, private authService: AuthenticationService) {};

  async ngOnInit() {
    
    // Check user authentication and email verification
    this.userAuthSub = this.authService.isAuthenticated$.subscribe(value => this.isAuthenticated = value);
    this.isVerified = this.authService.isVerified;

    // Retrieve data of courses and user courses
    await this.userCoursesService.init();
    await this.coursesService.init();
    this.allThemes = this.coursesService.allThemes.map(theme => ({...theme}));
    this.allCursus = this.coursesService.allCursus.map(cursus => ({...cursus}));
    this.allLessons = this.coursesService.allLessons.map(lesson => ({...lesson}));

    // Set maps
    this.allThemes.forEach(theme => {
      this.areThemesOpen.set(theme.id, false);
    });
    this.allCursus.forEach(cursus => {
      this.areCursusOpen.set(cursus.id, false);
    });


     if (this.isAuthenticated) this.setCursusAndLessonPrices();
  }

  ngOnDestroy(): void {
    this.userAuthSub.unsubscribe();
  }

  // Set the cursus and lessons prices according to what the user already purchased
  async setCursusAndLessonPrices() {
    // LESSONS PART
    let userLessons: UserLessonData[] = this.userCoursesService.userLessonsForThisUser.map(lesson => ({...lesson}));

    // Set price of lesson already bought to zero
    for (const userLesson of userLessons) {
      const lessonIndex = this.allLessons.findIndex(lesson => lesson.id === userLesson.lessonId);
      if (lessonIndex !== -1) {
        this.allLessons[lessonIndex].price = 0;
      }
    }

    // CURSUS PART
    let userCursus: UserCursusData[] = this.userCoursesService.userCursusForThisUser.map(cursus => ({...cursus}));

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

  async handlePaymentSuccess() {
    await this.userCoursesService.syncData();
    this.setCursusAndLessonPrices();
  }

  closeStripeModal() {
    this.isStripeModalOpen = false;
  }
}
