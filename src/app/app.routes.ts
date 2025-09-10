import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Register } from './register/register';

export const routes: Routes = [
    {path: "", component: Home},
    {path: "inscription", component: Register}
];
