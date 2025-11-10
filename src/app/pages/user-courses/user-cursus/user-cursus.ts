import { Component } from '@angular/core';
import { UserCoursesTopMain } from "../../../components/user-courses-top-main/user-courses-top-main";
import { UserCourses } from '../../../services/user-courses';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CursusData, ThemeData, UserCursusData } from '../../../core/models/api-response.model';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { faCircleCheck } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-user-cursus',
  imports: [UserCoursesTopMain, FontAwesomeModule, RouterLink],
  templateUrl: './user-cursus.html',
  styleUrl: './user-cursus.scss'
})
export class UserCursus {
  currentTheme!: ThemeData;

  cursusInCurrentTheme: CursusData[] = [];
  userCursusForThisUser: UserCursusData[] = [];

  faCircle: IconDefinition = faCircle;
  faCircleChecked: IconDefinition = faCircleCheck;


  constructor(private userCoursesService: UserCourses, private activatedRoute: ActivatedRoute) {}
  
  async ngOnInit() {
    await this.userCoursesService.init();
    
    const currentThemeId = Number(this.activatedRoute.snapshot.paramMap.get('themeId'));
    this.userCoursesService.selectCurrentTheme(currentThemeId);
    this.userCoursesService.selectCurrentCursus(null);
    this.userCoursesService.selectCurrentLesson(null);

    const controlCurrentTheme = this.userCoursesService.getCurrentTheme();
    if (controlCurrentTheme) this.currentTheme = controlCurrentTheme;
    
    this.userCursusForThisUser = this.userCoursesService.userCursusForThisUser;
    this.cursusInCurrentTheme = this.userCoursesService.cursusInCurrentTheme;
  }

  isCursusValidated(cursusId: number): boolean {
    try {
      const userCursus = this.userCursusForThisUser.find(userCursus => userCursus.cursusId === cursusId);
      if (!userCursus) throw new Error('userCursus is not found in userCursusForThisUser in isCursusValidated function in user-cursus.ts');
      return userCursus.isValidated;
    } catch (error) {
      alert('Une erreur a été détecté, nous mettons tout en oeuvre pour résoudre le problème');
      console.error(error);
      // add external service like Sentry to save the error 
      return false;
    }
  }
}
