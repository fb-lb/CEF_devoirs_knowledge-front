import { Component } from '@angular/core';
import { UserCoursesTopMain } from "../../../components/user-courses-top-main/user-courses-top-main";
import { Subscription } from 'rxjs';
import { CursusData, LessonData, ThemeData, UserLessonData } from '../../../core/models/api-response.model';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';
import { UserCourses } from '../../../services/user-courses';
import { ActivatedRoute, RouterLink } from '@angular/router';

@Component({
  selector: 'app-user-lessons',
  imports: [UserCoursesTopMain, FontAwesomeModule, RouterLink],
  templateUrl: './user-lessons.html',
  styleUrl: './user-lessons.scss'
})
export class UserLessons {
  currentTheme!: ThemeData;
  currentCursus!: CursusData;

  lessonsInCurrentCursus: LessonData[] = [];
  userLessonsForThisUser: UserLessonData[] = [];

  faCircle: IconDefinition = faCircle;
  faCircleChecked: IconDefinition = faCircleCheck;


  constructor(private userCoursesService: UserCourses, private activatedRoute: ActivatedRoute) {}
  
  async ngOnInit() {
    await this.userCoursesService.init();
    
    const currentThemeId = Number(this.activatedRoute.snapshot.paramMap.get('themeId'));
    const currentCursusId = Number(this.activatedRoute.snapshot.paramMap.get('cursusId'));

    this.userCoursesService.selectCurrentTheme(currentThemeId);
    this.userCoursesService.selectCurrentCursus(currentCursusId);
    this.userCoursesService.selectCurrentLesson(null);

    const controlCurrentTheme = this.userCoursesService.getCurrentTheme();
    if (controlCurrentTheme) this.currentTheme = controlCurrentTheme;

    const controlCurrentCursus = this.userCoursesService.getCurrentCursus();
    if (controlCurrentCursus) this.currentCursus = controlCurrentCursus;
    
    this.userLessonsForThisUser = this.userCoursesService.userLessonsForThisUser;
    this.lessonsInCurrentCursus = this.userCoursesService.lessonsInCurrentCursus;
  }

  isLessonValidated(lessonId: number): boolean {
    try {
      const userLesson = this.userLessonsForThisUser.find(userLesson => userLesson.lessonId === lessonId);
      if (!userLesson) throw new Error('userLesson is not found in userLessonsForThisUser in isLessonValidated function in user-lessons.ts');
      return userLesson.isValidated;
    } catch (error) {
      alert('Une erreur a été détecté, nous mettons tout en oeuvre pour résoudre le problème');
      console.error(error);
      // add external service like Sentry to save the error 
      return false;
    }
  }
}
