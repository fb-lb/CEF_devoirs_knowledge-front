import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { Register } from './pages/register/register';
import { EmailCheck } from './pages/email-check/email-check';
import { Login } from './pages/login/login';
import { LessonsPayed } from './pages/lessons-payed/lessons-payed';
import { BackOfficeUsers } from './pages/back-office/back-office-users/back-office-users';
import { userAuthGuard } from './guards/user-auth-guard';
import { adminAuthGuard } from './guards/admin-auth-guard';
import { notAuthGuard } from './guards/not-auth-guard';
import { BackOfficeContents } from './pages/back-office/back-office-contents/back-office-contents';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'inscription', component: Register, canActivate: [notAuthGuard] },
  { path: 'inscription/check-email/:token', component: EmailCheck },
  { path: 'connexion', component: Login, canActivate: [notAuthGuard] },
  { path: 'mes-cours', component: LessonsPayed, canActivate: [userAuthGuard] },
  { path: 'back-office/utilisateurs', component: BackOfficeUsers, canActivate: [adminAuthGuard] },
  { path: 'back-office/contenus', component: BackOfficeContents, canActivate: [adminAuthGuard] },
];
