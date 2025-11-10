import { Component } from '@angular/core';
import { UserCourses } from '../../services/user-courses';
import { Subscription } from 'rxjs';
import { CursusData, LessonData, ThemeData } from '../../core/models/api-response.model';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-user-courses-top-main',
  imports: [RouterLink],
  templateUrl: './user-courses-top-main.html',
  styleUrl: './user-courses-top-main.scss'
})
export class UserCoursesTopMain {
  private currentThemeSubscription!: Subscription;
  currentTheme: ThemeData | null = null;

  private currentCursusSubscription!: Subscription;
  currentCursus: CursusData | null = null;

  private currentLessonSubscription!: Subscription;
  currentLesson: LessonData | null = null;

  constructor(private userCoursesService: UserCourses) {}

  async ngOnInit() {
    await this.userCoursesService.init();

    this.currentThemeSubscription = this.userCoursesService.currentTheme$.subscribe(theme => theme ? this.currentTheme = theme : null);
    this.currentCursusSubscription = this.userCoursesService.currentCursus$.subscribe(cursus => cursus ? this.currentCursus = cursus : null);
    this.currentLessonSubscription = this.userCoursesService.currentLesson$.subscribe(lesson => lesson ? this.currentLesson = lesson : null);
  }

  ngOnDestroy() {
    this.currentThemeSubscription.unsubscribe();
    this.currentCursusSubscription.unsubscribe();
    this.currentLessonSubscription.unsubscribe();
  }
}
