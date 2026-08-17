import { Injectable } from '@angular/core';
import { Task } from '../lesson-03-component-communication/task.model';

export interface NewTaskPayload {
  title: string;
  dueDate: string;
}

/**
 * A service is a plain TypeScript class that holds shared logic and data.
 * Angular creates one instance (singleton) and injects it where needed.
 */
@Injectable({
  providedIn: 'root',
})
export class TaskService {
  private nextId = 4;

  private _tasks: Task[] = [
    { id: 1, title: 'Read task.service.ts', dueDate: '2026-08-18', done: false },
    { id: 2, title: 'Inject the service with inject()', dueDate: '2026-08-19', done: false },
    { id: 3, title: 'Notice TaskSummary reads the same data', dueDate: '2026-08-20', done: false },
  ];

  get tasks(): Task[] {
    return this._tasks;
  }

  get completedCount(): number {
    return this._tasks.filter((task) => task.done).length;
  }

  get totalCount(): number {
    return this._tasks.length;
  }

  addTask(payload: NewTaskPayload): void {
    this._tasks = [
      ...this._tasks,
      {
        id: this.nextId++,
        title: payload.title,
        dueDate: payload.dueDate,
        done: false,
      },
    ];
  }

  toggleTask(id: number): void {
    this._tasks = this._tasks.map((task) =>
      task.id === id ? { ...task, done: !task.done } : task,
    );
  }

  removeTask(id: number): void {
    this._tasks = this._tasks.filter((task) => task.id !== id);
  }
}
