import { Routes } from '@angular/router';
import { Lesson01Component } from './lessons/lesson-01-getting-started/lesson-01.component';

export const routes: Routes = [
  { path: '', redirectTo: 'lesson-1', pathMatch: 'full' },
  { path: 'lesson-1', component: Lesson01Component },
];
