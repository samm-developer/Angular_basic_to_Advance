import { Routes } from '@angular/router';
import { Lesson01Component } from './lessons/lesson-01-getting-started/lesson-01.component';
import { Lesson02Component } from './lessons/lesson-02-control-flow/lesson-02.component';
import { Lesson03Component } from './lessons/lesson-03-component-communication/lesson-03.component';
import { Lesson04Component } from './lessons/lesson-04-services/lesson-04.component';
import { Lesson05Component } from './lessons/lesson-05-http/lesson-05.component';
import { Lesson06Component } from './lessons/lesson-06-reactive-forms/lesson-06.component';
import { authGuard } from './lessons/lesson-07-routing-guards/auth.guard';
import { Lesson07Component } from './lessons/lesson-07-routing-guards/lesson-07.component';
import { LoginComponent } from './lessons/lesson-07-routing-guards/login/login.component';

export const routes: Routes = [
  { path: '', redirectTo: 'lesson-1', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'lesson-1', component: Lesson01Component },
  { path: 'lesson-2', component: Lesson02Component },
  { path: 'lesson-3', component: Lesson03Component },
  { path: 'lesson-4', component: Lesson04Component },
  { path: 'lesson-5', component: Lesson05Component },
  { path: 'lesson-6', component: Lesson06Component },
  { path: 'lesson-7', component: Lesson07Component, canActivate: [authGuard] },
];
