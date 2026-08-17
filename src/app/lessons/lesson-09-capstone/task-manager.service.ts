import { Injectable, inject } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Task } from '../lesson-03-component-communication/task.model';
import { TaskApiService } from '../lesson-05-http/task-api.service';

export interface NewTaskPayload {
  title: string;
  dueDate: string;
}

@Injectable({
  providedIn: 'root',
})
export class TaskManagerService {
  private readonly taskApi = inject(TaskApiService);
  private readonly tasksSubject = new BehaviorSubject<Task[]>([]);
  private readonly loadingSubject = new BehaviorSubject(false);
  private readonly errorSubject = new BehaviorSubject('');

  readonly tasks$ = this.tasksSubject.asObservable();
  readonly loading$ = this.loadingSubject.asObservable();
  readonly error$ = this.errorSubject.asObservable();

  private nextId = 1000;

  get totalCount(): number {
    return this.tasksSubject.value.length;
  }

  get completedCount(): number {
    return this.tasksSubject.value.filter((t) => t.done).length;
  }

  loadTasks(): void {
    this.loadingSubject.next(true);
    this.errorSubject.next('');

    this.taskApi.getTasks().subscribe({
      next: (tasks) => {
        this.tasksSubject.next(tasks);
        this.nextId = Math.max(...tasks.map((t) => t.id), 0) + 1;
        this.loadingSubject.next(false);
      },
      error: () => {
        this.errorSubject.next('Could not load tasks. Check your internet connection.');
        this.loadingSubject.next(false);
      },
    });
  }

  addTask(payload: NewTaskPayload): void {
    this.tasksSubject.next([
      ...this.tasksSubject.value,
      {
        id: this.nextId++,
        title: payload.title,
        dueDate: payload.dueDate,
        done: false,
      },
    ]);
  }

  toggleTask(id: number): void {
    this.tasksSubject.next(
      this.tasksSubject.value.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  }

  removeTask(id: number): void {
    this.tasksSubject.next(this.tasksSubject.value.filter((task) => task.id !== id));
  }
}
