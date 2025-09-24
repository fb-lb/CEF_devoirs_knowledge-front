import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';
import { EmailCheck } from './email-check/email-check';

export const routes: Routes = [
    {path: "", component: Home},
    {path: "inscription", component: Register},
    {path: "inscription/check-email/:token", component: EmailCheck},
];
