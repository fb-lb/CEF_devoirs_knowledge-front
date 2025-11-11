import { Component } from '@angular/core';
import { UserCourses } from '../../services/user-courses';
import { ThemeData, UserThemeData } from '../../core/models/api-response.model';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faMedal } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-certification',
  imports: [FontAwesomeModule],
  templateUrl: './certifications.html',
  styleUrl: './certifications.scss'
})
export class Certifications {
  themesForThisUser: ThemeData[] = [];
  userThemesForThisUser: UserThemeData[] = [];
  
  certifiedThemesUserThemesMap = new Map<ThemeData, UserThemeData>();

  faMedal: IconDefinition = faMedal;

  constructor(private userCoursesService: UserCourses) {}

  async ngOnInit() {
    await this.userCoursesService.init();
    this.themesForThisUser = this.userCoursesService.allThemesAvailable;
    this.userThemesForThisUser = this.userCoursesService.userThemesForThisUser;

    for (const userTheme of this.userThemesForThisUser) {
      const updateDate = userTheme.updatedAt;
      const updateDateSplited = updateDate.split(' ');
      const time = updateDateSplited.pop();
      updateDateSplited.push('à');
      if (time) updateDateSplited.push(time);
      userTheme.updatedAt = updateDateSplited.join(' ');
    }
    
    for (const theme of this.themesForThisUser) {
      const userTheme = this.userThemesForThisUser.find(userTheme => userTheme.themeId === theme.id);
      if (userTheme && userTheme.isCertified) {
        this.certifiedThemesUserThemesMap.set(theme, userTheme);
      }
    }
  }
}
