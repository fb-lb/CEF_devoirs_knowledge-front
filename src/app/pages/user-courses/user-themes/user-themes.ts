import { Component } from '@angular/core';
import { UserCoursesTopMain } from "../../../components/user-courses-top-main/user-courses-top-main";
import { UserCourses } from '../../../services/user-courses';
import { ThemeData } from '../../../core/models/api-response.model';
import { Router, RouterLink } from '@angular/router';


@Component({
  selector: 'app-user-themes',
  imports: [UserCoursesTopMain, RouterLink],
  templateUrl: './user-themes.html',
  styleUrl: './user-themes.scss'
})
export class UserThemes {

  allThemesAvailable: ThemeData[] = [];

  constructor(private userCoursesService: UserCourses) {}

  async ngOnInit() {
    await this.userCoursesService.init();
    this.userCoursesService.selectCurrentTheme(null);
    this.userCoursesService.selectCurrentCursus(null);
    this.userCoursesService.selectCurrentLesson(null);
    this.allThemesAvailable = this.userCoursesService.allThemesAvailable;
  }
}
