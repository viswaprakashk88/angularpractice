import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Contactus } from './contactus/contactus';
import { App } from './app';

export const routes: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'home', component: Home},
    {path: 'contactus', component: Contactus}
];
