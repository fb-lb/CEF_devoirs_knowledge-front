import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { EmailCheck } from './pages/email-check/email-check';
import { Login } from './pages/login/login';
import { UserThemes } from './pages/user-courses/user-themes/user-themes';
import { UserCursus } from './pages/user-courses/user-cursus/user-cursus';
import { UserLessons } from './pages/user-courses/user-lessons/user-lessons';
import { UserElements} from './pages/user-courses/user-elements/user-elements';
import { BackOfficeUsers } from './pages/back-office/back-office-users/back-office-users';
import { userAuthGuard } from './guards/user-auth-guard';
import { adminAuthGuard } from './guards/admin-auth-guard';
import { notAuthGuard } from './guards/not-auth-guard';
import { BackOfficeContents } from './pages/back-office/back-office-contents/back-office-contents';
import { AllCourses } from './pages/all-courses/all-courses';
import { Certifications } from './pages/certifications/certifications';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'inscription', component: Register, canActivate: [notAuthGuard] },
  { path: 'inscription/check-email/:token', component: EmailCheck },
  { path: 'connexion', component: Login, canActivate: [notAuthGuard] },
  { path: 'mes-cours', component: UserThemes, canActivate: [userAuthGuard] },
  { path: 'mes-cours/theme/:themeId', component: UserCursus, canActivate: [userAuthGuard] },
  { path: 'mes-cours/theme/:themeId/cursus/:cursusId', component: UserLessons, canActivate: [userAuthGuard] },
  { path: 'mes-cours/theme/:themeId/cursus/:cursusId/lesson/:lessonId', component: UserElements, canActivate: [userAuthGuard] },
  { path: 'back-office/utilisateurs', component: BackOfficeUsers, canActivate: [adminAuthGuard] },
  { path: 'back-office/contenus', component: BackOfficeContents, canActivate: [adminAuthGuard] },
  { path: 'nos-formations', component: AllCourses },
  { path: 'mes-certifications', component: Certifications },
];
