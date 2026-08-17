import { DatePipe, JsonPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Task } from '../lesson-03-component-communication/task.model';

/**
 * LESSON 6 — Reactive Forms
 *
 * Form state lives in a FormGroup in TypeScript (not ngModel in template).
 * Validators run automatically; the template binds with formControlName.
 */
@Component({
  selector: 'app-lesson-06',
  imports: [ReactiveFormsModule, DatePipe, JsonPipe],
  templateUrl: './lesson-06.component.html',
  styleUrl: './lesson-06.component.css',
})
export class Lesson06Component {
  private readonly fb = inject(FormBuilder);
  private nextId = 1;

  tasks: Task[] = [];

  taskForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    dueDate: ['', Validators.required],
  });

  submit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    const { title, dueDate } = this.taskForm.getRawValue();

    this.tasks = [
      ...this.tasks,
      {
        id: this.nextId++,
        title,
        dueDate,
        done: false,
      },
    ];

    this.taskForm.reset();
  }

  readonly reactiveExample = `taskForm = this.fb.nonNullable.group({
  title: ['', [Validators.required, Validators.minLength(3)]],
  dueDate: ['', Validators.required],
});`;

  readonly templateExample = `<form [formGroup]="taskForm" (ngSubmit)="submit()">
  <input formControlName="title" />
  <button [disabled]="taskForm.invalid">Add</button>
</form>`;
}
