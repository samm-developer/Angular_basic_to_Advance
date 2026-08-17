import { Routes } from '@angular/router';
import { Lesson01Component } from './lessons/lesson-01-getting-started/lesson-01.component';
import { Lesson02Component } from './lessons/lesson-02-control-flow/lesson-02.component';
import { Lesson03Component } from './lessons/lesson-03-component-communication/lesson-03.component';

export const routes: Routes = [
  { path: '', redirectTo: 'lesson-1', pathMatch: 'full' },
  { path: 'lesson-1', component: Lesson01Component },
  { path: 'lesson-2', component: Lesson02Component },
  { path: 'lesson-3', component: Lesson03Component },
];
