import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

export interface Task {
  id: number;
  title: string;
  dueDate: string;
  done: boolean;
}

/**
 * LESSON 2 — Control flow & lists
 *
 * Angular 17+ uses built-in template syntax instead of *ngIf / *ngFor:
 *   @if, @else, @for, @empty
 */
@Component({
  selector: 'app-lesson-02',
  imports: [FormsModule, DatePipe],
  templateUrl: './lesson-02.component.html',
  styleUrl: './lesson-02.component.css',
})
export class Lesson02Component {
  newTaskTitle = '';
  newTaskDueDate = '';
  showCompleted = true;

  tasks: Task[] = [
    { id: 1, title: 'Read lesson-02.component.ts', dueDate: '2026-08-15', done: true },
    { id: 2, title: 'Try the @for loop in the template', dueDate: '2026-08-20', done: false },
    { id: 3, title: 'Add your own task below', dueDate: '2026-08-25', done: false },
  ];

  private nextId = 4;

  get visibleTasks(): Task[] {
    return this.showCompleted
      ? this.tasks
      : this.tasks.filter((task) => !task.done);
  }

  get completedCount(): number {
    return this.tasks.filter((task) => task.done).length;
  }

  get hasTasks(): boolean {
    return this.tasks.length > 0;
  }

  addTask(): void {
    const title = this.newTaskTitle.trim();
    if (!title || !this.newTaskDueDate) {
      return;
    }

    this.tasks = [
      ...this.tasks,
      { id: this.nextId++, title, dueDate: this.newTaskDueDate, done: false },
    ];
    this.newTaskTitle = '';
    this.newTaskDueDate = '';
  }

  toggleTask(task: Task): void {
    task.done = !task.done;
  }

  removeTask(id: number): void {
    this.tasks = this.tasks.filter((task) => task.id !== id);
  }

  toggleShowCompleted(): void {
    this.showCompleted = !this.showCompleted;
  }

  readonly ifExample = `@if (completedCount === tasks.length) {
  <p>All done</p>
} @else {
  <p>Keep going</p>
}`;

  readonly forExample = `@for (task of visibleTasks; track task.id) {
  <li>{{ task.title }} — due {{ task.dueDate }}</li>
}`;
}
