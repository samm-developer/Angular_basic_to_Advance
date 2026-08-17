import { AsyncPipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskRowComponent } from '../lesson-03-component-communication/task-row/task-row.component';
import { CapstoneSummaryComponent } from './capstone-summary/capstone-summary.component';
import { TaskManagerService } from './task-manager.service';

/**
 * LESSON 9 — Capstone: Task Manager
 *
 * Combines patterns from Lessons 3–8:
 *   Service, HTTP, @Input/@Output children, reactive forms, async pipe.
 */
@Component({
  selector: 'app-lesson-09',
  imports: [
    ReactiveFormsModule,
    AsyncPipe,
    TaskRowComponent,
    CapstoneSummaryComponent,
  ],
  templateUrl: './lesson-09.component.html',
  styleUrl: './lesson-09.component.css',
})
export class Lesson09Component implements OnInit {
  private readonly fb = inject(FormBuilder);
  protected readonly taskManager = inject(TaskManagerService);

  taskForm = this.fb.nonNullable.group({
    title: ['', [Validators.required, Validators.minLength(3)]],
    dueDate: ['', Validators.required],
  });

  ngOnInit(): void {
    this.taskManager.loadTasks();
  }

  submit(): void {
    if (this.taskForm.invalid) {
      this.taskForm.markAllAsTouched();
      return;
    }

    this.taskManager.addTask(this.taskForm.getRawValue());
    this.taskForm.reset();
  }

  reload(): void {
    this.taskManager.loadTasks();
  }
}
