import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';
import { EmailCheck } from './email-check/email-check';
import { Login } from './login/login';
import { LessonsPayed } from './lessons-payed/lessons-payed';
import { BackOfficeUsers } from './back-office-users/back-office-users';


export const routes: Routes = [
    {path: "", component: Home},
    {path: "inscription", component: Register},
    {path: "inscription/check-email/:token", component: EmailCheck},
    {path: "connexion", component: Login},
    {path: "mes-cours", component: LessonsPayed},
    {path: "back-office/utilisateurs", component: BackOfficeUsers}
];
